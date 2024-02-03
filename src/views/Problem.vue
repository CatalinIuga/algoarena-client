<script setup lang="ts">
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { ViewUpdate } from "@codemirror/view";
import { computed, reactive, ref, watch } from "vue";
import { Codemirror } from "vue-codemirror";
import { oneDark as shadCn } from "../lib/codemirror";
import { languages } from "../lib/languages";

const problem = {
  name: "Problem 1",
  author: "Shadcn",
  categories: ["Array", "String"],
  description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
  tincidunt, nisl quis aliquam lacinia, nunc nulla aliquet ipsum, vitae
  aliquam nunc nisl quis nunc. Nulla facilisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed incidunt, nisl quis aliquam lacinia, nunc nulla aliquet ipsum, vitae.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
  tincidunt, nisl quis aliquam lacinia, nunc nulla aliquet ipsum, vitae
  aliquam nunc nisl quis nunc. Nulla facilisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed incidunt, nisl quis aliquam lacinia, nunc nulla aliquet ipsum, vitae.
 
  `,
  difficulty: "Easy",
  problemset: "LeetCode",
  exampleInput: "1,2,3,4,5",
  exampleOutput: "1,2,3,4,5",
};

// changes based on selected language
const language = ref("C++");
const code = ref(languages[language.value].code);
const state = reactive({
  lines: null as null | number,
  cursor: null as null | number,
  selected: null as null | number,
  length: null as null | number,
});

watch(language, (lang) => {
  code.value = languages[lang].code;
});

const extensions = computed(() => {
  const lang = languages[language.value];
  // TODO: base extension pack (line wrap, etc...)
  const newExtensions = [shadCn];
  newExtensions.push(lang.extension() as any);
  return newExtensions;
});

const handleStateUpdate = (viewUpdate: ViewUpdate) => {
  // selected
  const ranges = viewUpdate.state.selection.ranges;
  state.selected = ranges.reduce(
    (plus, range) => plus + range.to - range.from,
    0,
  );
  state.cursor = ranges[0].anchor;
  // length
  state.length = viewUpdate.state.doc.length;
  state.lines = viewUpdate.state.doc.lines;
  // log('viewUpdate', viewUpdate)
};

const submit = (_e: Event) => {
  console.log(code.value, languages[language.value].id);
};
</script>

<template>
  <!-- Main wrapper -->
  <div
    class="grid h-full w-full grid-cols-1 place-items-start gap-4 overflow-hidden md:grid-cols-8"
  >
    <!-- Problem  -->
    <div class="w-full p-4 md:col-span-3 md:h-[85vh] md:pr-0">
      <Card class="max-h-full w-full justify-between overflow-y-scroll">
        <CardHeader class="gap-2 py-4">
          <CardTitle class="text-2xl font-bold">{{ problem.name }}</CardTitle>
          <CardDescription class="px-2 text-sm">
            <span class="font-semibold">Author: </span>
            <!-- TODO: link to profile -->
            <span class="font-semibold text-primary">{{ problem.author }}</span>
          </CardDescription>
          <CardDescription class="px-2 text-sm">
            <span class="font-semibold">Problemset: </span>
            <span class="text-sm text-foreground/80 underline">
              {{ problem.problemset }}
            </span>
          </CardDescription>
          <CardDescription class="px-2 text-sm">
            <span class="font-semibold">Categories: </span>
            <span
              v-for="category in problem.categories"
              :key="category"
              class="mr-2 rounded-full bg-gray-200 px-3 py-1 text-xs font-semibold text-gray-800"
            >
              {{ category }}
            </span>
          </CardDescription>
          <CardDescription class="px-2 text-sm">
            <span class="font-semibold">Difficulty: </span>
            <span
              class="rounded-full px-3 py-1 text-xs font-semibold"
              :class="{
                'bg-green-500 text-green-50': problem.difficulty === 'Easy',
                'bg-yellow-500 text-yellow-50': problem.difficulty === 'Medium',
                'bg-red-500 text-red-50': problem.difficulty === 'Hard',
              }"
              >{{ problem.difficulty }}</span
            >
          </CardDescription>
        </CardHeader>
        <CardContent class="px-4 pb-2 pt-0">
          <div class="mb-4">
            <h2 class="break-words pb-2 text-lg underline">Description:</h2>
            <div class="px-2 text-foreground/80">
              <div class="overflow-hidden">
                {{ problem.description }}
              </div>
            </div>
          </div>
          <div class="text-muted-foreground">
            <h2 class="pb-2 text-lg text-foreground underline">Example:</h2>
            <p class="px-2">Input: {{ problem.exampleInput }}</p>
            <p class="px-2">Output: {{ problem.exampleOutput }}</p>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Code editor -->
    <div
      class="h-full w-full flex-col overflow-hidden px-4 py-4 md:col-span-5 md:flex md:pl-0"
    >
      <Card class="h-full w-full pb-1">
        <CardHeader class="px-4 py-0">
          <div class="flex items-center justify-between rounded-t-md py-1">
            <div class="flex items-center gap-2 text-sm">
              <span class="font-semibold">Language: </span>
              <Select v-model="language">
                <SelectTrigger
                  style="box-shadow: none !important"
                  class="h-8 w-36 bg-transparent focus:ring-0 focus:ring-transparent"
                >
                  <SelectValue
                    class="text-sm"
                    :class="languages[language].color"
                    v-model="language"
                  />
                </SelectTrigger>
                <SelectContent class="bg-card">
                  <ScrollArea class="h-52">
                    <SelectItem
                      v-for="lang in Object.keys(languages)"
                      :value="lang"
                      :key="lang"
                      :class="languages[lang].color"
                    >
                      {{ lang }}
                    </SelectItem>
                  </ScrollArea>
                </SelectContent>
              </Select>
            </div>
            <Button size="sm" class="h-8" @click="submit" variant="default">
              Submit
            </Button>
          </div>
        </CardHeader>
        <CardContent class="h-full min-h-96 overflow-hidden px-2 pb-0">
          <Codemirror
            @update="handleStateUpdate"
            :autofocus="true"
            style="
              height: calc(79vh - 4.5rem);
              overflow-y: hidden;
              outline: none !important;
              border-radius: 4px 4px 0 0;
              border-color: #a2a2a2/20;
              border-width: 1px;
            "
            :extensions="extensions"
            v-model="code"
          />
          <!-- Editor stats -->
          <div
            class="mb-2 flex items-center justify-between gap-2 rounded-b-md border-x-[1px] border-b-[1px] border-[#a2a2a2] border-opacity-10 px-4 text-xs text-[#a2a2a2] text-opacity-90"
          >
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger as-child>
                  <div
                    class="w-30 overflow-hidden text-ellipsis whitespace-nowrap p-1"
                  >
                    {{ languages[language].name }}
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <div class="rounded-md bg-card p-2 text-sm">
                    {{ languages[language].name }}
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <div class="flex items-center justify-end gap-3">
              <div class="flex p-1">
                <span class="font-semibold">Spaces: </span>
                <!-- this should probably be an input but hey it works -->
                <span class="">2</span>
              </div>
              <div class="flex p-1">
                <span class="font-semibold">Length: </span>
                <!-- this should probably be an input but hey it works -->
                <span class="">{{ state.length }}</span>
              </div>
              <div class="flex">
                <span class="font-semibold">Lines: </span>
                <span class="">{{ state.lines }}</span>
              </div>
              <div class="flex p-1">
                <span class="font-semibold">Cursor: </span>
                <span class="">{{ state.cursor }}</span>
              </div>
              <div class="flex">
                <span class="font-semibold">Selected: </span>
                <span class="">{{ state.selected }}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
