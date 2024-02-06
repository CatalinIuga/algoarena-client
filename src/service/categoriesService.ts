import { CategoriesResponse } from "@/types/category";
import { apiURL } from "./config";

export const getCategories = async () => {
  const response = await fetch(`${apiURL}/categories`);
  return response.json() as Promise<CategoriesResponse[]>;
};
