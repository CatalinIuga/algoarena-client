<script setup lang="ts">
import Button from "@/components/ui/button/Button.vue";
</script>

<template>
  <div class="flex-1 flex flex-col justify-center items-center">
    <h1 class="text-6xl font-extrabold tracking-tight text-primary">404</h1>
    <p class="mt-4 text-lg text-foreground/80">
      The page you are looking for does not exist.
    </p>
    <Button class="mt-8" variant="default" as-child>
      <router-link to="/">Go Home</router-link>
    </Button>
  </div>
</template>
