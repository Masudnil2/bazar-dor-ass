"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import NotFoundView from "@/components/NotFoundView";
import { authClient } from "@/lib/auth-client";
import { api, changeText, getChange, priceText, toList, unitBn } from "@/lib/utils";

export default function ProductPage() {
  const { slug } = useParams();
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [p, setP] = useState(undefined); 

  
  useEffect(() => {
    if (!isPending && !session) {
      toast.error("প্রথমে সাইন ইন করুন");
      router.replace("/signin");
    }
  }, [isPending, session, router]);

  
  useEffect(() => {
    if (!session) return;
    (async () => {
      try {
        const first = toList(await api(`/products?slug=${slug}`))[0];
        if (!first) return setP(null);
        const full = first.markets ? first : await api(`/products/${first.id}`);
        setP(full);
      } catch {
        setP(null);
      }
    })();
  }, [slug, session]);

  if (isPending || !session || p === undefined) {
    return (
      <div className="space-y-4">
        <div className="skeleton h-12 w-1/2" />
        <div className="skeleton h-32 w-full" />
        <div className="skeleton h-64 w-full" />
      </div>
    );
  }
  if (p === null) return <NotFoundView text="এই পণ্যটি পাওয়া যায়নি।" />;

  const markets = p.markets || [];
  const min = markets.length ? Math.min(...markets.map((m) => m.min)) : p.today;
  const max = markets.length ? Math.max(...markets.map((m) => m.max)) : p.today;
  const avg = markets.length
    ? Math.round(markets.reduce((s, m) => s + (m.min + m.max) / 2, 0) / markets.length)
    : p.today;
  const c = getChange(p);
  const color = c.dir === "up" ? "text-green-600" : c.dir === "down" ? "text-red-600" : "text-gray-500";

  const stat = (label, val) => (
    <div className="stat bg-base-100 border border-base-300 rounded-box">
      <div className="stat-title">{label}</div>
      <div className="stat-value text-2xl">{priceText(val)}</div>
    </div>
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">{p.image} {p.nameBn}</h1>
        <p className="text-gray-600 mt-2">
          আজকের গড় দাম {priceText(p.today)} ({unitBn(p.unit)}), গতকালের তুলনায{" "}
          <span className={color}>{changeText(p)}</span>।
        </p>
        <div className="flex flex-wrap gap-2 mt-3">
          <span className="badge badge-outline">{p.categoryIcon} {p.categoryNameBn}</span>
          <span className="badge badge-outline">{unitBn(p.unit)}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stat("সর্বনিম্ন দাম", min)}
        {stat("সর্বোচ্চ দাম", max)}
        {stat("গড় দাম", avg)}
      </div>

      <section>
        <h2 className="text-2xl font-bold mb-4">বাজারভিত্তিক আজকের দাম</h2>
        <div className="overflow-x-auto border border-base-300 rounded-box">
          <table className="table">
            <thead>
              <tr><th>বাজার</th><th>বিভাগ</th><th>সর্বনিম্ন</th><th>সর্বোচ্চ</th></tr>
            </thead>
            <tbody>
              {markets.map((m, i) => (
                <tr key={i}>
                  <td>{m.market}</td>
                  <td>{m.division}</td>
                  <td>{priceText(m.min)}</td>
                  <td>{priceText(m.max)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}