'use client';
import React, { useEffect, useState } from 'react';
import { cnbApi } from '../api/cnb';
import { useConfigStore } from '../store/config';

interface Issue {
  number: number;
  title: string;
  state: string;
  created_at: string;
  author?: { name: string };
}

const IssueList: React.FC = () => {
  const { token, repo } = useConfigStore();
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token || !repo) return;
    setLoading(true);
    cnbApi.getIssues()
      .then(setIssues)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, [token, repo]);

  if (!token || !repo) return <div style={{textAlign:'center',marginTop:32}}>请先配置Token和Repo</div>;
  if (loading) return <div style={{textAlign:'center',marginTop:32}}>加载中...</div>;
  if (error) return <div style={{color:'red',textAlign:'center',marginTop:32}}>加载失败：{error}</div>;

  return (
    <div style={{ maxWidth: 800, margin: '2rem auto' }}>
      <h2>Issue 列表</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {issues.map(issue => (
          <li key={issue.number} style={{ borderBottom: '1px solid #eee', padding: '12px 0' }}>
            <strong>#{issue.number}</strong> {issue.title}
            <span style={{ marginLeft: 8, color: '#888' }}>{issue.state}</span>
            <span style={{ float: 'right', color: '#aaa' }}>{issue.created_at?.slice(0,10)}</span>
          </li>
        ))}
      </ul>
      {issues.length === 0 && <div style={{textAlign:'center',color:'#888'}}>暂无数据</div>}
    </div>
  );
};

export default IssueList; 