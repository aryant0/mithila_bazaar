import React, { createContext, useContext, useEffect, useState } from 'react';
import { Item } from '@/models/product';
import { getProducts } from '@/services/productServices';

interface ProductContextType {
  productList: Item[];
  setProductList: React.Dispatch<React.SetStateAction<Item[]>>;
  loading: boolean;
  error: string | null;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [productList, setProductList] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    getProducts()
      .then(data => setProductList(data.items))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <ProductContext.Provider value={{ productList, setProductList, loading, error }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProductContext must be used within a ProductProvider');
  }
  return context;
};