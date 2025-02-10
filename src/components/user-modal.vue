<script setup lang="ts">
  import { defineProps, defineEmits } from 'vue';
  import type { User } from '@/types/User';
  import '@/assets/css/user-modal.css';
  import FemaleIcon from '@/assets/icons/female-icon.vue';
  import MaleIcon from '@/assets/icons/male-icon.vue';
  import PhoneIcon from '@/assets/icons/phone-icon.vue';
  import EmailIcon from '@/assets/icons/email-icon.vue';
  import LocationIcon from '@/assets/icons/location-icon.vue';
  import BirthdayIcon from '@/assets/icons/birthday-icon.vue';
  import { GENDER } from '@/enums/user-gender';

  const { user } = defineProps<{ user: User }>();
  const emit = defineEmits<{ (e: 'close'): void }>();

  function close() {
    emit('close');
  }
</script>

<template>
  <div class="modal-overlay" @click.self="close">
    <div class="modal-content">
      <div class="bg-image">
        <img :src="user.picture.large" alt="User picture" />
      </div>
      <div class="content-body">
        <div class="user-header">
          <h2>
            {{ user.name.title }} {{ user.name.first }} {{ user.name.last }}
          </h2>
          <MaleIcon v-if="user.gender === GENDER.Male" />
          <FemaleIcon v-else-if="user.gender === GENDER.Female" />
        </div>
        <div class="user-body">
          <p>
            <BirthdayIcon />
            {{ new Date(user.dob.date).toLocaleDateString() }},
            {{ user.dob.age }}
          </p>
          <p><EmailIcon /> {{ user.email }}</p>
          <p><strong>Username:</strong> {{ user.login.username }}</p>
          <p><strong>Password:</strong> {{ user.login.password }}</p>
          <p>
            <br />
            <LocationIcon />
            {{ user.location.street.number }} {{ user.location.street.name }},
            {{ user.location.city }}, {{ user.location.state }},
            {{ user.location.country }} - {{ user.location.postcode }}
          </p>
          <p><PhoneIcon /> {{ user.phone }}</p>
        </div>
        <button class="close-button" @click="close">Close</button>
      </div>
    </div>
  </div>
</template>
