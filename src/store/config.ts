import { create } from 'zustand';

interface ConfigState {
  token: string;
  repo: string;
  setToken: (token: string) => void;
  setRepo: (repo: string) => void;
}

// 开发测试阶段，token和repo写死
const DEFAULT_TOKEN = '1s1f18jNa3xz6YofFqFgf1HbldE';
const DEFAULT_REPO = 'cnb.ai/testblog';

export const useConfigStore = create<ConfigState>((set) => ({
  token: DEFAULT_TOKEN,
  repo: DEFAULT_REPO,
  setToken: (token) => {
    sessionStorage.setItem('cnb_token', token);
    set({ token });
  },
  setRepo: (repo) => {
    sessionStorage.setItem('cnb_repo', repo);
    set({ repo });
  },
})); 