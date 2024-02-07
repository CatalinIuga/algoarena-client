<script setup lang="ts">
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/toast/use-toast";
import { authStore } from "@/store";
import { RegisterRequest } from "@/types/auth";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router";

const { toast } = useToast();

const router = useRouter();

const store = authStore();
const { userId, isLoading, error } = storeToRefs(store);

const username = ref("");
const email = ref("");
const password = ref("");

const submit = async () => {
  console.log(email.value, password.value, username.value);
  const data: RegisterRequest = {
    email: email.value,
    password: password.value,
    username: username.value,
    avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${username.value}`,
  };
  await store.signUp(data);
  if (error.value) {
    toast({
      title: "Error",
      description: error.value,
      variant: "destructive",
    });
  }
  await store.checkAuth();
  if (userId.value) {
    router.push("/");
  }
};
</script>

<template>
  <section
    class="container flex w-[600px] items-center justify-center py-10 [&>div]:w-full"
  >
    <!-- LOGIN INPUTS -->
    <Card class="">
      <CardHeader class="space-y-1">
        <CardTitle class="text-3xl">Create an account</CardTitle>
        <CardDescription class="pt-4">
          An account is required to use the application.
        </CardDescription>
      </CardHeader>
      <CardContent class="grid gap-4">
        <div class="grid gap-2">
          <Label for="username">Username</Label>
          <Input
            v-model="username"
            id="username"
            type="text"
            placeholder="<your_username>"
          />
        </div>
        <div class="grid gap-2">
          <Label for="email">Email</Label>
          <Input
            v-model="email"
            id="email"
            type="email"
            placeholder="<your@email.com>"
          />
        </div>

        <div class="grid gap-2">
          <Label for="password">Password</Label>
          <Input
            v-model="password"
            id="password"
            type="password"
            placeholder="<your_password>"
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button @click="submit" class="w-full">
          {{ isLoading ? "Loading..." : "Create account" }}
        </Button>
        <div class="mt-4 flex items-center justify-center">
          <span class="text-sm">Already have an account?</span>
          <Button variant="link" as-child>
            <router-link to="/login">Login</router-link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  </section>
</template>
