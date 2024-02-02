<script setup lang="ts">
import Button from "@/components/ui/button/Button.vue";
import { authStore } from "@/store";
import { storeToRefs } from "pinia";
import { reactive } from "vue";
import { useRouter } from "vue-router";

const store = authStore();
const { userId } = storeToRefs(store);

const router = useRouter();
const route = reactive(router.currentRoute.value);

const logout = async () => {
  await store.signOut();
};

router.afterEach((to) => {
  route.path = to.path;
});
</script>

<template>
  <header
    class="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-lg"
  >
    <!-- MAIN WRAPPER -->
    <div class="container flex h-14 items-center justify-between">
      <!-- LOGO SECTION -->
      <section class="flex items-center">
        <Button
          class="mr-2 text-lg font-extrabold text-foreground no-underline"
          variant="ghost"
          as-child
        >
          <router-link to="/">
            <img src="/logo.svg" alt="algo-arena" class="mr-2 h-8" />
            AlgoArena
          </router-link>
        </Button>

        <!-- LINKS SECTION -->
        <div class="hidden md:block">
          <Button
            variant="outline"
            class="mr-2"
            :class="[
              route.path === '/problemsets'
                ? 'hover:text-primaru/80 text-primary'
                : 'text-foreground/70',
            ]"
            as-child
          >
            <router-link to="/problemsets">Problem Sets</router-link>
          </Button>
          <Button
            variant="outline"
            class="items-center"
            :class="[
              route.path === '/leaderboards'
                ? 'hover:text-primaru/80 text-primary'
                : 'text-foreground/70',
            ]"
            as-child
          >
            <router-link to="/leaderboards">Leaderboards</router-link>
          </Button>
        </div>
      </section>

      <!-- AUTH SECTION -->
      <div v-if="!userId" class="flex items-center">
        <Button class="mr-4 px-7" variant="default" as-child>
          <router-link to="/login">Login</router-link>
        </Button>
        <Button variant="secondary" as-child>
          <router-link to="/register">Register</router-link>
        </Button>
      </div>

      <!-- USER SECTION -->
      <div v-else class="flex items-center">
        <Button size="sm" class="mr-4" variant="default" as-child>
          <router-link to="/profile">Profile</router-link>
        </Button>
        <Button @click="logout" size="sm" class="px-4" variant="secondary">
          Logout
        </Button>
      </div>
    </div>
  </header>
</template>
