"use client";
import Image from "next/image";
import Link from "next/link";
import Logo from '@/app/assets/logo.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons'



export default function Footer() {
    return (
        <div>
            <main>
                <div className="footer bg-[#1A0041] w-full h-60  text-white px-10 py-8 flex justify-between">
                    <div className='flex'>
                        <Image alt="logo" src={Logo} width='150' />


                    </div>

                    <div>
                        <h2 className="font-semibold text-xl text-[#A599ED] footer-title">Navigator</h2>
                        <Link href="/home" className="text-sm font-normal text-[#A599ED] link link-hover hover:text-white">Home</Link>
                        <Link href="/featured" className="text-sm font-normal text-[#A599ED] link link-hover hover:text-white">Featured</Link>
                        <Link href="/product" className="text-sm font-normal text-[#A599ED] link link-hover hover:text-white">Product</Link>
                        <Link href="/aboutus" className="text-sm  font-normal text-[#A599ED] link link-hover hover:text-white">About us</Link>
                    </div>

                    <div>
                        <h2 className="font-semibold text-xl text-[#A599ED] footer-title">Contact us</h2>
                        <span className="text-sm font-normal text-[#A599ED]"> Tel :  +66 999 999 999 </span>
                        <span className="text-sm font-normal text-[#A599ED]"> Email : CelesteCraft@gmail.com </span >
                        <span className="text-sm font-normal text-[#A599ED]">Address : ICT Mahidol University  </span >
                    </div>

                    <div>
                        <h2 className="font-semibold text-xl text-[#A599ED] footer-title" >Social</h2>
                        <div className = "flex justify-between ">
                            <div> <FontAwesomeIcon icon={faFacebook} size="xl" /> </div>
                            <div><FontAwesomeIcon icon={faInstagram} size="xl" /></div>
                        </div>

                    </div>
                </div>
            </main>
        </div>
    );
}
