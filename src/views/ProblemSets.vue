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
import { Input } from "@/components/ui/input";
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
import { Search } from "lucide-vue-next";

import { ref } from "vue";
// On mount fetch problem sets
const search = ref("");
const sets = ref([
  {
    id: 1,
    title: "Problem Set 1",
    description: "This is the first problem set",
  },
  {
    id: 2,
    title: "Problem Set 2",
    description:
      "This is the second problem set HAHAHAH AAHAdsdas WTF BROOOOOOOOOOOOOOO THIS IS CRAZYYYYYYYYYYYYYY",
  },
  {
    id: 3,
    title: "Problem Set 3",
    description: "This is the third problem set",
  },
  {
    id: 4,
    title: "Problem Set 4",
    description: "This is the fourth problem set",
  },
  {
    id: 5,
    title: "Problem Set 5",
    description: "This is the fifth problem set",
  },
  {
    id: 6,
    title: "Problem Set 6",
    description: "This is the sixth problem set",
  },
  {
    id: 7,
    title: "Problem Set 7",
    description: "This is the seventh problem set",
  },
  {
    id: 8,
    title: "Problem Set 8",
    description: "This is the eighth problem set",
  },
  {
    id: 9,
    title: "Problem Set 9",
    description: "This is the ninth problem set",
  },
]);
</script>

<template>
  <div class="flex flex-col justify-center gap-5 flex-1 p-5">
    <!-- Search section -->
    <div class="flex flex-col md:flex-row gap-5 items-center justify-between">
      <h1 class="text-2xl font-bold">Problem Sets</h1>
      <div class="flex items-center">
        <Search
          class="relative text-foreground/70 left-7 top-3 transform -translate-y-1/2"
        />
        <Input
          type="search"
          class="max-w-sm pl-8"
          placeholder="Search sets"
          v-model="search"
        />
      </div>
    </div>

    <!-- Problem sets -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
      <Card
        v-for="set in sets"
        :key="set.id"
        class="h-full flex flex-col justify-between w-full"
      >
        <CardHeader>
          <CardTitle>{{ set.title }}</CardTitle>
        </CardHeader>
        <CardContent class="flex flex-col justify-between">
          <CardDescription>{{ set.description }}</CardDescription>
        </CardContent>
        <CardFooter class="flex justify-center">
          <Button variant="default" as-child>
            <router-link :to="`/problemsets/${set.id}`">
              View Problems
            </router-link>
          </Button>
        </CardFooter>
      </Card>
    </div>

    <!-- PAGINATION -->
    <Pagination
      v-slot="{ page }"
      :total="100"
      :sibling-count="1"
      show-edges
      :default-page="2"
    >
      <PaginationList
        v-slot="{ items }"
        class="flex justify-center items-center gap-1"
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
              class="w-10 h-10 p-0"
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
  </div>
</template>
