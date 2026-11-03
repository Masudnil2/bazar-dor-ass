const BASES = [
  "https://openapi.programming-hero.com/api/bazardor",
  "https://api.api-store.workers.dev/api/bazardor",
  "https://api.abcz.workers.dev/api/bazardor",
];


export async function api(path) {
  for (const b of BASES) {
    try {
      const r = await fetch(b + path);
      if (r.ok) return await r.json();
    } catch {}
  }
  throw new Error("API error");
}

export const toList = (d) => (Array.isArray(d) ? d : d?.data || d?.products || (d ? [d] : []));


export const bn = (n, opts) => Number(n).toLocaleString("bn-BD", opts);

const UNITS = { kg: "প্রতি কেজি", litre: "প্রতি লিটার", liter: "প্রতি লিটার", l: "প্রতি লিটার", dozen: "প্রতি ডজন", piece: "প্রতি পিস", pcs: "প্রতি পিস", pc: "প্রতি পিস", hali: "প্রতি হালি" };
export const unitBn = (u) => UNITS[(u || "").toLowerCase()] || `প্রতি ${u}`;
export const unitShort = (u) => unitBn(u).replace("প্রতি ", "");


export function getChange(p) {
  if (p.change && typeof p.change.pct === "number") return p.change;
  const pct = p.yesterday ? ((p.today - p.yesterday) / p.yesterday) * 100 : 0;
  const r = Math.round(pct * 10) / 10;
  return { dir: r > 0 ? "up" : r < 0 ? "down" : "flat", pct: Math.abs(r) };
}

export function changeText(p) {
  const c = getChange(p);
  const v = bn(c.pct, { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  return c.dir === "up" ? `▲ ${v}%` : c.dir === "down" ? `▼ ${v}%` : `— ${v}%`;
}

export const priceText = (n) => `${bn(n)} টাকা`;