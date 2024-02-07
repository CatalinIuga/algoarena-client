export type ProblemResponse = {
  id: number;
  name: string;
  description: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  author: {
    id: number;
    username: string;
  };
  categories: {
    id: number;
    categoryName: string;
  }[];
  exampleInput: string;
  exampleOutput: string;
  input: string;
  output: string;
};
