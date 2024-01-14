<script setup lang="ts">
import { Button } from "@/components/ui/button";
</script>

<template>
  <footer class="flex border-t justify-center items-center h-16 bg-background">
    <p class="text-foreground/80">
      <router-link to="/" class="text-primary">
        <Button variant="link" class="text-base text-foreground"
          >AlgoArena</Button
        > </router-link
      >&copy; {{ new Date().getFullYear() }}
    </p>
  </footer>
</template>
