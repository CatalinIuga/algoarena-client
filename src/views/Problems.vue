<script setup lang="ts">
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Pagination,
  PaginationFirst,
  PaginationLast,
  PaginationList,
  PaginationListItem,
  PaginationNext,
  PaginationPrev,
} from "@/components/ui/pagination";
import { PencilIcon, XIcon } from "lucide-vue-next";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/toast/use-toast";

import { getCategories } from "@/service/categoriesService";
import {
  createProblem,
  deleteProblemById,
  getProblemById,
  getProblems,
  updateProblemById,
} from "@/service/problemService";
import { getSubmissions } from "@/service/submissionService";
import { authStore } from "@/store";
import { CategoriesResponse } from "@/types/category";
import { ProblemResponse } from "@/types/problem";
import { SubmissionResponse } from "@/types/submission";
import { onMounted, reactive, ref } from "vue";

const store = authStore();
const { token, userId } = store;
const { toast } = useToast();

const problems = ref<ProblemResponse[]>([]);
const submissions = ref<SubmissionResponse[]>([]);
const categories = ref<CategoriesResponse[]>([]);
const filteredProblems = ref<ProblemResponse[]>([]);

const ownProblems = ref<boolean>(false);
const searchQuery = ref<string>("");
const difficultyQuery = ref<string>("any");
const statusQuery = ref<string>("any");
const selectedCategories = ref<number[]>([]);
const pageSize = 9;
const currentPage = ref<number>(1);
const totalPages = ref<number>(1);

function filter() {
  filteredProblems.value = problems.value.filter((problem) => {
    const isOwnProblemMatch =
      !ownProblems.value || problem.author.id === store.userId;
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
      (statusQuery.value === "solved" && getStatus(problem.id) === "Solved") ||
      (statusQuery.value === "unsolved" &&
        getStatus(problem.id) === "Unsolved");
    const isCategoryMatch =
      selectedCategories.value.length === 0 ||
      selectedCategories.value.every((categoryId) =>
        problem.categories.some((category) => category.id === categoryId),
      );

    return (
      isOwnProblemMatch &&
      isNameMatch &&
      isDifficultyMatch &&
      isStatusMatch &&
      isCategoryMatch
    );
  });

  totalPages.value = Math.ceil(filteredProblems.value.length / pageSize);
  currentPage.value = 1;
}

function resetFilters() {
  searchQuery.value = "";
  difficultyQuery.value = "any";
  statusQuery.value = "any";
  selectedCategories.value = [];
  ownProblems.value = false;
  filter();
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

const newProblem = reactive({
  name: "",
  authorId: store.userId!,
  description: "",
  difficulty: "EASY" as "EASY" | "MEDIUM" | "HARD",
  categoriesIds: [] as number[],
  exampleInput: "",
  exampleOutput: "",
  input: "",
  output: "",
});
const successNewProblem = ref("");
const errorNewProblem = ref("");

function addOrRemoveNewCategory(id: number) {
  if (newProblem.categoriesIds.includes(id)) {
    newProblem.categoriesIds = newProblem.categoriesIds.filter(
      (categoryId) => categoryId !== id,
    );
  } else {
    newProblem.categoriesIds = [...newProblem.categoriesIds, id];
  }
}

async function createNewProblem() {
  try {
    successNewProblem.value = await createProblem(newProblem);
    toast({
      title: "Sucess",
      description: successNewProblem.value,
      variant: "default",
    });

    resetNewProblem();

    errorNewProblem.value = "";

    problems.value = await getProblems();
    filter();
  } catch (error: any) {
    toast({
      title: "Error",
      description: JSON.parse(error.message).message,
      variant: "destructive",
    });
  }
}

async function deleteProblem(id: number) {
  try {
    await deleteProblemById(id);
    toast({
      title: "Sucess",
      description: "Problem deleted",
      variant: "default",
    });

    problems.value = await getProblems();
    filter();
  } catch (error: any) {
    toast({
      title: "Error",
      description: JSON.parse(error.message).message,
      variant: "destructive",
    });
  }
}

async function getProblem(id: number) {
  try {
    const problem = await getProblemById(id);
    newProblem.name = problem.name;
    newProblem.description = problem.description;
    newProblem.difficulty = problem.difficulty;
    newProblem.categoriesIds = problem.categories.map(
      (category) => category.id,
    );
    newProblem.exampleInput = problem.exampleInput;
    newProblem.exampleOutput = problem.exampleOutput;
    newProblem.input = problem.input;
    newProblem.output = problem.output;
  } catch (error: any) {
    toast({
      title: "Error",
      description: JSON.parse(error.message).message,
      variant: "destructive",
    });
  }
}

async function updateProblem(
  id: number,
  {
    name,
    description,
    difficulty,
    categoriesIds,
    exampleInput,
    exampleOutput,
    input,
    output,
  }: {
    name: string;
    description: string;
    difficulty: "EASY" | "MEDIUM" | "HARD";
    categoriesIds: number[];
    exampleInput: string;
    exampleOutput: string;
    input: string;
    output: string;
  },
) {
  try {
    await updateProblemById(id, {
      id,
      name,
      description,
      difficulty,
      authorId: store.userId!,
      categoriesIds,
      exampleInput,
      exampleOutput,
      input,
      output,
    });
    toast({
      title: "Sucess",
      description: "Problem updated",
      variant: "default",
    });
    resetNewProblem();

    problems.value = await getProblems();
    filter();
  } catch (error: any) {
    toast({
      title: "Error",
      description: JSON.parse(error.message).message,
      variant: "destructive",
    });
  }
}

function resetNewProblem() {
  newProblem.name = "";
  newProblem.description = "";
  newProblem.difficulty = "EASY";
  newProblem.categoriesIds = [];
  newProblem.exampleInput = "";
  newProblem.exampleOutput = "";
  newProblem.input = "";
  newProblem.output = "";
}

function getStatus(problemId: number) {
  const submission = submissions.value.find(
    (submission) =>
      submission.problem.id === problemId && submission.status === "Accepted",
  );
  return submission ? "Solved" : "Unsolved";
}

onMounted(async () => {
  categories.value = await getCategories();
  problems.value = await getProblems();
  submissions.value = await getSubmissions(token, userId);
  filter();
});
</script>

<template>
  <div
    class="flex flex-1 grid-cols-1 flex-col gap-5 p-5 md:grid md:grid-cols-7"
  >
    <div class="flex justify-between md:col-span-7">
      <h1 class="text-3xl font-bold">Problems</h1>
      <!-- ADD PROBLEM -->
      <Dialog @update:open="resetNewProblem">
        <DialogTrigger as-child>
          <Button class="ml-auto" variant="default">Add Problem</Button>
        </DialogTrigger>
        <DialogContent class="max-h-[500px] overflow-y-auto sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add problem</DialogTitle>
            <DialogDescription>
              Fill the form to add a new problem
            </DialogDescription>
          </DialogHeader>
          <!-- PROBLEM FORM -->
          <div class="grid gap-4 py-4">
            <div class="grid grid-cols-4 items-center gap-4">
              <Label for="name" class="text-right">Name</Label>
              <Input
                id="name"
                v-model="newProblem.name"
                placeholder="Problem name"
                class="col-span-3"
              />
            </div>
            <div class="grid grid-cols-4 items-center gap-4">
              <Label for="description" class="text-right">Description</Label>
              <Textarea
                id="description"
                v-model="newProblem.description"
                placeholder="Problem description"
                class="col-span-3"
              />
            </div>
            <div class="grid grid-cols-4 items-center gap-4">
              <Label for="difficulty" class="text-right">Difficulty</Label>
              <Select id="difficulty" v-model="newProblem.difficulty">
                <SelectTrigger class="col-span-3">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="EASY">Easy</SelectItem>
                  <SelectItem value="MEDIUM">Medium</SelectItem>
                  <SelectItem value="HARD">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div class="grid grid-cols-4 items-center gap-4">
              <Label for="categories" class="text-right">Categories</Label>
              <div class="col-span-3 flex flex-wrap gap-1">
                <Badge
                  v-for="category in categories"
                  :key="category.id"
                  :variant="
                    newProblem.categoriesIds.includes(category.id)
                      ? 'default'
                      : 'outline'
                  "
                  @click="addOrRemoveNewCategory(category.id)"
                >
                  {{ category.categoryName }}
                </Badge>
              </div>
            </div>
            <div class="grid grid-cols-4 items-center gap-4">
              <Label for="exampleInput" class="text-right">Example Input</Label>
              <Textarea
                id="exampleInput"
                v-model="newProblem.exampleInput"
                placeholder="Example input"
                class="col-span-3"
              />
            </div>
            <div class="grid grid-cols-4 items-center gap-4">
              <Label for="exampleOutput" class="text-right"
                >Example Output</Label
              >
              <Textarea
                id="exampleOutput"
                v-model="newProblem.exampleOutput"
                placeholder="Example output"
                class="col-span-3"
              />
            </div>
            <div class="grid grid-cols-4 items-center gap-4">
              <Label for="input" class="text-right">Input</Label>
              <Textarea
                id="input"
                v-model="newProblem.input"
                placeholder="Input"
                class="col-span-3"
              />
            </div>
            <div class="grid grid-cols-4 items-center gap-4">
              <Label for="output" class="text-right">Output</Label>
              <Textarea
                id="output"
                v-model="newProblem.output"
                placeholder="Output"
                class="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button @click="createNewProblem" type="submit">
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
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
          <div class="flex items-center gap-4">
            <Label class="underline">My problems</Label>
            <input type="checkbox" class="size-4" v-model="ownProblems" />
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
          <CardHeader class="relative items-center">
            <CardTitle class="line-clamp-1 px-4">{{ problem.name }}</CardTitle>
            <!-- edit button -->
            <Dialog
              v-if="problem.author.id === store.userId"
              class="absolute right-12 top-4"
              @close="resetNewProblem"
            >
              <DialogTrigger
                @click="getProblem(problem.id)"
                class="absolute right-10 top-[19px]"
              >
                <PencilIcon
                  class="size-[15px] cursor-pointer stroke-2 text-primary"
                />
              </DialogTrigger>
              <DialogContent
                class="max-h-[500px] overflow-y-auto sm:max-w-[600px]"
              >
                <DialogHeader>
                  <DialogTitle>Edit problem</DialogTitle>
                  <DialogDescription>
                    Fill the form to edit the problem
                  </DialogDescription>
                </DialogHeader>
                <!-- PROBLEM FORM -->
                <div class="grid gap-4 py-4">
                  <div class="grid grid-cols-4 items-center gap-4">
                    <Label for="name" class="text-right">Name</Label>
                    <Input
                      id="name"
                      v-model="newProblem.name"
                      placeholder="Problem name"
                      class="col-span-3"
                    />
                  </div>
                  <div class="grid grid-cols-4 items-center gap-4">
                    <Label for="description" class="text-right"
                      >Description</Label
                    >
                    <Textarea
                      id="description"
                      v-model="newProblem.description"
                      placeholder="Problem description"
                      class="col-span-3"
                    />
                  </div>
                  <div class="grid grid-cols-4 items-center gap-4">
                    <Label for="difficulty" class="text-right"
                      >Difficulty</Label
                    >
                    <Select id="difficulty" v-model="newProblem.difficulty">
                      <SelectTrigger class="col-span-3">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="EASY">Easy</SelectItem>
                        <SelectItem value="MEDIUM">Medium</SelectItem>
                        <SelectItem value="HARD">Hard</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div class="grid grid-cols-4 items-center gap-4">
                    <Label for="categories" class="text-right"
                      >Categories</Label
                    >
                    <div class="col-span-3 flex flex-wrap gap-1">
                      <Badge
                        v-for="category in categories"
                        :key="category.id"
                        :variant="
                          newProblem.categoriesIds.includes(category.id)
                            ? 'default'
                            : 'outline'
                        "
                        @click="addOrRemoveNewCategory(category.id)"
                      >
                        {{ category.categoryName }}
                      </Badge>
                    </div>
                  </div>
                  <div class="grid grid-cols-4 items-center gap-4">
                    <Label for="exampleInput" class="text-right"
                      >Example Input</Label
                    >
                    <Textarea
                      id="exampleInput"
                      v-model="newProblem.exampleInput"
                      placeholder="Example input"
                      class="col-span-3"
                    />
                  </div>
                  <div class="grid grid-cols-4 items-center gap-4">
                    <Label for="exampleOutput" class="text-right"
                      >Example Output</Label
                    >
                    <Textarea
                      id="exampleOutput"
                      v-model="newProblem.exampleOutput"
                      placeholder="Example output"
                      class="col-span-3"
                    />
                  </div>
                  <div class="grid grid-cols-4 items-center gap-4">
                    <Label for="input" class="text-right">Input</Label>
                    <Textarea
                      id="input"
                      v-model="newProblem.input"
                      placeholder="Input"
                      class="col-span-3"
                    />
                  </div>
                  <div class="grid grid-cols-4 items-center gap-4">
                    <Label for="output" class="text-right">Output</Label>
                    <Textarea
                      id="output"
                      v-model="newProblem.output"
                      placeholder="Output"
                      class="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    @click="updateProblem(problem.id, newProblem)"
                    type="submit"
                  >
                    Save changes
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <!-- delete button -->
            <AlertDialog v-if="problem.author.id === store.userId">
              <AlertDialogTrigger class="absolute right-4 top-4">
                <XIcon class="size-5 cursor-pointer stroke-2 text-red-500" />
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    the problem.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction @click="deleteProblem(problem.id)">
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardHeader>
          <CardContent class="flex flex-col justify-between gap-2 pb-2">
            <div class="flex items-center gap-3">
              <Label class="text-foreground/70">Status:</Label>
              <Badge
                variant="default"
                :class="[
                  getStatus(problem.id) === 'Solved'
                    ? 'bg-green-500 hover:bg-green-500/80'
                    : 'bg-red-500 hover:bg-red-500/80',
                  ,
                ]"
                class="mr-2"
              >
                {{ getStatus(problem.id) }}
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
              <Badge
                class="mr-2 capitalize"
                :class="[
                  problem.difficulty.toLowerCase() === 'easy'
                    ? 'bg-green-500 hover:bg-green-500/80'
                    : problem.difficulty.toLowerCase() === 'medium'
                      ? 'bg-yellow-500 hover:bg-yellow-500/80'
                      : 'bg-red-500 hover:bg-red-500/80',
                  'hover:bg-green-500/80',
                ]"
              >
                {{ problem.difficulty.toLowerCase() }}
              </Badge>
            </div>
            <p class="line-clamp-2 min-w-0 text-foreground/70">
              {{ problem.description }}
            </p>
          </CardContent>
          <CardFooter class="flex items-center justify-between">
            <Button variant="default" class="w-full" as-child>
              <router-link :to="'/problems/' + problem.id"> Solve </router-link>
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
