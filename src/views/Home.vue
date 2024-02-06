<script setup lang="ts">
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const abouts = [
  {
    title: "What is AlgoArena?",
    content:
      "AlgoArena is a platform for practicing coding skills. It is a community-driven platform, where you can solve problems from different categories.",
  },
  {
    title: "How to use AlgoArena?",
    content:
      "You can use AlgoArena to practice your coding skills and improve your problem-solving abilities. Great way to prepare for coding interviews and competitive programming contests. ",
  },
  {
    title: "What tech stack does AlgoArena use?",
    content:
      "AlgoArena is built using Vue3, TailwindCSS, and TypeScript. The backend is built using Spring Boot and MySQL. Problem solutions are tested using Judge0.",
  },
];
</script>

<template>
  <!-- HOME WRAPPER -->
  <div>
    <section id="about" class="container flex flex-1 items-center px-8">
      <!-- HERO -->
      <article
        class="mx-auto grid max-w-screen-xl px-4 py-8 lg:grid-cols-12 lg:gap-0 lg:py-16"
      >
        <!-- HERO TEXT -->
        <div class="mr-auto place-self-center lg:col-span-7">
          <h1
            class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl"
          >
            Elevate your coding skills with
            <span class="text-primary">AlgoArena</span>
          </h1>
          <p class="mt-4 text-lg text-foreground/80">
            AlgoArena is a platform for practicing coding skills. It is a
            community-driven platform, where you can solve problems from
            different categories.
          </p>
          <!-- HERO ACTIONS -->
          <div class="mt-8 flex w-full justify-center space-x-10">
            <Button as-child>
              <router-link to="/signup">Get Started</router-link>
            </Button>
            <Button variant="secondary" as-child>
              <router-link to="/problems">View Problems</router-link>
            </Button>
          </div>
        </div>

        <!-- HERO IMAGE -->
        <div class="hidden lg:col-span-5 lg:mt-0 lg:flex">
          <img
            class="h-auto w-full max-w-lg"
            src="/hero.svg"
            alt="Code thinking"
          />
        </div>
      </article>
    </section>

    <!-- PROBLEMS -->
    <section class="container flex-1 px-8">
      <h2 class="px-4 py-5 text-3xl font-extrabold">Featured Problems</h2>
      <!-- FEATURED PROBLEMS -->
      <article class="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        <Card v-for="i in 9" :key="i">
          <CardHeader>
            <CardTitle>Problem {{ i }}</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
              voluptatum, quibusdam, voluptates, quia voluptate quod quos
            </CardDescription>
          </CardContent>
          <CardFooter>
            <Button as-child>
              <router-link :to="'/problems/' + i">View</router-link>
            </Button>
          </CardFooter>
        </Card>
      </article>
    </section>

    <!-- LEARN MORE SECTION -->
    <section
      id="about"
      class="container mt-10 flex flex-col gap-4 px-8 py-5 lg:flex-row"
    >
      <!-- ABOUT ALGOARENA -->
      <article class="w-full p-2 lg:w-1/2">
        <Button
          variant="outline"
          class="text-xl font-extrabold text-primary hover:cursor-default"
        >
          About us:
        </Button>
        <Accordion type="single" collapsible class="w-full">
          <AccordionItem
            v-for="item in abouts"
            :key="item.title"
            :value="item.content"
          >
            <AccordionTrigger>
              {{ item.title }}
            </AccordionTrigger>
            <AccordionContent>
              {{ item.content }}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </article>

      <!-- PROFESOR USAGE PART -->
      <Card class="m-4 h-fit bg-transparent lg:w-1/2">
        <CardHeader>
          <CardTitle>Profesor Usage</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>
            If you are a professor, you can create your own problem sets and ask
            your students to solve them. The platform will check the solutions
            and give students the results.
          </CardDescription>
        </CardContent>
        <CardFooter class="flex items-center justify-center gap-10">
          <!-- PROBLEMS -->
          <Button variant="secondary" as-child>
            <router-link to="/problems"> View Problems </router-link>
          </Button>
          <!-- CREATE ACCOUNT -->
          <Button variant="default" as-child>
            <router-link to="/signup">Create Account</router-link>
          </Button>
        </CardFooter>
      </Card>
    </section>
  </div>
</template>
