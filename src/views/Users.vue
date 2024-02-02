<script setup lang="ts">
import { onMounted, ref } from "vue";

const users = ref<any>([]);

onMounted(async () => {
  const res = await fetch("http://localhost:8080/users");
  users.value = await res.json();
});
</script>

<template>
  <ul>
    <li v-for="user in users" :key="user.id">
      {{ user.username }}
    </li>
  </ul>
</template>
