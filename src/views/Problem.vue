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
import { ChevronDownIcon } from "lucide-vue-next";

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
  const newExtensions = [shadCn];
  newExtensions.push(lang.extension() as any);
  return newExtensions;
});

const submit = (_e: Event) => {
  console.log(code.value, languages[language.value].id);
};
</script>

<template>
  <!-- Main wrapper -->
  <div
    class="grid min-h-full min-w-full grid-cols-1 place-items-center gap-4 overflow-hidden md:grid-cols-8"
  >
    <!-- Problem  -->
    <div class="h-full w-full p-4 md:col-span-3 md:pr-0">
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
      class="h-full w-full flex-col overflow-hidden px-4 py-4 md:col-span-5 md:flex md:pl-0"
    >
      <Card class="h-full w-full">
        <CardHeader class="p-2">
          <div
            class="flex items-center justify-between rounded-t-md border-b-[1px] border-[#a2a2a2] border-opacity-20 py-1"
          >
            <DropdownMenu>
              <DropdownMenuTrigger
                class="grid grid-cols-2 items-center justify-between gap-4"
              >
                <Button size="sm" class="w-36 justify-between" variant="ghost">
                  <span
                    class="text-sm font-extrabold"
                    :class="languages[language].color"
                  >
                    {{ language }}
                  </span>
                  <ChevronDownIcon class="ml-2 size-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  v-for="lang in Object.keys(languages)"
                  :value="lang"
                  :key="lang"
                  :class="languages[lang].color"
                  @click="language = lang"
                >
                  {{ lang }}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button size="sm" @click="submit" variant="default">
              Submit
            </Button>
          </div>
        </CardHeader>
        <CardContent class="px-2 pb-0">
          <Codemirror
            :autofocus="true"
            style="
              height: calc(100vh - 56px - 64px - 91px);
              overflow-y: hidden;
              outline: none !important;
            "
            :extensions="extensions"
            v-model="code"
          />
          <!-- Editor stats -->
          <div
            class="mb-1 flex items-center justify-end gap-2 border-t-[1px] border-[#a2a2a2] border-opacity-20 text-xs text-[#a2a2a2] text-opacity-80"
          >
            <div class="flex p-1">
              <span class="font-semibold">Spaces: </span>
              <span class="">2</span>
            </div>
            <div class="flex">
              <span class="font-semibold">Lines: </span>
              <!-- this should probably be an input but hey it works -->
              <span class="">{{ code.split("\n").length }}</span>
            </div>
            <div class="flex">
              <span class="font-semibold">Characters: </span>
              <span class="">{{ code.length }}</span>
            </div>
            <!-- Cursor position -->
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
