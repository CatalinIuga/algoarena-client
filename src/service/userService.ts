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

export const updateUserProfile = async (
  token: string,
  id: number | undefined,
  data: FormData,
): Promise<{
  token: string;
}> => {
  if (!id) {
    throw new Error("User ID is required");
  }
  const response = await fetch(`${apiURL}/users/${id}/profile`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: data,
  });

  if (!response.ok) {
    throw new Error("Failed to update profile");
  }

  return response.json() as Promise<{
    token: string;
  }>;
};

export const deleteUserAccount = async (
  token: string,
  id: number | undefined,
): Promise<void> => {
  if (!id) {
    throw new Error("User ID is required");
  }
  const response = await fetch(`${apiURL}/users/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete account");
  }
};
