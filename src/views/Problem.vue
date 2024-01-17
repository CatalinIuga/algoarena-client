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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";
import { computed, ref } from "vue";
import { Codemirror } from "vue-codemirror";
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
const code = computed(() => languages[language.value].code);

const extensions = [javascript(), oneDark];
</script>

<template>
  <!-- Main wrapper -->
  <div
    class="grid min-h-full min-w-full grid-cols-1 place-items-center gap-4 overflow-hidden md:grid-cols-8"
  >
    <!-- Problem  -->
    <div class="h-full w-full py-4 pl-4 md:col-span-3">
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
    <div class="flex h-full w-full flex-col py-4 pr-4 md:col-span-5">
      <div class="flex items-center justify-between p-2">
        <Select :default-value="language" v-model="language">
          <SelectTrigger class="max-w-fit">
            <SelectValue class="px-2" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem
              v-for="lang in Object.keys(languages)"
              :value="lang"
              :key="lang"
            >
              {{ lang }}
            </SelectItem>
          </SelectContent>
        </Select>
        <Button size="sm" variant="default">
          Submit
        </Button>
      </div>
      <Codemirror
        :autofocus="true"
        style="height: 100%; overflow-y: auto; padding: 4px"
        :extensions="extensions"
        v-model="code"
      />
    </div>
  </div>
</template>
