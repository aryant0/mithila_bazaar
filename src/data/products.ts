
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

export const products: Product[] = [
  // Fruits & Vegetables
  {
    id: 'fv1',
    name: 'Fresh Tomatoes',
    category: 'Fruits & Vegetables',
    price: 30,
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?q=80&w=500',
    description: 'Farm fresh red tomatoes',
    unit: '1 kg',
    inStock: true,
    featured: true
  },
  {
    id: 'fv2',
    name: 'Fresh Potatoes',
    category: 'Fruits & Vegetables',
    price: 35,
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?q=80&w=500',
    description: 'Grade A quality potatoes',
    unit: '2 kg',
    inStock: true
  },
  {
    id: 'fv3',
    name: 'Green Leafy Vegetables',
    category: 'Fruits & Vegetables',
    price: 25,
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?q=80&w=500',
    description: 'Fresh spinach and other greens',
    unit: '500 g',
    inStock: true
  },
  {
    id: 'fv4',
    name: 'Fresh Bananas',
    category: 'Fruits & Vegetables',
    price: 40,
    image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?q=80&w=500',
    description: 'Ripe yellow bananas',
    unit: '1 dozen',
    inStock: true
  },
  {
    id: 'fv5',
    name: 'Fresh Apples',
    category: 'Fruits & Vegetables',
    price: 120,
    originalPrice: 140,
    image: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?q=80&w=500',
    description: 'Crispy red apples',
    unit: '1 kg',
    inStock: true,
    discount: 14
  },

  // Rice, Grains & Pulses
  {
    id: 'rgp1',
    name: 'Basmati Rice',
    category: 'Rice, Grains & Pulses',
    price: 120,
    originalPrice: 140,
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e26c?q=80&w=500',
    description: 'Premium quality basmati rice',
    unit: '1 kg',
    inStock: true,
    featured: true,
    discount: 14
  },
  {
    id: 'rgp2',
    name: 'Whole Wheat Flour',
    category: 'Rice, Grains & Pulses',
    price: 45,
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?q=80&w=500',
    description: 'Fresh whole wheat flour',
    unit: '1 kg',
    inStock: true
  },
  {
    id: 'rgp3',
    name: 'Toor Dal',
    category: 'Rice, Grains & Pulses',
    price: 95,
    originalPrice: 110,
    image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?q=80&w=500',
    description: 'High quality yellow lentils',
    unit: '1 kg',
    inStock: true,
    discount: 14
  },
  {
    id: 'rgp4',
    name: 'Moong Dal',
    category: 'Rice, Grains & Pulses',
    price: 85,
    image: 'https://images.unsplash.com/photo-1559181567-c3190ca9959b?q=80&w=500',
    description: 'Split green gram',
    unit: '500 g',
    inStock: true
  },

  // Dairy Products
  {
    id: 'dp1',
    name: 'Fresh Milk',
    category: 'Dairy Products',
    price: 25,
    image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?q=80&w=500',
    description: 'Pure and fresh cow milk',
    unit: '500 ml',
    inStock: true,
    featured: true
  },
  {
    id: 'dp2',
    name: 'Paneer',
    category: 'Dairy Products',
    price: 180,
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=500',
    description: 'Fresh homemade paneer',
    unit: '250 g',
    inStock: true
  },
  {
    id: 'dp3',
    name: 'Curd',
    category: 'Dairy Products',
    price: 40,
    image: 'https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?q=80&w=500',
    description: 'Fresh and creamy curd',
    unit: '500 g',
    inStock: true
  },

  // Beverages
  {
    id: 'bv1',
    name: 'Masala Chai',
    category: 'Beverages',
    price: 85,
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=500',
    description: 'Premium tea blend',
    unit: '250 g',
    inStock: true
  },
  {
    id: 'bv2',
    name: 'Fresh Orange Juice',
    category: 'Beverages',
    price: 45,
    image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?q=80&w=500',
    description: 'Freshly squeezed orange juice',
    unit: '200 ml',
    inStock: true
  },
  {
    id: 'bv3',
    name: 'Coffee Powder',
    category: 'Beverages',
    price: 150,
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=500',
    description: 'Premium instant coffee',
    unit: '100 g',
    inStock: true
  },

  // Oils & Ghee
  {
    id: 'og1',
    name: 'Sunflower Oil',
    category: 'Oils & Ghee',
    price: 140,
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?q=80&w=500',
    description: 'Pure sunflower cooking oil',
    unit: '1 liter',
    inStock: true
  },
  {
    id: 'og2',
    name: 'Pure Cow Ghee',
    category: 'Oils & Ghee',
    price: 450,
    originalPrice: 500,
    image: 'https://images.unsplash.com/photo-1629641432009-5e59a19e38ad?q=80&w=500',
    description: 'Traditional cow ghee',
    unit: '500 ml',
    inStock: true,
    discount: 10
  },

  // Spices & Condiments
  {
    id: 'sc1',
    name: 'Turmeric Powder',
    category: 'Spices & Condiments',
    price: 35,
    image: 'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?q=80&w=500',
    description: 'Pure turmeric powder',
    unit: '100 g',
    inStock: true
  },
  {
    id: 'sc2',
    name: 'Garam Masala',
    category: 'Spices & Condiments',
    price: 55,
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=500',
    description: 'Aromatic spice blend',
    unit: '50 g',
    inStock: true
  },

  // Household Essentials
  {
    id: 'he1',
    name: 'Laundry Detergent',
    category: 'Household Essentials',
    price: 65,
    originalPrice: 75,
    image: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?q=80&w=500',
    description: 'Effective cleaning powder',
    unit: '500 g',
    inStock: true,
    discount: 13
  },
  {
    id: 'he2',
    name: 'Dishwash Bar',
    category: 'Household Essentials',
    price: 25,
    image: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?q=80&w=500',
    description: 'Lemon fresh dishwash bar',
    unit: '1 piece',
    inStock: true
  },

  // Snacks & Confectionery
  {
    id: 'snc1',
    name: 'Potato Chips',
    category: 'Snacks & Confectionery',
    price: 20,
    image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?q=80&w=500',
    description: 'Crispy salted chips',
    unit: '50 g',
    inStock: true
  },
  {
    id: 'snc2',
    name: 'Mixed Namkeen',
    category: 'Snacks & Confectionery',
    price: 45,
    image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?q=80&w=500',
    description: 'Traditional Indian snack mix',
    unit: '200 g',
    inStock: true
  },

  // Bakery & Breads
  {
    id: 'bb1',
    name: 'White Bread',
    category: 'Bakery & Breads',
    price: 30,
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=500',
    description: 'Fresh white bread loaf',
    unit: '1 loaf',
    inStock: true
  },
  {
    id: 'bb2',
    name: 'Pav Buns',
    category: 'Bakery & Breads',
    price: 25,
    image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=80&w=500',
    description: 'Soft dinner rolls',
    unit: '6 pieces',
    inStock: true
  },

  // Packaged Food
  {
    id: 'pf1',
    name: 'Instant Noodles',
    category: 'Packaged Food',
    price: 15,
    image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=500',
    description: 'Quick cook masala noodles',
    unit: '1 pack',
    inStock: true
  },
  {
    id: 'pf2',
    name: 'Breakfast Cereal',
    category: 'Packaged Food',
    price: 180,
    image: 'https://images.unsplash.com/photo-1517686748449-2a5f8c38dc6d?q=80&w=500',
    description: 'Healthy corn flakes',
    unit: '500 g',
    inStock: true
  },

  // Biscuits & Cookies
  {
    id: 'bc1',
    name: 'Marie Biscuits',
    category: 'Biscuits & Cookies',
    price: 25,
    image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?q=80&w=500',
    description: 'Classic tea biscuits',
    unit: '1 pack',
    inStock: true
  },
  {
    id: 'bc2',
    name: 'Chocolate Cookies',
    category: 'Biscuits & Cookies',
    price: 40,
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?q=80&w=500',
    description: 'Rich chocolate chip cookies',
    unit: '1 pack',
    inStock: true
  },

  // Personal Care
  {
    id: 'pc1',
    name: 'Bath Soap',
    category: 'Personal Care',
    price: 35,
    image: 'https://images.unsplash.com/photo-1607947715481-6b31399e1a68?q=80&w=500',
    description: 'Moisturizing bath soap',
    unit: '1 piece',
    inStock: true
  },
  {
    id: 'pc2',
    name: 'Shampoo',
    category: 'Personal Care',
    price: 85,
    image: 'https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?q=80&w=500',
    description: 'Hair care shampoo',
    unit: '200 ml',
    inStock: true
  },

  // Dry Fruits & Sweets
  {
    id: 'dfs1',
    name: 'Cashew Nuts',
    category: 'Dry Fruits & Sweets',
    price: 480,
    image: 'https://images.unsplash.com/photo-1598345962961-8198de1c3e2d?q=80&w=500',
    description: 'Premium quality cashews',
    unit: '250 g',
    inStock: true
  },
  {
    id: 'dfs2',
    name: 'Rasgulla',
    category: 'Dry Fruits & Sweets',
    price: 120,
    image: 'https://images.unsplash.com/photo-1604908816542-57c64a2b8ba7?q=80&w=500',
    description: 'Traditional Bengali sweet',
    unit: '1 kg',
    inStock: true
  },

  // Frozen Foods
  {
    id: 'ff1',
    name: 'Frozen Samosa',
    category: 'Frozen Foods',
    price: 65,
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=500',
    description: 'Ready to fry samosas',
    unit: '10 pieces',
    inStock: true
  },
  {
    id: 'ff2',
    name: 'Ice Cream',
    category: 'Frozen Foods',
    price: 120,
    image: 'https://images.unsplash.com/photo-1567206563064-6f60f40a2b57?q=80&w=500',
    description: 'Vanilla ice cream',
    unit: '500 ml',
    inStock: true
  },

  // Baby Care
  {
    id: 'baby1',
    name: 'Baby Diapers',
    category: 'Baby Care',
    price: 450,
    image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=500',
    description: 'Soft and comfortable diapers',
    unit: '30 pieces',
    inStock: true
  },

  // Pet Care
  {
    id: 'pet1',
    name: 'Dog Food',
    category: 'Pet Care',
    price: 380,
    image: 'https://images.unsplash.com/photo-1415369629372-26f2fe60c467?q=80&w=500',
    description: 'Nutritious dry dog food',
    unit: '1 kg',
    inStock: true
  },

  // Kitchen & Miscellaneous
  {
    id: 'km1',
    name: 'Aluminum Foil',
    category: 'Kitchen & Miscellaneous',
    price: 85,
    image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?q=80&w=500',
    description: 'Food grade aluminum foil',
    unit: '1 roll',
    inStock: true
  },

  // Pooja & Religious Items
  {
    id: 'pri1',
    name: 'Agarbatti',
    category: 'Pooja & Religious Items',
    price: 25,
    image: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?q=80&w=500',
    description: 'Fragrant incense sticks',
    unit: '1 pack',
    inStock: true
  },
  {
    id: 'pri2',
    name: 'Camphor',
    category: 'Pooja & Religious Items',
    price: 15,
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=500',
    description: 'Pure camphor tablets',
    unit: '50 g',
    inStock: true
  },

  // Meat, Fish & Eggs
  {
    id: 'mfe1',
    name: 'Fresh Eggs',
    category: 'Meat, Fish & Eggs',
    price: 60,
    image: 'https://images.unsplash.com/photo-1518569656558-1f25e69d93d7?q=80&w=500',
    description: 'Farm fresh chicken eggs',
    unit: '12 pieces',
    inStock: true
  },
  {
    id: 'mfe2',
    name: 'Fresh Chicken',
    category: 'Meat, Fish & Eggs',
    price: 280,
    image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?q=80&w=500',
    description: 'Fresh broiler chicken',
    unit: '1 kg',
    inStock: true
  }
];
