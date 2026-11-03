import Link from "next/link";

export default function NotFoundView({ text = "দুঃখিত, পেজটি খুঁজে পাওয়া যায়নি।" }) {
  return (
    <div className="text-center py-20 space-y-4">
      <div className="text-7xl">🛒</div>
      <h1 className="text-4xl font-bold">৪০৪</h1>
      <p className="text-gray-500">{text}</p>
      <Link href="/" className="btn btn-success text-white">হোম পেজে ফিরে যান</Link>
    </div>
  );
}