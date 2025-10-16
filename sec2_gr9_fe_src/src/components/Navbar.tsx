"use client";
import Image from "next/image";
import Link from "next/link";
import Logo from '../assets/logo-navbar.svg'
import { faSearch,faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Navbar() {
  return (
    <div >
      <main>
        <div className="bg-white w-full h-10 text-white  px-6 flex justify-between border border-b-gray-200 z-30">

          <Image alt="logo-nav" src={Logo} width='180' className="float-left"/>

          <div className="flex justify-items-end bg-white rounded-4xl  mr-10  w-80  border-2 border-gray-200 my-1">
            <input 
              className="text-black rounded-4xl pl-2 w-68 pl-8 outline-none"
              placeholder="Search"
            ></input>
            <a href="/home"><FontAwesomeIcon icon={faSearch} className="text-black ml-2"/>  </a>
          </div>


          <div>
             <a href="https://www.pinterest.com/"> <FontAwesomeIcon icon={faUser} size="xl" className="text-black " /> </a>
          </div>

        </div>

        <div className="bg-white w-full h-10 z-20 shadow-xl" >
          fesfesffesfesfs
        </div>
        

      </main>

    </div>
    // <nav className="w-full flex justify-center gap-8 p-4 bg-gray-100 dark:bg-gray-900">
    //   <Link href="/home" className="text-blue-600 hover:underline">Home</Link>
    //   <Link href="/aboutus" className="text-blue-600 hover:underline">About Us</Link>
    // </nav>
  );
}
