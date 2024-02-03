import { ProfileResponse } from "@/types/user";
import { apiURL } from "./config";

export const getProfile = async (
  token: string,
  id: number | undefined,
): Promise<ProfileResponse> => {
  if (!id) {
    throw new Error("User ID is required");
  }
  const response = await fetch(`${apiURL}/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to get profile");
  }

  return response.json() as Promise<ProfileResponse>;
};
