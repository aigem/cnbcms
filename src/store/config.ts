import { create } from 'zustand';

interface ConfigState {
  token: string;
  repo: string;
  setToken: (token: string) => void;
  setRepo: (repo: string) => void;
}

export const useConfigStore = create<ConfigState>((set) => ({
  token: '',
  repo: '',
  setToken: (token) => {
    sessionStorage.setItem('cnb_token', token);
    set({ token });
  },
  setRepo: (repo) => {
    sessionStorage.setItem('cnb_repo', repo);
    set({ repo });
  },
})); 