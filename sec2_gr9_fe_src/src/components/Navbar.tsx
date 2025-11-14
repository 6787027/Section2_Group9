"use client";
import Image from "next/image";
import Link from "next/link";
import Logo from '../assets/logo-navbar.svg'
import { faSearch } from "@fortawesome/free-solid-svg-icons";
// import { faUser } from "@fortawesome/free-regular-svg-icons"; // ไม่ได้ใช้งาน
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ShoppingBag, UserRound } from "lucide-react";
import AboutUs from "@/app/(user)/aboutus/page"; // ไม่ได้ใช้งาน แต่เป็นโค้ดเดิมของคุณ

// 1. Import useAuth เพื่อเข้าถึง Context
import { useAuth } from "@/app/context/AuthContext"; 

export default function Navbar() {
  // 2. ดึงสถานะ user ออกมาจาก AuthContext
  // (user จะเป็น object ถ้า login อยู่, และเป็น null ถ้า logout)
  const { user } = useAuth();

  return (
    <div >
      <main>
        <div className="bg-white w-full h-12 text-white  px-6 flex justify-between border border-b-gray-200  items-center">

          <Image alt="logo-nav" src={Logo} width='180' className="float-left"/>

          <div className="flex justify-end gap-8 w-[10rem]"> 
            <div className="flex justify-between gap-8">
              <Link href="/cart"> <ShoppingBag color='black' strokeWidth={1} size={24} className="hover:stroke-[#A599ED] active:stroke-black"/>   </Link>
              <Link href={user ? "/user_profile" : "/login"}> 
                <UserRound color='black' strokeWidth={1} size={24} className="hover:stroke-[#A599ED] active:stroke-back"/> 
              </Link>
            </div>
          </div>

        </div>
        
        <div className="bg-white w-full h-10 text-md shadow-xl flex justify-center items-center gap-16" >
          <Link href="/home" className="hover:text-[#A599ED] active:text-black">Home</Link>
          <Link href="/featured" className="hover:text-[#A599ED] active:text-black">Featured</Link>
          <Link href="/product" className="hover:text-[#A599ED] active:text-black">Product</Link>
          <Link href="/aboutus" className="hover:text-[#A599ED] active:text-black">About Us</Link>

        </div>

    
        
        {/* {
          true ?  (
            <span>true</span>
          ) : (
            <span>false</span>
          )
        } */}
        

      </main>

    </div>
    // <nav className="w-full flex justify-center gap-8 p-4 bg-gray-100 dark:bg-gray-900">
    //   <Link href="/home" className="text-blue-600 hover:underline">Home</Link>
    //   <Link href="/aboutus" className="text-blue-600 hover:underline">About Us</Link>
    // </nav>
  );
}