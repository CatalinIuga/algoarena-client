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
</script>

<template>
  <section
    class="container flex justify-center w-[600px] py-10 [&>div]:w-full items-center"
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
          <Input id="username" type="text" placeholder="<your_username>" />
        </div>
        <div class="grid gap-2">
          <Label for="email">Email</Label>
          <Input id="email" type="email" placeholder="<your@email.com>" />
        </div>

        <div class="grid gap-2">
          <Label for="password">Password</Label>
          <Input id="password" type="password" placeholder="<your_password>" />
        </div>
      </CardContent>
      <CardFooter>
        <Button class="w-full">Create account</Button>
        <div class="flex justify-center items-center mt-4">
          <span class="text-sm">Already have an account?</span>
          <Button variant="link" as-child>
            <router-link to="/login">Login</router-link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  </section>
</template>
