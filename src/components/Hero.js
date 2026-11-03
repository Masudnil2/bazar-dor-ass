import Image from "next/image";

export default function Hero() {
  return (
    <section className="flex flex-col-reverse md:flex-row items-center gap-8 mb-12">
      <div className="flex-1 space-y-4 text-center md:text-left">
        <p className="text-green-600 font-semibold">প্রতিদিনের বাজার দর</p>
        <h1 className="text-3xl md:text-5xl font-bold leading-tight">আজকের বাজারের সঠিক দাম জানুন</h1>
        <p className="text-gray-600">চাল, ডাল, তেল, সবজি, মাছ ও মাংসসহ প্রয়োজনীয় সব পণ্যের দাম এক জায়গায়।</p>
        <a href="#সব-পণ্য" className="btn btn-success text-white">সব পণ্য দেখুন</a>
      </div>
      <div className="flex-1 flex justify-center">
        <Image src="/bazar-hero.png" alt="বাজার" width={400} height={400} priority className="w-full max-w-sm h-auto" />
      </div>
    </section>
  );
}