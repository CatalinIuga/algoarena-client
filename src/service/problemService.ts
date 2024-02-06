import type { ProblemResponse } from "../types/problem";
import { apiURL } from "./config";

export const getProblems = async () => {
  const response = await fetch(`${apiURL}/problems`);
  return response.json() as Promise<ProblemResponse[]>;
};

export const getProblem = async (id: string) => {
  const response = await fetch(`${apiURL}/problems/${id}`);
  return response.json() as Promise<ProblemResponse>;
};

<<<<<<< Updated upstream
export const getRandomProblems = async () => {
  const response = await fetch(`${apiURL}/problems/random`);
  return response.json() as Promise<ProblemResponse[]>;
=======
export const createProblem = async (data: {
  name: string;
  description: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  authorId: number;
  categoriesIds: number[];
  exampleInput: string;
  exampleOutput: string;
  input: string;
  output: string;
}) => {
  console.log(data);
  const response = await fetch(`${apiURL}/problems`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error(await response.text());
  }
  return response.text() as Promise<string>;
>>>>>>> Stashed changes
};
