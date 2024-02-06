<script setup lang="ts">
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Pagination,
  PaginationFirst,
  PaginationLast,
  PaginationList,
  PaginationListItem,
  PaginationNext,
  PaginationPrev,
} from "@/components/ui/pagination";

import { getCategories } from "@/service/categoriesService";
import { getProblems } from "@/service/problemService";
import { CategoriesResponse } from "@/types/category";
import { ProblemResponse } from "@/types/problem";
import { onMounted, ref } from "vue";

const problems = ref<ProblemResponse[]>([]);
const categories = ref<CategoriesResponse[]>([]);
const filteredProblems = ref<ProblemResponse[]>([]);

const searchQuery = ref<string>("");
const difficultyQuery = ref<string>("any");
const statusQuery = ref<string>("any");
const selectedCategories = ref<number[]>([]);
const pageSize = 9;
const currentPage = ref<number>(1);
const totalPages = ref<number>(1);

function filter() {
  filteredProblems.value = problems.value.filter((problem) => {
    const isNameMatch =
      problem.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      problem.description
        .toLowerCase()
        .includes(searchQuery.value.toLowerCase());
    const isDifficultyMatch =
      difficultyQuery.value === "any" ||
      problem.difficulty.toLowerCase() === difficultyQuery.value;
    const isStatusMatch =
      statusQuery.value === "any" ||
      (statusQuery.value === "solved" && problem.isSolved) ||
      (statusQuery.value === "unsolved" && !problem.isSolved);
    const isCategoryMatch =
      selectedCategories.value.length === 0 ||
      selectedCategories.value.every((categoryId) =>
        problem.categories.some((category) => category.id === categoryId),
      );

    return isNameMatch && isDifficultyMatch && isStatusMatch && isCategoryMatch;
  });

  totalPages.value = Math.ceil(filteredProblems.value.length / pageSize);
  currentPage.value = 1;
}

function resetFilters() {
  searchQuery.value = "";
  difficultyQuery.value = "any";
  statusQuery.value = "any";
  selectedCategories.value = [];
}

function selectOrDeselectCategory(id: number) {
  if (selectedCategories.value.includes(id)) {
    selectedCategories.value = selectedCategories.value.filter(
      (categoryId) => categoryId !== id,
    );
  } else {
    selectedCategories.value = [...selectedCategories.value, id];
  }
}

onMounted(async () => {
  categories.value = await getCategories();
  problems.value = await getProblems();
  filteredProblems.value = problems.value;
  totalPages.value = Math.ceil(filteredProblems.value.length / pageSize);
});
</script>

<template>
  <div
    class="flex flex-1 grid-cols-1 flex-col gap-5 p-5 md:grid md:grid-cols-7"
  >
    <div class="flex justify-between md:col-span-7">
      <h1 class="text-3xl font-bold">Problems</h1>
      <div class="items center flex gap-2">
        <Button class="ml-auto" variant="outline">My problems</Button>
        <Button class="ml-auto" variant="default">Add Problem</Button>
      </div>
    </div>

    <!-- Filters section -->
    <section class="flex flex-col gap-5 md:col-span-2">
      <Card>
        <CardHeader class="items-center gap-3">
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent class="flex flex-col gap-2">
          <div class="flex flex-col gap-2">
            <Label class="underline">Name</Label>
            <Input v-model="searchQuery" placeholder="Search by name" />
          </div>
          <div class="flex flex-col gap-2">
            <Label class="underline">Categories</Label>
            <div class="flex flex-wrap gap-2">
              <Badge
                v-for="category in categories"
                :key="category.id"
                :variant="
                  selectedCategories.includes(category.id)
                    ? 'default'
                    : 'outline'
                "
                @click="selectOrDeselectCategory(category.id)"
              >
                {{ category.categoryName }}
              </Badge>
            </div>
          </div>
          <div class="flex flex-col gap-2">
            <Label class="underline">Difficulty</Label>
            <Select default-value="any" v-model="difficultyQuery">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any</SelectItem>
                <SelectItem class="text-ye" value="easy">Easy</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="hard">Hard</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div class="flex flex-col gap-2">
            <Label class="underline">Status</Label>
            <Select default-value="any" v-model="statusQuery">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any</SelectItem>
                <SelectItem value="solved">Solved</SelectItem>
                <SelectItem value="unsolved">Unsolved</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter class="flex flex-col gap-4">
          <Button @click="filter" variant="default" class="w-full">
            Apply
          </Button>
          <Button variant="destructive" class="w-full" @click="resetFilters">
            Reset
          </Button>
        </CardFooter>
      </Card>
    </section>

    <!-- Problem card grid section -->
    <section class="grid grid-cols-1 gap-4 md:col-span-5 md:grid-cols-3">
      <div class="col-span-3 flex flex-wrap justify-evenly gap-4">
        <!-- No problems D: -->
        <div
          v-if="filteredProblems.length === 0"
          class="flex h-full items-center text-center"
        >
          No problems found
        </div>

        <!-- Problems grid -->
        <Card
          v-else
          class="flex h-80 w-60 flex-col justify-between overflow-hidden"
          v-for="problem in [
            ...filteredProblems.slice(
              (currentPage - 1) * pageSize,
              currentPage * pageSize,
            ),
          ]"
          :key="problem.id"
        >
          <CardHeader class="items-center">
            <CardTitle>{{ problem.name }}</CardTitle>
          </CardHeader>
          <CardContent class="flex flex-col justify-between gap-2 pb-2">
            <div class="flex items-center gap-3">
              <Label class="text-foreground/70">Status:</Label>
              <Badge
                variant="default"
                :class="[
                  Math.random() > 0.5 ? '' : 'bg-red-500 hover:bg-red-500/80',
                ]"
                class="mr-2"
              >
                {{ Math.random() > 0.5 ? "Solved" : "Unsolved" }}
              </Badge>
            </div>
            <div class="flex items-center gap-3">
              <Label class="text-foreground/70">Categories:</Label>
              <div class="flex flex-wrap">
                <Badge
                  v-for="category in problem.categories.slice(
                    0,
                    problem.categories.length <= 3 ? 3 : 2,
                  )"
                  :key="category.id"
                  variant="outline"
                  class="mr-2 line-clamp-1 text-ellipsis text-xs"
                >
                  {{ category.categoryName }}</Badge
                >
                <Badge
                  v-if="problem.categories.length > 3"
                  variant="outline"
                  class="mr-2 line-clamp-1 text-ellipsis text-xs"
                >
                  +{{ problem.categories.length - 2 }} more
                </Badge>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <Label class="text-foreground/70">Difficulty:</Label>
              <Badge class="mr-2 capitalize">
                {{ problem.difficulty.toLowerCase() }}
              </Badge>
            </div>
            <p class="line-clamp-2 min-w-0 text-foreground/70">
              {{ problem.description }}
            </p>
          </CardContent>
          <CardFooter class="flex items-center justify-between">
            <Button variant="default" class="w-full" as-child>
              <router-link :to="'/problems/' + problem.id">View</router-link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <!-- PAGINATION -->
      <Pagination
        v-if="filteredProblems.length > 0"
        class="col-span-3 mb-0"
        :total="totalPages"
        :sibling-count="1"
        show-edges
        :default-page="currentPage"
      >
        <PaginationList
          slot="list"
          class="flex items-center justify-center gap-1"
        >
          <PaginationFirst
            @click="currentPage = 1"
            :disabled="currentPage === 1"
          />
          <PaginationPrev
            @click="currentPage = currentPage - 1"
            :disabled="currentPage === 1"
          />

          <template
            v-for="item in Array.from({
              length: totalPages,
            }).map((_, index) => index + 1)"
          >
            <PaginationListItem :value="item" as-child>
              <Button
                class="h-10 w-10 p-0"
                :variant="currentPage === item ? 'default' : 'outline'"
                @click="currentPage = item"
              >
                {{ item }}
              </Button>
            </PaginationListItem>
          </template>

          <PaginationNext
            @click="currentPage = currentPage + 1"
            :disabled="currentPage === totalPages"
          />
          <PaginationLast
            @click="currentPage = totalPages"
            :disabled="currentPage === totalPages"
          />
        </PaginationList>
      </Pagination>
    </section>
  </div>
</template>
