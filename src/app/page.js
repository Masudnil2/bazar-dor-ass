"use client";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import SkeletonGrid from "@/components/SkeletonGrid";
import { useProducts } from "@/lib/hooks";
import { getChange } from "@/lib/utils";

function Section({ id, title, sub, items }) {
  return (
    <section id={id} className="mb-12 scroll-mt-28">
      <h2 className="text-2xl font-bold">{title}</h2>
      {sub && <p className="text-gray-500 mb-4">{sub}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        {items.map((p) => <ProductCard key={p.id} p={p} />)}
      </div>
    </section>
  );
}

export default function Home() {
  const { products, loading, error } = useProducts();

  if (error) return <p className="text-center text-red-500">ডেটা লোড করা যায়নি, আবার চেষ্টা করুন।</p>;

  const risers = products ? products.filter((p) => getChange(p).dir === "up").sort((a, b) => getChange(b).pct - getChange(a).pct).slice(0, 6) : [];
  const fallers = products ? products.filter((p) => getChange(p).dir === "down").sort((a, b) => getChange(b).pct - getChange(a).pct).slice(0, 6) : [];

  return (
    <>
      <Hero />
      {loading ? <SkeletonGrid n={8} /> : (
        <>
          <Section title="আজ দাম বেড়েছে ▲" items={risers} />
          <Section title="আজ দাম কমেছে ▼" items={fallers} />
          <Section id="সব-পণ্য" title="সব পণ্য" sub="সব পণ্যের আজকের দাম" items={products} />
        </>
      )}
    </>
  );
}