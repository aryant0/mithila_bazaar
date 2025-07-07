
export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  description: string;
  unit: string;
  inStock: boolean;
  featured?: boolean;
  discount?: number;
}

export const productCategories = [
  'All',
  'Fruits & Vegetables',
  'Rice, Grains & Pulses',
  'Bakery & Breads',
  'Oils & Ghee',
  'Spices & Condiments',
  'Dairy Products',
  'Snacks & Confectionery',
  'Packaged Food',
  'Biscuits & Cookies',
  'Beverages',
  'Meat, Fish & Eggs',
  'Frozen Foods',
  'Dry Fruits & Sweets',
  'Household Essentials',
  'Personal Care',
  'Baby Care',
  'Pet Care',
  'Kitchen & Miscellaneous',
  'Pooja & Religious Items'
];