import "./globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import Ticker from "@/components/Ticker";
import Footer from "@/components/Footer";

export const metadata = { title: "বাজার দর", description: "প্রয়োজনীয় পণ্যের দাম এক নজরে" };

export default function RootLayout({ children }) {
  return (
    <html lang="bn" data-theme="light">
      <body className="min-h-screen flex flex-col bg-base-100">
        <Navbar />
        <Ticker />
        <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-8">{children}</main>
        <Footer />
        <Toaster position="top-center" />
      </body>
    </html>
  );
}