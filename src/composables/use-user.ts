import { ref, computed, onMounted } from 'vue';
import { useUserStore } from '@/stores/user-store';
import type { User } from '@/types/User';
import { GENDER } from '@/enums/user-gender';

export function useUsers() {
  const userStore = useUserStore();
  const filter = ref<GENDER>(GENDER.All);

  function clearLocalData() {
    userStore.clearPages();
  }

  async function fetchUsers(page: number, results: number = 10) {
    try {
      const res = await fetch(
        `https://randomuser.me/api/?` +
          new URLSearchParams({
            page: page.toString(),
            results: results.toString(),
          }).toString()
      );
      const data = await res.json();
      const users: User[] = data.results;
      userStore.setPage(page, users);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }

  const filteredUsers = computed(() => {
    const currentPage = userStore.currentPage;
    const users = userStore.pages[currentPage] || [];
    if (filter.value === 'all') return users;
    return users.filter((user) => user.gender === filter.value);
  });

  function setFilter(newFilter: GENDER) {
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
    fetchUsers(userStore.currentPage);
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
    changePage,
    init,
    nextPage,
    prevPage,
    refresh,
    currentPage,
  };
}
