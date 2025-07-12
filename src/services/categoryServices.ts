import axios from "axios";
import { CategoryResponse } from "@/models/category";
import categoryLocalData from "@/data/category.json"; // Assuming you have a local JSON file for testing';

const CATEGORY_URL = "/api/categoryValues";
const AUTH_TOKEN = import.meta.env.VITE_AUTH_TOKEN;

export const getCategoriesByCatName = async (catName: string): Promise<CategoryResponse> => {
    const url = `${CATEGORY_URL}?fields=categoryValueId,categoryValueName,catName,catStatus&limit=200&q=catName==${catName}`;

    try {
        const response = await axios.get<CategoryResponse>(url, {
            headers: {
                "X-Auth-Token": AUTH_TOKEN,
            },
        });
        return response.data;
        //return categoryLocalData; // For testing, using local data instead of API call
    } catch (error) {
        console.error("Error fetching categories:", error);
        throw new Error("Failed to fetch categories. Please try again later.");
    }
};
