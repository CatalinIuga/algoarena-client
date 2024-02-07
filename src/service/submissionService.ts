import { SubmissionResponse } from "@/types/submission";
import { apiURL } from "./config";

export const getSubmissions = async (
  token: string,
  id: number | undefined,
): Promise<SubmissionResponse[]> => {
  if (!id) {
    throw new Error("User ID is required");
  }
  const response = await fetch(`${apiURL}/users/${id}/submission`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to get submission");
  }

  return response.json() as Promise<SubmissionResponse[]>;
};

export const submitSolution = async ({
  token,
  userId,
  code,
  languageId,
  problemId,
}: {
  token: string;
  userId: number;
  code: string;
  languageId: number;
  problemId: number;
}): Promise<string> => {
  const response = await fetch(`${apiURL}/submissions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      authorId: userId,
      code,
      language_id: languageId,
      problemId,
    }),
  });

  if (!response.ok) {
    const result = await response.json();
    throw new Error(result.message);
  }

  return response.text() as Promise<string>;
};
