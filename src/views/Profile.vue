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
import { useToast } from "@/components/ui/toast/use-toast";
import { changeUserPassword } from "@/service/authService";
import {
  deleteUserAccount,
  getProfile,
  updateUserProfile,
  getUserSubmissions,
} from "@/service/userService";
import { authStore } from "@/store";
import { ProfileResponse } from "@/types/user";
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";
import { SubmissionResponse } from "@/types/submission";

const { toast } = useToast();
const store = authStore();
const { userId, token } = storeToRefs(store);

const profile = ref<ProfileResponse>({
  id: 0,
  email: "",
  avatar: "",
  createdAt: "",
  role: "",
  username: "",
});

const isLoading = ref(false);

const usernameInput = ref("");
const emailInput = ref("");
const avatarInput = ref<File>();
const passwordInput = ref("");
const newPasswordInput = ref("");

onMounted(async () => {
  try {
    isLoading.value = true;
    profile.value = await getProfile(token.value, userId.value);
    usernameInput.value = profile.value.username;
    emailInput.value = profile.value.email;
    submissions.value = await getUserSubmissions(userId.value);
  } catch (error) {
    console.log(error);
  }
  // await new Promise((resolve) => setTimeout(resolve, 1000));
  isLoading.value = false;
});

const editProfile = async () => {
  const form = new FormData();
  form.append("username", usernameInput.value);
  form.append("email", emailInput.value);
  if (avatarInput.value) {
    form.append("avatar", avatarInput.value);
  }

  try {
    const newJwt = await updateUserProfile(token.value, userId.value, form);
    token.value = newJwt.token;

    toast({
      title: "Profile updated",
      description: "Your profile has been updated successfully.",
      variant: "default",
    });
    profile.value = await getProfile(token.value, userId.value);
  } catch (error: any) {
    toast({
      title: "Error",
      description: error,
      variant: "destructive",
    });
    console.log(error.message);
  }
};

const changePassword = async () => {
  try {
    await changeUserPassword(
      userId.value!,
      passwordInput.value,
      newPasswordInput.value,
    );
    toast({
      title: "Password changed",
      description: "Your password has been changed successfully.",
      variant: "default",
    });
  } catch (error: any) {
    toast({
      title: "Error",
      description: error,
      variant: "destructive",
    });
    console.log(error.message);
  }
};

const deleteAccount = async () => {
  try {
    await deleteUserAccount(token.value, userId.value);
    toast({
      title: "Account deleted",
      description: "Your account has been deleted successfully.",
      variant: "default",
    });
  } catch (error: any) {
    toast({
      title: "Error",
      description: error,
      variant: "destructive",
    });
    console.log(error.message);
    return;
  }
  await store.signOut();
};

const submissions = ref<SubmissionResponse[]>([]);
</script>

<template>
  <div v-if="isLoading" class="flex w-full items-center justify-center">
    <svg class="h-10 w-10 animate-spin text-primary" viewBox="0 0 24 24">
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      ></circle>
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  </div>

  <div v-else class="flex flex-1 grid-cols-7 flex-col gap-5 p-5 md:grid">
    <!-- User data section -->
    <section class="col-span-2 flex flex-col gap-2">
      <Card>
        <CardHeader class="items-center gap-3">
          <h1 class="text-2xl font-bold">Profile</h1>
          <Avatar class="size-20">
            <AvatarImage :src="profile.avatar" />
            <AvatarFallback
              :name="`https://api.dicebear.com/7.x/initials/svg?seed=${profile.username}`"
            />
          </Avatar>
          <CardTitle class="font-extrabold text-primary">{{
            profile.username
          }}</CardTitle>
          <CardDescription>{{ profile.email }}</CardDescription>
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
                  <Label for="avatar" class="text-right"> Avatar </Label>
                  <Input
                    type="file"
                    id="avatar"
                    @input="avatarInput = $event.target.files[0]"
                    accept="
                      image/png,
                      image/jpeg,
                      image/jpg,
                      image/gif,
                      image/svg+xml
                      "
                    class="col-span-3 file:text-primary/80"
                  />
                </div>
                <div class="grid grid-cols-4 items-center gap-4">
                  <Label for="name" class="text-right">Username</Label>
                  <Input id="name" v-model="usernameInput" class="col-span-3" />
                </div>
                <div class="grid grid-cols-4 items-center gap-4">
                  <Label for="username" class="text-right">Email</Label>
                  <Input
                    id="username"
                    v-model="emailInput"
                    class="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button class="w-full" @click="editProfile">
                  Save changes
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <!-- Password Change -->
          <Dialog>
            <DialogTrigger as-child>
              <Button variant="secondary" class="w-full">
                Change password
              </Button>
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
                  <Input
                    v-model="passwordInput"
                    id="password"
                    type="password"
                    class="col-span-3"
                  />
                </div>
                <div class="grid grid-cols-4 items-center gap-4">
                  <Label for="password" class="text-right">New password</Label>
                  <Input
                    v-model="newPasswordInput"
                    id="new_password"
                    type="password"
                    class="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button @click="changePassword" class="w-full" type="submit">
                  Save changes
                </Button>
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
                  @click="deleteAccount"
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
    <section class="col-span-5 flex flex-col gap-2">
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
                v-for="submission in submissions.slice(0, 5)"
                :key="submission.id"
              >
                <TableCell>{{ submission.problem.name }}</TableCell>
                <TableCell
                  :class="
                    submission.status === 'Accepted'
                      ? 'text-green-500'
                      : 'text-red-500'
                  "
                  >{{ submission.status }}</TableCell
                >
                <TableCell>{{ submission.language_id }}</TableCell>
                <TableCell>{{ submission.time }}</TableCell>
                <TableCell>{{ submission.memory }}</TableCell>
                <TableCell>{{ "2021-01-01" }}</TableCell>
                <!-- <TableCell>{{ submission.date }}</TableCell> -->
              </TableRow>
              <TableEmpty :colspan="6" v-else>
                <div class="flex flex-col items-center justify-center gap-5">
                  No submissions yet
                  <Button as-child>
                    <router-link to="/problems">Solve a problem!</router-link>
                  </Button>
                </div>
              </TableEmpty>
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter v-if="submissions.length > 5" class="flex justify-center">
          <Button as-child>
            <router-link to="/submissions">View all</router-link>
          </Button>
        </CardFooter>
      </Card>
    </section>
  </div>
</template>
