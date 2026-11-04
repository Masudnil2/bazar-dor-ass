"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import SocialButtons from "@/components/SocialButtons";
import { authClient } from "@/lib/auth-client";

export default function SignUp() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    const f = new FormData(e.target);
    const name = f.get("name"), email = f.get("email"), password = f.get("password");
    if (!name || !email || !password) return toast.error("সব ঘর পূরণ করুন");
    if (password.length < 8) return toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
    setLoading(true);
    const { error } = await authClient.signUp.email({ name, email, password });
    setLoading(false);
    if (error) return toast.error(error.message || "রেজিস্ট্রেশন ব্যর্থ হয়েছে");
    toast.success("রেজিস্ট্রেশন সফল! এখন সাইন ইন করুন");
    router.push("/signin");
  };

  return (
    <div className="max-w-md mx-auto card bg-base-100 border border-base-300 p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">সাইন আপ</h1>
      <form onSubmit={submit} className="space-y-3">
        <input name="name" placeholder="নাম" className="input input-bordered w-full" />
        <input name="email" type="email" placeholder="ইমেইল" className="input input-bordered w-full" />
        <input name="password" type="password" placeholder="পাসওয়ার্ড (কমপক্ষে ৮ অক্ষর)" className="input input-bordered w-full" />
        <button className="btn btn-success text-white w-full" disabled={loading}>
          {loading ? <span className="loading loading-spinner" /> : "রেজিস্টার"}
        </button>
      </form>
      <SocialButtons />
      <p className="text-center mt-4 text-sm">
        আগে থেকেই অ্যাকাউন্ট আছে? <Link href="/signin" className="link link-success">সাইন ইন করুন</Link>
      </p>
    </div>
  );
}