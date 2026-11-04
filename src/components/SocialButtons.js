"use client";
import { authClient } from "@/lib/auth-client";

export default function SocialButtons() {
  const go = (provider) => authClient.signIn.social({ provider, callbackURL: "/" });
  return (
    <div className="space-y-2">
      <div className="divider">অথবা</div>
      <button type="button" onClick={() => go("google")} className="btn btn-outline w-full">Google দিয়ে চালিয়ে যান</button>
      <button type="button" onClick={() => go("github")} className="btn btn-outline w-full">GitHub দিয়ে চালিয়ে যান</button>
    </div>
  );
}