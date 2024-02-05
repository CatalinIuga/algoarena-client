<script setup lang="ts">
import Button from "@/components/ui/button/Button.vue";
import { authStore } from "@/store";
import { storeToRefs } from "pinia";
import { reactive } from "vue";
import { useRouter } from "vue-router";

const store = authStore();

const { userId, isLoading } = storeToRefs(store);

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
              route.path === '/problems'
                ? 'hover:text-primaru/80 text-primary'
                : 'text-foreground/70',
            ]"
            as-child
          >
            <router-link to="/problems">Problems</router-link>
          </Button>
        </div>
      </section>

      <div v-if="isLoading" id="skeleton" class="">
        <div class="flex items-center">
          <Button
            size="sm"
            class="mr-4 w-[82px] px-7 text-transparent"
            variant="default"
          >
            Profile
          </Button>
          <Button
            size="sm"
            variant="secondary"
            class="w-[82px] text-transparent"
          >
            Logout
          </Button>
        </div>
      </div>

      <!-- AUTH SECTION -->
      <div v-else-if="!userId" class="flex items-center">
        <Button size="sm" class="mr-4 w-[82px]" variant="default" as-child>
          <router-link to="/login">Login</router-link>
        </Button>
        <Button size="sm" variant="secondary" class="w-[82px]" as-child>
          <router-link to="/signup">Signup</router-link>
        </Button>
      </div>

      <!-- USER SECTION -->
      <div v-else="userId" class="flex items-center">
        <Button size="sm" class="mr-4 w-[82px]" variant="default" as-child>
          <router-link to="/profile">Profile</router-link>
        </Button>
        <Button
          @click="logout"
          size="sm"
          class="w-[82px] px-4"
          variant="secondary"
        >
          Logout
        </Button>
      </div>
    </div>
  </header>
</template>
