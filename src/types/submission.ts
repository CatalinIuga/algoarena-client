import { ProblemResponse } from "./problem";

export type SubmissionResponse = {
  id: number;
  author: {
    id: number;
    username: string;
  };
  problem: ProblemResponse;
  code: string;
  language_id: number;
  status: string;
  message: string;
  time: string;
  memory: string;
};
