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
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Pagination,
  PaginationEllipsis,
  PaginationFirst,
  PaginationLast,
  PaginationList,
  PaginationListItem,
  PaginationNext,
  PaginationPrev,
} from "@/components/ui/pagination";

import { useRouter } from "vue-router";
const router = useRouter();
// @ts-expect-error
const id = router.currentRoute.value.params.id;

const dummy_problems = [
  {
    id: 1,
    name: "Problem 1",
    category: "array",
    difficulty: "easy",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    status: "solved",
  },
  {
    id: 2,
    name: "Problem 2",
    category: "array",
    difficulty: "medium",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    status: "unsolved",
  },
  {
    id: 3,
    name: "Problem 3",
    category: "array",
    difficulty: "hard",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    status: "unsolved",
  },
  {
    id: 4,
    name: "Problem 4",
    category: "array",
    difficulty: "easy",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    status: "solved",
  },
  {
    id: 5,
    name: "Problem 5",
    category: "array",
    difficulty: "medium",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    status: "unsolved",
  },
  {
    id: 6,
    name: "Problem 6",
    category: "array",
    difficulty: "hard",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    status: "unsolved",
  },
  {
    id: 7,
    name: "Problem 7",
    category: "array",
    difficulty: "easy",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    status: "solved",
  },
  {
    id: 8,
    name: "Problem 8",
    category: "array",
    difficulty: "medium",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    status: "unsolved",
  },
  {
    id: 9,
    name: "Problem 9",
    category: "array",
    difficulty: "hard",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    status: "unsolved",
  },
  {
    id: 10,
    name: "Problem 10",
    category: "array",
    difficulty: "easy",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    status: "solved",
  },
];
</script>

<template>
  <div class="flex flex-1 grid-cols-7 flex-col gap-5 p-5 md:grid">
    <!-- Filters section -->
    <!-- name, dificulty, status, category -->
    <section class="col-span-2 flex flex-col gap-2">
      <Card>
        <CardHeader class="items-center gap-3">
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent class="flex flex-col gap-2">
          <div class="flex flex-col gap-2">
            <Label>Name</Label>
            <Input placeholder="Search by name" />
          </div>
          <div class="flex flex-col gap-2">
            <Label>Category</Label>
            <Select default-value="any">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any</SelectItem>
                <SelectGroup class="max-h-60 overflow-y-auto">
                  <SelectItem value="array">Array</SelectItem>
                  <SelectItem value="linked-list">Linked List</SelectItem>
                  <SelectItem value="stack">Stack</SelectItem>
                  <SelectItem value="queue">Queue</SelectItem>
                  <SelectItem value="tree">Tree</SelectItem>
                  <SelectItem value="graph">Graph</SelectItem>
                  <SelectItem value="heap">Heap</SelectItem>
                  <SelectItem value="hash-table">Hash Table</SelectItem>
                  <SelectItem value="trie">Trie</SelectItem>
                  <SelectItem value="matrix">Matrix</SelectItem>
                  <SelectItem value="string">String</SelectItem>
                  <SelectItem value="binary-search">Binary Search</SelectItem>
                  <SelectItem value="recursion">Recursion</SelectItem>
                  <SelectItem value="greedy">Greedy</SelectItem>
                  <SelectItem value="dynamic-programming">
                    Dynamic Programming
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div class="flex flex-col gap-2">
            <Label>Difficulty</Label>
            <Select default-value="any">
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
            <Label>Status</Label>
            <Select default-value="any">
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
          <Button variant="default" class="w-full">Apply</Button>
          <Button variant="destructive" class="w-full">Reset</Button>
        </CardFooter>
      </Card>
    </section>

    <!-- Problem card grid section -->
    <section class="col-span-5 grid grid-cols-3 gap-4">
      <Card v-for="problem in dummy_problems.slice(0, 9)" :key="problem.id">
        <CardHeader class="items-center">
          <CardTitle>{{ problem.name }}</CardTitle>
        </CardHeader>
        <CardContent>
          <div class="flex">
            <Badge
              variant="default"
              :class="[
                problem.status === 'solved'
                  ? ''
                  : 'bg-red-500 hover:bg-red-500/80',
              ]"
              class="mr-2"
              >{{ problem.status }}</Badge
            >
            <Badge variant="outline" class="mr-2">{{ problem.category }}</Badge>
            <Badge variant="secondary">{{ problem.difficulty }}</Badge>
          </div>
          <p class="min-w-0 text-ellipsis text-foreground/70">
            {{ problem.description.slice(0, 50) }}
          </p>
        </CardContent>
        <CardFooter class="flex justify-end">
          <Button variant="default" as-child>
            <router-link
              :to="$router.currentRoute.value.path + '/problem/' + problem.id"
            >
              View
            </router-link>
          </Button>
        </CardFooter>
      </Card>

      <!-- PAGINATION -->
      <Pagination
        class="col-span-3"
        v-slot="{ page }"
        :total="100"
        :sibling-count="1"
        show-edges
        :default-page="2"
      >
        <PaginationList
          v-slot="{ items }"
          class="flex items-center justify-center gap-1"
        >
          <PaginationFirst />
          <PaginationPrev />

          <template v-for="(item, index) in items">
            <PaginationListItem
              v-if="item.type === 'page'"
              :key="index"
              :value="item.value"
              as-child
            >
              <Button
                class="h-10 w-10 p-0"
                :variant="item.value === page ? 'default' : 'outline'"
              >
                {{ item.value }}
              </Button>
            </PaginationListItem>
            <PaginationEllipsis v-else :key="item.type" :index="index" />
          </template>

          <PaginationNext />
          <PaginationLast />
        </PaginationList>
      </Pagination>
    </section>
  </div>
</template>
