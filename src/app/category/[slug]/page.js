"use client";
import { useParams } from "next/navigation";
import { useState } from "react";
import NotFoundView from "@/components/NotFoundView";
import ProductCard from "@/components/ProductCard";
import SkeletonGrid from "@/components/SkeletonGrid";
import { useCategories, useProducts } from "@/lib/hooks";

export default function CategoryPage() {
  const { slug } = useParams();
  const cats = useCategories();
  const { products, loading } = useProducts(`?category=${slug}`);
  const [sort, setSort] = useState("default");

  const cat = cats?.find((c) => c.slug === slug);
  const list = products ? [...products] : [];

  
  if (sort === "asc") list.sort((a, b) => a.today - b.today);
  if (sort === "desc") list.sort((a, b) => b.today - a.today);

  
  if (!loading && cats && (!cat || list.length === 0)) {
    return <NotFoundView text="এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।" />;
  }

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 mb-6">
        <h1 className="text-3xl font-bold">{cat ? `${cat.icon} ${cat.nameBn}` : "লোড হচ্ছে…"}</h1>
        <label className="flex items-center gap-2">
          <span>সাজান:</span>
          <select
            className="select select-bordered select-sm sm:select-md"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="default">ডিফল্ট</option>
            <option value="asc">দাম: কম থেকে বেশি</option>
            <option value="desc">দাম: বেশি থেকে কম</option>
          </select>
        </label>
      </div>

      {loading ? (
        <SkeletonGrid />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {list.map((p) => <ProductCard key={p.id} p={p} />)}
        </div>
      )}
    </>
  );
}