"use client";
import { useProducts } from "@/lib/hooks";
import { changeText, getChange, priceText, unitShort } from "@/lib/utils";

export default function Ticker() {
  const { products } = useProducts();
  if (!products?.length) return <div className="h-9 bg-gray-900" />;
  const items = [...products, ...products]; 
  return (
    <div className="bg-gray-900 text-white overflow-hidden h-9 flex items-center">
      <div className="marquee flex gap-8 text-sm whitespace-nowrap">
        {items.map((p, i) => {
          const c = getChange(p);
          const color = c.dir === "up" ? "text-green-400" : c.dir === "down" ? "text-red-400" : "text-gray-400";
          return (
            <span key={i}>
              {p.image} {p.nameBn} {priceText(p.today)}/{unitShort(p.unit)} <span className={color}>{changeText(p)}</span>
            </span>
          );
        })}
      </div>
    </div>
  );
}