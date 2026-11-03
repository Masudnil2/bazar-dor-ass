"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { useCategories } from "@/lib/hooks";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const cats = useCategories();
  const { data: session } = authClient.useSession();
  const [date, setDate] = useState("");

  useEffect(() => {
    setDate(new Date().toLocaleDateString("bn-BD", { weekday: "long", day: "numeric", month: "long", year: "numeric" }));
  }, []);

  const logout = async () => {
    await authClient.signOut();
    toast.success("সফলভাবে সাইন আউট হয়েছে");
    router.push("/");
  };

  return (
    <header className="bg-base-100 border-b border-base-300 sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo-icon.png" alt="logo" width={32} height={32} />
          <div>
            <div className="font-bold text-xl leading-tight">বাজার দর</div>
            <div className="text-xs text-gray-500">{date}</div>
          </div>
        </Link>

        <nav className="hidden lg:flex gap-1">
          {cats?.map((c) => (
            <Link key={c.slug} href={`/category/${c.slug}`}
              className={`btn btn-sm ${pathname === `/category/${c.slug}` ? "btn-success text-white" : "btn-ghost"}`}>
              {c.icon} {c.nameBn}
            </Link>
          ))}
        </nav>

        <div className="flex gap-2 items-center">
          {session ? (
            <>
              <Link href="/profile" className="btn btn-sm sm:btn-md btn-ghost">👤 <span className="hidden sm:inline">{session.user.name}</span></Link>
              <button onClick={logout} className="btn btn-sm sm:btn-md btn-outline btn-error">সাইন আউট</button>
            </>
          ) : (
            <>
              <Link href="/signin" className="btn btn-sm sm:btn-md btn-outline">সাইন ইন</Link>
              <Link href="/signup" className="btn btn-sm sm:btn-md btn-success text-white">সাইন আপ</Link>
            </>
          )}
        </div>
      </div>

      
      <nav className="lg:hidden flex gap-1 overflow-x-auto px-4 pb-2">
        {cats?.map((c) => (
          <Link key={c.slug} href={`/category/${c.slug}`}
            className={`btn btn-xs shrink-0 ${pathname === `/category/${c.slug}` ? "btn-success text-white" : "btn-ghost"}`}>
            {c.icon} {c.nameBn}
          </Link>
        ))}
      </nav>
    </header>
  );
}