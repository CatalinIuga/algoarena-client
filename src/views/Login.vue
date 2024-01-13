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
    class="container flex justify-center w-[700px] [&>div]:w-full items-center"
  >
    <!-- LOGIN INPUTS -->
    <Card>
      <CardHeader class="space-y-1">
        <CardTitle class="text-2xl"> Create an account </CardTitle>
        <CardDescription>
          Enter your email below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent class="grid gap-4">
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
        <Button class="w-full"> Create account </Button>

        <div class="flex justify-center items-center gap-5 mt-4">
          <span class="text-sm"> Already have an account? </span>
          <Button variant="link"> Login </Button>
        </div>
      </CardFooter>
    </Card>
  </section>
</template>
