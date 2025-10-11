"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full flex justify-center gap-8 p-4 bg-gray-100 dark:bg-gray-900">
      <Link href="/home" className="text-blue-600 hover:underline">Home</Link>
      <Link href="/aboutus" className="text-blue-600 hover:underline">About Us</Link>
    </nav>
  );
}
