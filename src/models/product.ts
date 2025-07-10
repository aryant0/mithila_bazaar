export interface ProductResponse {
  items: Item[];
  count: number;
  total_records: number;
  current_page: number;
  per_page: number;
  total_pages: number;
}

export interface Item {
  itemId: number;            // The id of the item
  itemName: string;          // The name of the item
  shortName: string;         // The short name of the item
  description: string | null;// The description of the item
  stock: StockDetail[];      // <<<< ✅ Corrected: it's an array!
}

export interface StockDetail {
  mrp: number;
  salePrice: number;
  stock: number;
  cat1: string;  // DEPARTMENT
  cat2: string;  // MAIN-CATEGORY
  cat3: string;  // SUB-CATEGORY
  cat4: string;  // BRAND
  cat5: string;  // SIZE-WEIGHT
}
