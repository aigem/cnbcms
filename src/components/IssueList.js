"use client"; // 标记为客户端组件

import { useEffect, useState } from 'react';

const IssueList = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await fetch('/api/cnb/list-issues');
        const data = await response.json();

        if (data.success) {
          setIssues(data.data);
        } else {
          throw new Error(data.error || '获取Issue失败');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchIssues();
  }, []);

  if (loading) {
    return <div>加载中...</div>;
  }

  if (error) {
    return <div>错误: {error}</div>;
  }

  return (
    <div className="issue-list">
      <h2>Issue 列表</h2>
      <ul>
        {issues.map((issue) => (
          <li key={issue.number} className="issue-item">
            <h3>#{issue.number} {issue.title}</h3>
            <p>状态: {issue.state} | 作者: {issue.author}</p>
            <div>{issue.body}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IssueList;