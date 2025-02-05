import { ref, computed, onMounted } from 'vue';
import { useUserStore } from '@/stores/user-store';
import type { User } from '@/types/User';

export function useUsers() {
  const userStore = useUserStore();
  const filter = ref<'all' | 'male' | 'female'>('all');

  function clearLocalData() {
    userStore.clearPages();
  }

  async function fetchUsers(page: number, results: number = 10) {
    try {
      const res = await fetch(
        `https://randomuser.me/api/?page=${page}&results=${results}`
      );
      const data = await res.json();
      const users: User[] = data.results;
      userStore.setPage(page, users);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }

  async function refreshCurrentPage(results: number = 10) {
    const currentPage = userStore.currentPage;
    try {
      const res = await fetch(
        `https://randomuser.me/api/?page=${currentPage}&results=${results}`
      );
      const data = await res.json();
      const users: User[] = data.results;
      userStore.setPage(currentPage, users);
    } catch (error) {
      console.error('Error refreshing users:', error);
    }
  }

  const filteredUsers = computed(() => {
    const currentPage = userStore.currentPage;
    const users = userStore.pages[currentPage] || [];
    if (filter.value === 'all') return users;
    return users.filter((user) => user.gender === filter.value);
  });

  function setFilter(newFilter: 'all' | 'male' | 'female') {
    if (filter.value !== newFilter) {
      filter.value = newFilter;
      clearLocalData();
      userStore.setCurrentPage(1);
      fetchUsers(1);
    }
  }

  async function changePage(page: number, results: number = 10) {
    userStore.setCurrentPage(page);
    if (!userStore.pages[page]) {
      await fetchUsers(page, results);
    }
  }

  function nextPage() {
    changePage(userStore.currentPage + 1);
  }

  function prevPage() {
    if (userStore.currentPage > 1) {
      changePage(userStore.currentPage - 1);
    }
  }

  function refresh() {
    clearLocalData();
    refreshCurrentPage();
  }

  const currentPage = computed(() => userStore.currentPage);

  onMounted(async () => {
    clearLocalData();
    init();
    await fetchUsers(userStore.currentPage);
  });

  function init() {
    userStore.loadFromSession();
  }

  return {
    filter,
    setFilter,
    filteredUsers,
    fetchUsers,
    refreshCurrentPage,
    changePage,
    init,
    nextPage,
    prevPage,
    refresh,
    currentPage,
  };
}
