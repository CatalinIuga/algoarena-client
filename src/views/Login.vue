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
import { useToast } from "@/components/ui/toast";
import { authStore } from "@/store";
import { LoginRequest } from "@/types/auth";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router";

const { toast } = useToast();

const router = useRouter();

const store = authStore();
const { userId, isLoading, error } = storeToRefs(store);

const email = ref("");
const password = ref("");

const submit = async () => {
  // validate inputs
  if (!email.value || !password.value) {
    toast({
      title: "Error",
      description: "All fields are required",
      variant: "destructive",
    });
    return;
  }

  if (password.value.length < 6) {
    toast({
      title: "Error",
      description: "Password must be at least 6 characters",
      variant: "destructive",
    });
    return;
  }

  if (email.value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g) === null) {
    toast({
      title: "Error",
      description: "Invalid email",
      variant: "destructive",
    });
    return;
  }

  const data: LoginRequest = {
    email: email.value,
    password: password.value,
  };
  await store.signIn(data);
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
        <CardTitle class="text-3xl"> Login to your account </CardTitle>
        <CardDescription class="pt-4">
          Login using your email and password.
        </CardDescription>
      </CardHeader>
      <CardContent class="grid gap-4">
        <div class="grid gap-2">
          <Label for="email">Email</Label>
          <Input
            v-model="email"
            id="email"
            type="email"
            required
            placeholder="<your_email.com>"
          />
        </div>
        <div class="grid gap-2">
          <Label for="password">Password</Label>
          <Input
            v-model="password"
            id="password"
            min="6"
            required
            type="password"
            placeholder="<your_password>"
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button @click="submit" class="w-full">
          {{ isLoading ? "Loading..." : "Login" }}
        </Button>
        <div class="mt-4 flex items-center justify-center">
          <span class="text-sm">Don't have an account?</span>
          <Button variant="link" as-child>
            <router-link to="/signup"> Create an account </router-link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  </section>
</template>
