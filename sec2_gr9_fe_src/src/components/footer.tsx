"use client";
import Image from "next/image";
import Link from "next/link";
import Logo from '../assets/logo.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faPinterest } from '@fortawesome/free-brands-svg-icons'



export default function Footer() {
    return (
        <div>
            <main className="w-full flex flex-col justify-center items-center bg-[#1A0041]">
                <div className="footer bg-[#1A0041] w-full h-50  text-white px-10 py-8 flex justify-between max-w-[90rem]">
                    
                    <div className='flex'>
                        <Image alt="logo" src={Logo} width='150' />


                    </div>

                    <div>
                        <h2 className="font-semibold text-xl text-[#A599ED] footer-title">Navigator</h2>
                        <Link href="/home" className="text-sm font-normal text-[#A599ED] link link-hover hover:text-white">Home</Link>
                        <Link href="/featured" className="text-sm font-normal text-[#A599ED] link link-hover hover:text-white">Featured</Link>
                        <Link href="/product" className="text-sm font-normal text-[#A599ED] link link-hover hover:text-white">Product</Link>
                        <Link href="/aboutus" className="text-sm  font-normal text-[#A599ED] link link-hover hover:text-white">About Us</Link>
                    </div>

                    <div>
                        <h2 className="font-semibold text-xl text-[#A599ED] footer-title">Contact us</h2>
                        <span className="text-sm font-normal text-[#A599ED]"> Tel :  +66 999 999 999 </span>
                        <span className="text-sm font-normal text-[#A599ED]"> Email : CelesteCraft@gmail.com </span >
                        <span className="text-sm font-normal text-[#A599ED]">Address : ICT Mahidol University  </span >
                    </div>

                    <div className="flex flex-col items-center justify-center px-6 ">
                        <h2 className="font-semibold text-xl text-[#A599ED] footer-title" >Social</h2>
                        <div className="flex space-x-2 items-center justify-between text-[#A599ED]">
                            <Link href="https://www.pinterest.com/"> <FontAwesomeIcon icon={faPinterest} size="xl" /> </Link>
                            <Link href="https://www.facebook.com/"> <FontAwesomeIcon icon={faFacebook} size="xl" /> </Link>
                            <Link href="https://www.instagram.com/"> <FontAwesomeIcon icon={faInstagram} size="xl"  /> </Link>
                        </div>
                    </div>

                </div>
                
                <div className="bg-[#7469B6] w-full h-8 text-white text-sm  py-2 flex justify-center "> © 2025 Copyright: CelesteCraft.com </div>
                    
            </main>
        </div>
    );
}
