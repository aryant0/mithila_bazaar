import axios from "axios";
import { ProductResponse } from "@/models/product";

const BASE_URL = "/api/items";
const AUTH_TOKEN = import.meta.env.VITE_AUTH_TOKEN;

export const getProducts = async (): Promise<ProductResponse> => {
  const fields = [
    "itemId", "itemName", "shortName", "description",
    "mrp", "salePrice", "stock", "cat1", "cat2", "cat3", "cat4", "cat5"
  ].join(",");

  const url = `${BASE_URL}?fields=${fields}&limit=20000&q=stock>=0.0000`;

  try {
    const response = await axios.get<ProductResponse>(url, {
      headers: {
        "X-Auth-Token": AUTH_TOKEN,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Failed to fetch products. Please try again later.");
  }
};
