'use client';
import React, { useState } from 'react';
import { useConfigStore } from '../store/config';

const ConfigForm: React.FC = () => {
  const { token, repo, setToken, setRepo } = useConfigStore();
  const [localToken, setLocalToken] = useState(token);
  const [localRepo, setLocalRepo] = useState(repo);

  const handleSave = () => {
    setToken(localToken);
    setRepo(localRepo);
    alert('配置已保存！');
  };

  return (
    <div style={{ maxWidth: 400, margin: '2rem auto', padding: 24, border: '1px solid #eee', borderRadius: 8 }}>
      <h2>配置</h2>
      <div style={{ marginBottom: 16 }}>
        <label>Token：</label>
        <input
          type="password"
          value={localToken}
          onChange={e => setLocalToken(e.target.value)}
          style={{ width: '100%' }}
        />
      </div>
      <div style={{ marginBottom: 16 }}>
        <label>Repo：</label>
        <input
          type="text"
          value={localRepo}
          onChange={e => setLocalRepo(e.target.value)}
          style={{ width: '100%' }}
        />
      </div>
      <button onClick={handleSave} style={{ width: '100%', padding: 8 }}>保存</button>
    </div>
  );
};

export default ConfigForm; 