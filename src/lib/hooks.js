"use client";
import { useEffect, useState } from "react";
import { api, toList } from "./utils";

export function useProducts(query = "") {
  const [products, setProducts] = useState(null);
  const [error, setError] = useState(false);
  useEffect(() => {
    setProducts(null);
    api("/products" + query).then((d) => setProducts(toList(d))).catch(() => setError(true));
  }, [query]);
  return { products, loading: products === null && !error, error };
}

export function useCategories() {
  const [cats, setCats] = useState(null);
  useEffect(() => {
    api("/categories").then((d) => setCats(toList(d))).catch(() => setCats([]));
  }, []);
  return cats;
}