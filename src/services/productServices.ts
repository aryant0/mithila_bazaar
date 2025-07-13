import axios from "axios";
import { ProductResponse } from "@/models/product";
import productLocalData from "@/data/products.json"; // Assuming you have a local JSON file for testing';

const BASE_URL = "/api/items";
const AUTH_TOKEN = import.meta.env.VITE_AUTH_TOKEN;

export const getProducts = async (params: { page?: number; limit?: number; } = {}) => {
  const { page = 1, limit = 20000 } = params;

  const fields = [
    "itemId", "itemName", "shortName", "description",
    "mrp", "salePrice", "stock", "cat1", "cat2", "cat3", "cat4", "cat5"
  ].join(",");

  const queryParams = [
    `fields=${fields}`,
    `page=${page}`,
    `limit=${limit}`,
    `q=stock>=1.0000`, // filter to only get items with stock
  ]
    .filter(Boolean)
    .join('&');

  const url = `${BASE_URL}?${queryParams}`;

  try {
    const response = await axios.get<ProductResponse>(url, {
      headers: {
        "X-Auth-Token": AUTH_TOKEN,
      },
    });
    return response.data;

    //return productLocalData; // For testing, using local data instead of API call

  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Failed to fetch products. Please try again later.");
  }
};
