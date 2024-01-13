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
      "AlgoArena is a platform for practicing coding skills. It is a community-driven platform, where you can solve problems from various problem sets and compete with other users.",
  },
  {
    title: "How to use AlgoArena?",
    content:
      "You can use AlgoArena as a student or as a professor. If you are a student, you can solve problems from various problem sets and compete with other users. If you are a professor, you can create your own problem sets and assign them to your students. Each problem will also have a leaderboard where you can see the progress of your students.",
  },
  {
    title: "What technologies were used to build AlgoArena?",
    content:
      "AlgoArena is built using Vue.js, TailwindCSS, and TypeScript. The backend is built using Spring Boot and MySQL. Solutions are tested using Judge0.",
  },
];
</script>

<template>
  <!-- HOME WRAPPER -->
  <div>
    <section id="about" class="container flex-1 flex items-center px-8">
      <!-- HERO -->
      <article
        class="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-0 lg:grid-cols-12 lg:py-16"
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
            community-driven platform, where you can solve problems from various
            problem sets and compete with other users.
          </p>
          <!-- HERO ACTIONS -->
          <div class="flex justify-center w-full mt-8 space-x-10">
            <Button as-child>
              <router-link to="/register">Get Started</router-link>
            </Button>
            <Button variant="secondary" as-child>
              <a href="#about">Learn More</a>
            </Button>
          </div>
        </div>

        <!-- HERO IMAGE -->
        <div class="hidden lg:mt-0 lg:col-span-5 lg:flex">
          <img
            class="w-full h-auto max-w-lg"
            src="/hero.svg"
            alt="Code thinking"
          />
        </div>
      </article>
    </section>

    <!-- PROBLEM SETS -->
    <section class="container flex-1 px-8">
      <h2 class="text-3xl font-extrabold py-5 px-4">Featured Problem Sets</h2>
      <!-- FEATURED PROBLEM SETS -->
      <article class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <Card v-for="i in 9" :key="i">
          <CardHeader>
            <CardTitle>Problem Set {{ i }}</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
              voluptatum, quibusdam, voluptates, quia voluptate quod quos
            </CardDescription>
          </CardContent>
          <CardFooter>
            <Button>View</Button>
          </CardFooter>
        </Card>
      </article>
    </section>

    <!-- LEARN MORE SECTION -->
    <section
      id="about"
      class="container flex flex-col gap-4 lg:flex-row mt-10 px-8 py-5"
    >
      <!-- ABOUT ALGOARENA -->
      <article class="w-full lg:w-1/2 p-2">
        <Button
          variant="outline"
          class="font-extrabold hover:cursor-default text-primary text-xl"
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
      <Card class="m-4 h-fit lg:w-1/2 bg-transparent">
        <CardHeader>
          <CardTitle>Profesor Usage</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>
            If you are a professor, you can create your own problem sets and
            assign them to your students. Each problem will also have a
            leaderboard where you can see the progress of your students.
          </CardDescription>
        </CardContent>
        <CardFooter class="flex items-center gap-10 justify-center">
          <!-- PROBLEMSETS -->
          <Button variant="secondary" as-child>
            <router-link to="/problemsets"> View Problem Sets </router-link>
          </Button>
          <!-- CREATE ACCOUNT -->
          <Button variant="default" as-child>
            <router-link to="/register">Create Account</router-link>
          </Button>
        </CardFooter>
      </Card>
    </section>
  </div>
</template>
