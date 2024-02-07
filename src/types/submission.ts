export type SubmissionResponse = {
  code: string;
  language_id: number;
  id: number;
  author: {
    username: string;
    id: number;
  };
  problem: {
    name: string;
    description: string;
    difficulty: "EASY" | "MEDIUM" | "HARD";
    exampleInput: string;
    exampleOutput: string;
    id: number;
    author: {
      username: string;
      id: number;
    };
    categories: {
      categoryName: string;
      id: number;
    }[];
  };
  status: string;
  message: string;
  time: string;
  memory: string;
};
