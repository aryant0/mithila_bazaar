import React, { createContext, useContext, useEffect, useState } from "react";
import { CategoryValue } from "@/models/category";
import { getCategoriesByCatName } from "@/services/categoryServices";

interface CategoryContextType {
  categories: CategoryValue[];
  loading: boolean;
  error: string | null;
}

const CategoryContext = createContext<CategoryContextType>({
  categories: [],
  loading: false,
  error: null,
});

export const CategoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [categories, setCategories] = useState<CategoryValue[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    getCategoriesByCatName("Cat2")
      .then(data => setCategories(data.categoryValues))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <CategoryContext.Provider value={{ categories, loading, error }}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategoryContext = () => useContext(CategoryContext);
