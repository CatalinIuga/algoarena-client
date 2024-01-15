<script setup lang="ts">
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableEmpty,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { ref } from "vue";

// On mont we will fetch the user data based on the id stored in the store
const user = ref({ name: "test", email: "test@email.com" });
const image = ref("https://picsum.photos/300/300");

const submissions = ref([
  {
    id: 1,
    problemName: "Problem 1",
    problemId: 1,
    verdict: "Unaccepted",
    language: "C++",
    time: "1.2s",
    memory: "1.2MB",
    date: "2021-01-01",
  },
  {
    id: 2,
    problemName: "Problem 2",
    problemId: 2,
    verdict: "Accepted",
    language: "C++",
    time: "1.2s",
    memory: "1.2MB",
    date: "2021-01-01",
  },
  {
    id: 3,
    problemName: "Problem 3",
    problemId: 3,
    verdict: "Accepted",
    language: "C++",
    time: "1.2s",
    memory: "1.2MB",
    date: "2021-01-01",
  },
  {
    id: 4,
    problemName: "Problem 4",
    problemId: 4,
    verdict: "Accepted",
    language: "C++",
    time: "1.2s",
    memory: "1.2MB",
    date: "2021-01-01",
  },
  {
    id: 5,
    problemName: "Problem 5",
    problemId: 5,
    verdict: "Accepted",
    language: "C++",
    time: "1.2s",
    memory: "1.2MB",
    date: "2021-01-01",
  },
  {
    id: 6,
    problemName: "Problem 6",
    problemId: 6,
    verdict: "Accepted",
    language: "C++",
    time: "1.2s",
    memory: "1.2MB",
    date: "2021-01-01",
  },
]);
</script>

<template>
  <div class="flex flex-col md:grid grid-cols-7 gap-5 flex-1 p-5">
    <!-- User data section -->
    <section class="flex flex-col col-span-2 gap-2">
      <Card>
        <CardHeader class="items-center gap-3">
          <h1 class="text-2xl font-bold">Profile</h1>
          <Avatar class="size-20">
            <AvatarImage :src="image" />
            <AvatarFallback :name="user.name + '.jpg'" />
          </Avatar>
          <CardTitle class="text-primary font-extrabold">{{
            user.name
          }}</CardTitle>
          <CardDescription>{{ user.email }}</CardDescription>
        </CardHeader>

        <CardContent class="flex flex-col gap-5">
          <!-- Profile Edit -->
          <Dialog>
            <DialogTrigger as-child>
              <Button class="w-full">Edit profile</Button>
            </DialogTrigger>
            <DialogContent class="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>Edit profile</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you're
                  done.
                </DialogDescription>
              </DialogHeader>
              <div class="grid gap-4 py-4">
                <div class="grid grid-cols-4 items-center gap-4">
                  <Label for="name" class="text-right">Username</Label>
                  <Input id="name" :value="user.name" class="col-span-3" />
                </div>
                <div class="grid grid-cols-4 items-center gap-4">
                  <Label for="username" class="text-right">Email</Label>
                  <Input id="username" :value="user.email" class="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button class="w-full" type="submit">Save changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <!-- Password Change -->
          <Dialog>
            <DialogTrigger as-child>
              <Button variant="secondary" class="w-full"
                >Change password</Button
              >
            </DialogTrigger>
            <DialogContent class="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>Change password</DialogTitle>
                <DialogDescription>
                  Change your password here. Click save when you're done.
                </DialogDescription>
              </DialogHeader>
              <div class="grid gap-4 py-4">
                <div class="grid grid-cols-4 items-center gap-4">
                  <Label for="password" class="text-right">Password</Label>
                  <Input id="password" type="password" class="col-span-3" />
                </div>
                <div class="grid grid-cols-4 items-center gap-4">
                  <Label for="password" class="text-right">New password</Label>
                  <Input id="new_password" type="password" class="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button class="w-full" type="submit">Save changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardContent>

        <!-- Delete Account -->
        <CardFooter>
          <AlertDialog>
            <AlertDialogTrigger as-child>
              <Button variant="destructive" class="w-full">
                Delete account
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent class="sm:max-w-lg">
              <AlertDialogHeader>
                <AlertDialogTitle>Delete account</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete your account? This action
                  cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel class="w-full">Cancel</AlertDialogCancel>
                <AlertDialogAction
                  class="w-full bg-destructive text-destructive-foreground hover:bg-destructive/80"
                >
                  Delete account
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardFooter>
      </Card>
    </section>

    <!-- User submissions section -->
    <section class="flex col-span-5 flex-col gap-2">
      <Card>
        <CardHeader class="items-center">
          <CardTitle>Submissions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Problem</TableHead>
                <TableHead>Verdict</TableHead>
                <TableHead>Language</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Memory</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody class="w-full">
              <TableRow
                v-if="submissions.length > 0"
                v-for="submission in submissions"
                :key="submission.id"
              >
                <TableCell>{{ submission.problemName }}</TableCell>
                <TableCell
                  :class="
                    submission.verdict === 'Accepted'
                      ? 'text-green-500'
                      : 'text-red-500'
                  "
                  >{{ submission.verdict }}</TableCell
                >
                <TableCell>{{ submission.language }}</TableCell>
                <TableCell>{{ submission.time }}</TableCell>
                <TableCell>{{ submission.memory }}</TableCell>
                <TableCell>{{ submission.date }}</TableCell>
              </TableRow>
              <TableEmpty :colspan="6" v-else>
                No submissions yet...
              </TableEmpty>
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter v-if="submissions.length > 0" class="flex justify-center">
          <Button as-child>
            <router-link to="/submissions">View all</router-link>
          </Button>
        </CardFooter>
      </Card>
    </section>
  </div>
</template>
