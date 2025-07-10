import axios from "axios";
import { ProductResponse } from "@/models/product";

const BASE_URL = "/api/items";
const AUTH_TOKEN = import.meta.env.VITE_AUTH_TOKEN;

// MOCK DATA START
const mockProducts = Array.from({ length: 32 }, (_, i) => ({
  itemId: i + 1,
  itemName: `Mock Product ${i + 1}`,
  shortName: `Mock${i + 1}`,
  description: `This is a description for mock product ${i + 1}.`,
  stock: {
    mrp: 100 + i * 10,
    salePrice: 80 + i * 8,
    stock: 10 + i,
    cat1: 'Department',
    cat2: 'Category',
    cat3: 'SubCategory',
    cat4: 'Brand',
    cat5: 'Size',
  },
}));

function getMockProducts({ page = 1, limit = 8, search = '', category = '' }) {
  let filteredProducts = [...mockProducts];
  
  // Apply search filter - exact match or starts with
  if (search && search.trim()) {
    const searchLower = search.toLowerCase();
    filteredProducts = filteredProducts.filter(product => {
      const nameLower = product.itemName.toLowerCase();
      // Exact match or starts with the search term
      return nameLower === searchLower || nameLower.startsWith(searchLower);
    });
  }
  
  // Apply category filter
  if (category && category.trim()) {
    filteredProducts = filteredProducts.filter(product => 
      product.stock.cat2 === category || 
      product.stock.cat3 === category ||
      product.stock.cat4 === category
    );
  }
  
  const total = filteredProducts.length;
  const total_pages = Math.ceil(total / limit);
  const start = (page - 1) * limit;
  const end = start + limit;
  
  return Promise.resolve({
    items: filteredProducts.slice(start, end),
    count: filteredProducts.slice(start, end).length,
    total_records: total,
    current_page: page,
    per_page: limit,
    total_pages,
  });
}
// MOCK DATA END

export const getProducts = async (params: { page?: number; limit?: number; search?: string; category?: string } = {}) => {
  const { page = 1, limit = 8, search = '', category = '' } = params;

  const fields = [
    "itemId", "itemName", "shortName", "description",
    "mrp", "salePrice", "stock", "cat1", "cat2", "cat3", "cat4", "cat5"
  ].join(",");

  const queryParams = [
    `fields=${fields}`,
    `page=${page}`,
    `limit=${limit}`,
    `q=stock>=0.0000`, // filter to only get items with stock >= 0.0
    search ? `search=${encodeURIComponent(search)}` : '',
    category ? `category=${encodeURIComponent(category)}` : ''
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
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Failed to fetch products. Please try again later.");
  }
};
