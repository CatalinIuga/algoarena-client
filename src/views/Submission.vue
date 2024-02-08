<script setup lang="ts">
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { languages } from "@/lib/languages";
import { getSubmission } from "@/service/submissionService";
import { authStore } from "@/store";
import { SubmissionResponse } from "@/types/submission";
import { storeToRefs } from "pinia";
import { computed, onMounted, ref } from "vue";
import { Codemirror } from "vue-codemirror";
import { useRouter } from "vue-router";
import { oneDark as shadCn } from "../lib/codemirror";

const store = authStore();
const { token } = storeToRefs(store);
const router = useRouter();

const id = parseInt(router.currentRoute.value.params.id as string);
const submission = ref<SubmissionResponse>();
const language = ref("C++");
onMounted(async () => {
  submission.value = await getSubmission(token.value, id);
  language.value = Object.keys(languages).find(
    (key) => languages[key].id === submission.value?.language_id,
  ) as string;
});

const extensions = computed(() => {
  const lang = languages[language.value];
  // TODO: base extension pack (line wrap, etc...)
  const newExtensions = [shadCn];
  newExtensions.push(lang.extension() as any);
  return newExtensions;
});
</script>

<template>
  <div
    v-if="submission !== undefined"
    class="grid h-full w-full grid-cols-1 place-items-start gap-4 overflow-hidden md:grid-cols-8"
  >
    <!-- Problem  -->
    <div class="w-full p-4 md:col-span-3 md:h-[85vh] md:pr-0">
      <Card class="max-h-full w-full justify-between overflow-y-scroll">
        <CardHeader class="gap-2 py-4">
          <CardTitle class="text-2xl font-bold">{{ "Submission" }}</CardTitle>
          <CardDescription class="px-2 text-sm">
            <span class="font-semibold">Author: </span>
            <span class="font-semibold text-primary underline">
              {{ submission.problem.author.username }}
            </span>
          </CardDescription>
          <CardDescription class="px-2 text-sm">
            <span class="font-semibold">Language: </span>
            <span :class="languages[language].color">{{ language }}</span>
          </CardDescription>
          <CardDescription class="px-2 text-sm">
            <span class="font-semibold">Status: </span>
            <span
              class="rounded-full px-3 py-1 text-xs font-semibold capitalize text-foreground"
              :class="
                submission.status === 'Accepted' ? 'bg-green-500' : 'bg-red-500'
              "
            >
              {{ submission.status.toLowerCase() }}</span
            >
          </CardDescription>
          <CardDescription class="px-2 text-sm">
            <span class="font-semibold">Message: </span>
            <span class="text-foreground">
              {{ submission.message || "No message" }}
            </span>
          </CardDescription>
          <CardDescription class="flex gap-3 px-2 text-sm">
            <span class="font-semibold">Categories: </span>
            <span class="flex flex-wrap items-center justify-center gap-1">
              <Badge
                v-for="category in submission.problem.categories"
                :key="category.id"
                :variant="'outline'"
              >
                {{ category.categoryName }}
              </Badge>
            </span>
          </CardDescription>
          <CardDescription class="px-2 text-sm">
            <span class="font-semibold">Difficulty: </span>
            <span
              class="rounded-full px-3 py-1 text-xs font-semibold capitalize text-foreground"
              :class="
                submission.problem.difficulty === 'EASY'
                  ? 'bg-green-500'
                  : submission.problem.difficulty === 'MEDIUM'
                    ? 'bg-orange-500'
                    : 'bg-red-500'
              "
              >{{ submission.problem.difficulty.toLowerCase() }}</span
            >
          </CardDescription>
          <CardDescription class="flex justify-center px-2 pt-4 text-sm">
            <Button as-child>
              <router-link :to="'/problems/' + submission.problem.id">
                View Problem
              </router-link>
            </Button>
          </CardDescription>
        </CardHeader>
      </Card>
    </div>

    <!-- Code editor -->
    <div
      class="h-full w-full flex-col overflow-hidden px-4 py-4 md:col-span-5 md:flex md:pl-0"
    >
      <Codemirror
        v-model="submission.code"
        :style="{
          height: 'calc(100%)',
          overflow: 'hidden',
          borderRadius: '0.5rem',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }"
        :disabled="true"
        :extensions="extensions"
      />
    </div>
  </div>
</template>
