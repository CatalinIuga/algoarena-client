<script setup lang="ts">
import ButtonVue from "@/components/ui/button/Button.vue";

import { router } from "@/router";
</script>

<template>
  <div>
    <h1>404</h1>
    <p>Page not found</p>
    <router-link to="/">
      <ButtonVue>Go to Home</ButtonVue>
    </router-link>
  </div>
</template>
