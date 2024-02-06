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

export const getRandomProblems = async () => {
  const response = await fetch(`${apiURL}/problems/random`);
  return response.json() as Promise<ProblemResponse[]>;
};
