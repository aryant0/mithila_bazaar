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

function getMockProducts({ page = 1, limit = 8 }) {
  const total = mockProducts.length;
  const total_pages = Math.ceil(total / limit);
  const start = (page - 1) * limit;
  const end = start + limit;
  return Promise.resolve({
    items: mockProducts.slice(start, end),
    count: mockProducts.slice(start, end).length,
    total_records: total,
    current_page: page,
    per_page: limit,
    total_pages,
  });
}
// MOCK DATA END

export const getProducts = async (params = {}) => {
  // Always use mock for now
  return getMockProducts(params);
};
