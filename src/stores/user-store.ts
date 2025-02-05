import { defineStore } from 'pinia';
import type { User } from '@/types/User';

export const useUserStore = defineStore('user', {
  state: () => ({
    pages: {} as Record<number, User[]>,
    currentPage: 1,
  }),

  actions: {
    setPage(pageNumber: number, users: User[]) {
      this.pages[pageNumber] = users;
      sessionStorage.setItem('pages', JSON.stringify(this.pages));
    },

    setCurrentPage(pageNumber: number) {
      this.currentPage = pageNumber;
    },

    loadFromSession() {
      const data = sessionStorage.getItem('pages');
      if (data) {
        this.pages = JSON.parse(data);
      }
    },

    clearPages() {
      this.pages = {};
      sessionStorage.removeItem('pages');
    },
  },
});
