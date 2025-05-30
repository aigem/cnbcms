import axios from 'axios';

// Token和repo配置由store管理，这里只做API封装
const getToken = () => sessionStorage.getItem('cnb_token') || '';
const getRepo = () => sessionStorage.getItem('cnb_repo') || '';

const api = axios.create({
  baseURL: '/api/cnb',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export const cnbApi = {
  // 获取Issue列表
  getIssues: (params: any = {}) =>
    api.get(`/${getRepo()}/-/issues`, { params }).then(res => res.data),

  // 获取单个Issue详情
  getIssue: (number: number) =>
    api.get(`/${getRepo()}/-/issues/${number}`).then(res => res.data),

  // 创建Issue
  createIssue: (data: any) =>
    api.post(`/${getRepo()}/-/issues`, data).then(res => res.data),

  // 编辑Issue
  updateIssue: (number: number, data: any) =>
    api.patch(`/${getRepo()}/-/issues/${number}`, data).then(res => res.data),

  // 获取评论
  getComments: (number: number, params: any = {}) =>
    api.get(`/${getRepo()}/-/issues/${number}/comments`, { params }).then(res => res.data),

  // 新增评论
  addComment: (number: number, data: any) =>
    api.post(`/${getRepo()}/-/issues/${number}/comments`, data).then(res => res.data),
}; 