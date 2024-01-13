<script setup lang="ts">
import { Button } from "@/components/ui/button";
</script>

<template>
  <footer class="flex border-t justify-center items-center h-16 bg-background">
    <p class="text-foreground/80">
      &copy; {{ new Date().getFullYear() }}
      <router-link to="/" class="text-primary">
        <Button variant="link">AlgoArena</Button>
      </router-link>
    </p>
  </footer>
</template>
