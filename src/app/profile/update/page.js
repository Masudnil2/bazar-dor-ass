"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function UpdateProfile() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isPending && !session) {
      toast.error("প্রথমে সাইন ইন করুন");
      router.replace("/signin");
    }
    if (session) setName(session.user.name || "");
  }, [isPending, session, router]);

  const submit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return toast.error("নাম দিন");
    setLoading(true);
    const { error } = await authClient.updateUser({ name });
    setLoading(false);
    if (error) return toast.error(error.message || "আপডেট ব্যর্থ হয়েছে");
    toast.success("তথ্য আপডেট হয়েছে");
    router.push("/profile");
  };

  return (
    <div className="max-w-md mx-auto card bg-base-100 border border-base-300 p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">তথ্য আপডেট</h1>
      <form onSubmit={submit} className="space-y-3">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="নাম"
          className="input input-bordered w-full"
        />
        <button className="btn btn-success text-white w-full" disabled={loading}>
          {loading ? <span className="loading loading-spinner" /> : "Update Information"}
        </button>
      </form>
    </div>
  );
}