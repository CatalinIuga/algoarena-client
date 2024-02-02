<script setup lang="ts">
import Footer from "@/components/Footer.vue";
import Header from "@/components/Header.vue";
</script>

<template>
  <div class="flex min-h-screen flex-col bg-background text-foreground">
    <Header />
    <main class="container flex h-full w-full flex-1 bg-background">
      <router-view />
    </main>
    <Footer />
  </div>
</template>
