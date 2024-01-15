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
router.afterEach((to) => {
  route.path = to.path;
});
</script>

<template>
  <header
    class="sticky z-40 top-0 bg-background/80 backdrop-blur-lg border-b border-border"
  >
    <!-- MAIN WRAPPER -->
    <div class="h-14 container flex justify-between items-center">
      <!-- LOGO SECTION -->
      <section class="flex items-center">
        <Button
          class="font-extrabold text-lg text-foreground no-underline mr-2"
          variant="ghost"
          as-child
        >
          <router-link to="/">
            <img src="/logo.svg" alt="algo-arena" class="h-8 mr-2" />
            AlgoArena
          </router-link>
        </Button>

        <!-- LINKS SECTION -->
        <div class="hidden md:block">
          <Button
            variant="outline"
            class="mr-2"
            :class="[
              route.path === '/problems'
                ? 'text-primary'
                : 'text-foreground/70',
            ]"
            as-child
          >
            <router-link to="/problems">Problems</router-link>
          </Button>
          <Button
            variant="outline"
            class="items-center"
            :class="[
              route.path === '/leaderboards'
                ? 'text-primary'
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
          <router-link to="/login">
            <!-- {{ route.path }}-->
            Login
          </router-link>
        </Button>
        <Button variant="secondary" as-child>
          <router-link to="/register">Register</router-link>
        </Button>
      </div>

      <!-- USER SECTION -->
      <div v-else class="flex items-center">
        <Button class="mr-4" variant="default" as-child>
          <router-link to="/profile">Profile</router-link>
        </Button>
        <Button variant="outline">Logout</Button>
      </div>
    </div>
  </header>
</template>
