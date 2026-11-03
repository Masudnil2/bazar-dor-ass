import Link from "next/link";
import { changeText, getChange, priceText, unitBn } from "@/lib/utils";

export default function ProductCard({ p }) {
  const c = getChange(p);
  const badge = c.dir === "up" ? "badge-success" : c.dir === "down" ? "badge-error" : "badge-ghost";
  return (
    <Link href={`/product/${p.slug}`} className="card bg-base-100 border border-base-300 hover:shadow-lg transition">
      <div className="card-body p-4">
        <div className="text-4xl">{p.image}</div>
        <h3 className="font-bold text-lg">{p.nameBn}</h3>
        <p className="text-sm text-gray-500">{unitBn(p.unit)}</p>
        <div className="flex items-center justify-between mt-2">
          <div>
            <div className="text-xs text-gray-500">আজকের দাম</div>
            <div className="font-bold">{priceText(p.today)}</div>
          </div>
          <span className={`badge ${badge} text-white`}>{changeText(p)}</span>
        </div>
      </div>
    </Link>
  );
}