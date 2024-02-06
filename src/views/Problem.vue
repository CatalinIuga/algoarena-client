<script setup lang="ts">
import { Badge } from "@/components/ui/badge";
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

import { getProblem } from "@/service/problemService";
import { ProblemResponse } from "@/types/problem";
import { ViewUpdate } from "@codemirror/view";
import { computed, onMounted, reactive, ref, watch } from "vue";
import { Codemirror } from "vue-codemirror";
import { useRouter } from "vue-router";
import { oneDark as shadCn } from "../lib/codemirror";
import { languages } from "../lib/languages";

const router = useRouter();

const problem = ref<ProblemResponse>();
const id = router.currentRoute.value.params.id;

onMounted(async () => {
  problem.value = await getProblem(id as string);
  console.log(problem.value);

  if (!problem.value) {
    router.push("/problems");
  }
});
const status = ref("Solved");

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
  const ranges = viewUpdate.state.selection.ranges;
  state.selected = ranges.reduce(
    (plus, range) => plus + range.to - range.from,
    0,
  );
  state.cursor = ranges[0].anchor;
  state.length = viewUpdate.state.doc.length;
  state.lines = viewUpdate.state.doc.lines;
};

const submit = (_e: Event) => {
  console.log(code.value, languages[language.value].id);
};
</script>

<template>
  <!-- Main wrapper -->
  <div
    v-if="problem !== undefined"
    class="grid h-full w-full grid-cols-1 place-items-start gap-4 overflow-hidden md:grid-cols-8"
  >
    <!-- Problem  -->
    <div class="w-full p-4 md:col-span-3 md:h-[85vh] md:pr-0">
      <Card class="max-h-full w-full justify-between overflow-y-scroll">
        <CardHeader class="gap-2 py-4">
          <CardTitle class="text-2xl font-bold">{{ problem.name }}</CardTitle>
          <CardDescription class="px-2 text-sm">
            <span class="font-semibold">Author: </span>
            <span class="font-semibold text-primary underline">
              <router-link :to="'/users/' + problem.author.id">
                {{ problem.author.username }}
              </router-link>
            </span>
          </CardDescription>
          <CardDescription class="px-2 text-sm">
            <span class="font-semibold">Status: </span>
            <span
              class="rounded-full px-3 py-1 text-xs font-semibold capitalize text-foreground"
              :class="status === 'Solved' ? 'bg-green-500' : 'bg-red-500'"
            >
              {{ status.toLowerCase() }}</span
            >
          </CardDescription>
          <CardDescription class="flex gap-3 px-2 text-sm">
            <span class="font-semibold">Categories: </span>
            <span class="flex flex-wrap items-center justify-center gap-1">
              <Badge
                v-for="category in problem.categories"
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
                problem.difficulty === 'EASY'
                  ? 'bg-green-500'
                  : problem.difficulty === 'MEDIUM'
                    ? 'bg-orange-500'
                    : 'bg-red-500'
              "
              >{{ problem.difficulty.toLowerCase() }}</span
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
            <p class="px-2">Input: bing</p>
            <p class="px-2">Output: bong</p>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Code editor -->
    <div
      class="h-full w-full flex-col overflow-hidden px-4 py-4 md:col-span-5 md:flex md:pl-0"
    >
      <Card class="h-full w-full pb-1">
        <CardHeader class="px-4 py-1">
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
              height: calc(79vh - 5rem);
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
