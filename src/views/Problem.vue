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

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { computed, ref, watch } from "vue";
import { Codemirror } from "vue-codemirror";
import { oneDark as shadCn } from "../lib/codemirror";
import { languages } from "../lib/languages";

const problem = {
  name: "Problem 1",
  description: "This is a problem",
  difficulty: "Easy",
  tags: ["Array", "String"],
  exampleInput: "1,2,3,4,5",
  exampleOutput: "1,2,3,4,5",
};

// changes based on selected language
const language = ref("C++");
const code = ref(languages[language.value].code);

watch(language, (lang) => {
  code.value = languages[lang].code;
});

const extensions = computed(() => {
  const lang = languages[language.value];
  // TODO: base extension pack (line wrap, etc...)
  const result = [shadCn];
  result.push(lang.extension() as any);
  return result;
});
</script>

<template>
  <!-- Main wrapper -->
  <div
    class="grid min-h-full min-w-full grid-cols-1 place-items-center gap-4 overflow-hidden md:grid-cols-8"
  >
    <!-- Problem  -->
    <div class="h-full w-full px-4 py-4 md:col-span-3 md:pr-0">
      <Card class="h-full w-full">
        <CardHeader>
          <CardTitle>{{ problem.name }}</CardTitle>
          <CardDescription>{{ problem.description }}</CardDescription>
        </CardHeader>
        <CardContent>
          <div class="flex flex-row justify-between">
            <div class="flex flex-col">
              <span class="text-sm font-semibold">Difficulty</span>
              <span class="text-sm">{{ problem.difficulty }}</span>
            </div>
            <div class="flex flex-col">
              <span class="text-sm font-semibold">Tags</span>
              <span class="text-sm">{{ problem.tags.join(", ") }}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <div class="flex flex-col">
            <span class="text-sm font-semibold">Example Input</span>
            <span class="text-sm">{{ problem.exampleInput }}</span>
          </div>
          <div class="flex flex-col">
            <span class="text-sm font-semibold">Example Output</span>
            <span class="text-sm">{{ problem.exampleOutput }}</span>
          </div>
        </CardFooter>
      </Card>
    </div>

    <!-- Code editor -->
    <div
      class="md: flex h-full w-full flex-col overflow-hidden px-4 py-4 md:col-span-5 md:pl-0"
    >
      <div
        class="flex items-center justify-between rounded-t-md border-b-2 bg-card px-3 py-2 shadow-md"
      >
        <DropdownMenu>
          <DropdownMenuTrigger>
            {{ language }}
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              v-for="lang in Object.keys(languages)"
              :value="lang"
              :key="lang"
              @click="language = lang"
            >
              {{ lang }}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button size="sm" variant="default"> Submit </Button>
      </div>
      <Codemirror
        :autofocus="true"
        style="
          height: calc(100vh - 56px - 64px - 91px);
          overflow-y: hidden;
          padding: 5px;
          border-radius: 0 0 6px 6px;
          box-shadow: 4px;
        "
        :extensions="extensions"
        v-model="code"
      />
    </div>
  </div>
</template>
