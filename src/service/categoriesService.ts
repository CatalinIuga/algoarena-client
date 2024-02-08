import { CategoriesResponse } from "@/types/category";
import { apiURL } from "./config";

export const getCategories = async () => {
  const response = await fetch(`${apiURL}/categories`);
  return response.json() as Promise<CategoriesResponse[]>;
};

export const createCategory = async (name: string) => {
  const response = await fetch(`${apiURL}/categories`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ categoryName: name }),
  });

  let result;
  try {
    result = await response.json();
  } catch (error) {}

  if (!response.ok) {
    throw new Error(result.message);
  }

  return "Category added succesfully!";
};
