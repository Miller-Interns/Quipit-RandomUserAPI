<script lang="ts" setup>
  import { ref } from 'vue';
  import { useUsers } from '@/composables/use-user';
  import type { User } from '@/types/User';
  import UserModal from '@/components/user-modal.vue';
  import RefreshIcon from '@/assets/icons/refresh-icon.vue';
  import InfoIcon from '@/assets/icons/info-icon.vue';
  import { GENDER } from '@/enums/user-gender';
  import '@/assets/css/user-card.css';

  const { setFilter, filteredUsers, nextPage, prevPage, refresh, currentPage } =
    useUsers();
  const selectedUser = ref<User | null>(null);

  function openUserModal(user: User) {
    selectedUser.value = user;
  }

  function closeUserModal() {
    selectedUser.value = null;
  }
</script>

<template>
  <div class="main-container">
    <h3>Randomly Generated Users</h3>
    <div class="filters-group">
      <button @click="setFilter(GENDER.All)">All</button>
      <button @click="setFilter(GENDER.Male)">Male</button>
      <button @click="setFilter(GENDER.Female)">Female</button>
    </div>
    <div class="user-container">
      <ul class="users-list">
        <li v-for="user in filteredUsers" :key="user.login.username">
          <img :src="user.picture.thumbnail" alt="User picture" />
          <span>{{ user.name.first }} {{ user.name.last }}</span>
          <div @click="openUserModal(user)" class="info-button">
            <InfoIcon />
          </div>
        </li>
      </ul>
    </div>
    <div class="pagination-group">
      <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
      <span>Page {{ currentPage }}</span>
      <button @click="nextPage">Next</button>
      <div @click="refresh" class="refresh-button">
        <RefreshIcon />
      </div>
    </div>
    <UserModal
      v-if="selectedUser"
      :user="selectedUser"
      @close="closeUserModal"
      class="modal"
    />
  </div>
</template>
