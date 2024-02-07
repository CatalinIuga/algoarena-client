<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableEmpty,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { languages } from "@/lib/languages";
import { getUserSubmissions } from "@/service/userService";
import { authStore } from "@/store";
import { SubmissionResponse } from "@/types/submission";
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";

const store = authStore();
const { userId } = storeToRefs(store);
const isLoading = ref(false);

onMounted(async () => {
  try {
    isLoading.value = true;
    submissions.value = await getUserSubmissions(userId.value);
    console.log(submissions.value);
  } catch (error) {
    console.log(error);
  }
  isLoading.value = false;
});

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

  <div v-else class="flex flex-1 grid-cols-1 flex-col gap-5 p-5 md:grid">
    <!-- User submissions section -->
    <section class="col-span-1 flex flex-col gap-2">
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
                <TableCell>{{ submission.problem.name }}</TableCell>
                <TableCell
                  :class="
                    submission.status === 'Accepted'
                      ? 'text-green-500'
                      : 'text-red-500'
                  "
                  >{{ submission.status }}</TableCell
                >
                <TableCell>{{
                  languages[
                    Object.keys(languages).find(
                      (key) => languages[key].id === submission.language_id,
                    ) || "C++"
                  ].name
                }}</TableCell>
                <TableCell>{{ submission.time }}</TableCell>
                <TableCell>{{ submission.memory }}</TableCell>
                <TableCell>{{ submission.date.replace(/T/g, " ") }}</TableCell>
              </TableRow>
              <TableEmpty :colspan="6" v-else>
                No submissions yet...
              </TableEmpty>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </section>
  </div>
</template>
