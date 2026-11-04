"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import SocialButtons from "@/components/SocialButtons";
import { authClient } from "@/lib/auth-client";

export default function SignIn() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    const f = new FormData(e.target);
    const email = f.get("email"), password = f.get("password");
    if (!email || !password) return toast.error("ইমেইল ও পাসওয়ার্ড দিন");
    setLoading(true);
    const { error } = await authClient.signIn.email({ email, password });
    setLoading(false);
    if (error) return toast.error(error.message || "লগইন ব্যর্থ হয়েছে");
    toast.success("সফলভাবে লগইন হয়েছে");
    router.push("/");
  };

  return (
    <div className="max-w-md mx-auto card bg-base-100 border border-base-300 p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">সাইন ইন</h1>
      <form onSubmit={submit} className="space-y-3">
        <input name="email" type="email" placeholder="ইমেইল" className="input input-bordered w-full" />
        <input name="password" type="password" placeholder="পাসওয়ার্ড" className="input input-bordered w-full" />
        <button className="btn btn-success text-white w-full" disabled={loading}>
          {loading ? <span className="loading loading-spinner" /> : "সাইন ইন"}
        </button>
      </form>
      <SocialButtons />
      <p className="text-center mt-4 text-sm">
        অ্যাকাউন্ট নেই? <Link href="/signup" className="link link-success">সাইন আপ করুন</Link>
      </p>
    </div>
  );
}