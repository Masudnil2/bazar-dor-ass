"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function Profile() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (!isPending && !session) {
      toast.error("প্রথমে সাইন ইন করুন");
      router.replace("/signin");
    }
  }, [isPending, session, router]);

  if (isPending || !session) return <div className="skeleton h-48 max-w-md mx-auto" />;

  const u = session.user;
  return (
    <div className="max-w-md mx-auto card bg-base-100 border border-base-300 p-6 text-center space-y-3">
      <div className="avatar placeholder justify-center">
        <div className="bg-success text-white w-20 rounded-full text-3xl">
          {u.image ? <img src={u.image} alt="" /> : u.name?.[0]}
        </div>
      </div>
      <h1 className="text-2xl font-bold">{u.name}</h1>
      <p className="text-gray-500">{u.email}</p>
      <Link href="/profile/update" className="btn btn-success text-white">তথ্য আপডেট করুন</Link>
    </div>
  );
}