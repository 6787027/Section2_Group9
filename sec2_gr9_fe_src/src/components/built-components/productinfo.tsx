'use client'; // ระบุว่าเป็น Client Component (ทำงานฝั่ง Browser)
import { Minus, Plus } from "lucide-react";
import Link from 'next/link';
import { useState } from "react";


// Interface กำหนด Props ที่ Component นี้ต้องรับเข้ามา
// ประกอบด้วยข้อมูลสินค้า และฟังก์ชัน Callback สำหรับการกดปุ่ม
interface ProductInfo {
    name: string
    price: number
    type: string
    genre: string
    quantity: number
    desc: string
    img1: string
    img2: string
    img3: string
    // ฟังก์ชัน Callback เมื่อกดปุ่ม Add to Cart และ Buy Now โดยรับจำนวนที่เลือกไปด้วย
    onAddToCart: (selectedQuantity: number) => void;
    onBuyNow: (selectedQuantity: number) => void;
};

export default function ProductInfo({ name, price, type, genre, quantity, desc, img1, img2, img3, onAddToCart, onBuyNow }: ProductInfo) {
    // State สำหรับเก็บจำนวนสินค้าที่ลูกค้าเลือกจะซื้อ (ค่าเริ่มต้นคือ 1)
    const [count, setCount] = useState(1);

    return (
        <div className="min-h-screen  text-center px-8">
            <main className="flex flex-col">
                <div className="mt-10 flex flex-row justify-center">

                    {/* ส่วนแสดงรูปภาพ (Images Section) */}
                    <div className="flex">
                        {/* รูปภาพขนาดเล็กด้านซ้าย 2 รูป */}
                        <div>
                            <div className="p-1 bg-white my-5 mr-2 rounded-lg">
                                <img
                                    src={img1}
                                    width={100}
                                    alt={name} />

                            </div>
                            <div className="p-1 bg-white my-5 mr-2 rounded-lg">
                                <img
                                    src={img2}
                                    width={100}
                                    alt={name} />

                            </div>
                        </div>

                    </div>

                    {/* รูปภาพใหญ่ตรงกลาง และคำอธิบาย (Description Section) */}
                    <div>
                        {/* รูปภาพหลักขนาดใหญ่ */}
                        <div className="bg-white p-1 my-5 ml-5 rounded-sm">
                            <img
                                src={img3}
                                width={320}
                                alt={name} />

                        </div>

                        {/* หัวข้อ Description */}
                        <h1 className="ml-5 text-xl text-white font-bold text-start mt-15">
                            Description
                        </h1>
                        {/* เนื้อหา Description */}
                        <div className="max-w-80">
                            <p className="break-all ml-5 mt-5 mb-5 text-white max-w-screen text-start">
                                {desc}
                            </p>
                        </div>

                    </div>

                    {/* ส่วนแสดงข้อมูลสินค้า ราคา และปุ่มสั่งซื้อ (Details & Actions Section) */}
                    <div className=" justify-items-start mt-5 ml-10 flex flex-col text-left">

                        {/* ชื่อสินค้า */}
                        <div className="text-3xl mb-3 text-white">
                            {name}
                        </div>

                        {/* Badges แสดงประเภทและหมวดหมู่ */}
                        <div className="mb-7">
                            <div className="badge badge-outline bg-pink-200 px-4 mr-2">{type}</div>
                            <div className="badge badge-outline bg-purple-200 px-3">{genre}</div>
                        </div>

                        {/* แสดงราคาและจำนวนสินค้าคงเหลือ */}
                        <div className="flex flex-row mb-17 text-[#C8C4EE]">
                            <div className="text-2xl self-end">
                                ฿ {price}
                            </div>
                            <div className="px-5 text-2xl self-end">|</div>
                            <div className="text-l self-end">
                                {quantity} left
                            </div>
                        </div>


                        {/* ส่วนตัวเลือกจำนวนสินค้า (Quantity Selector) */}
                        <div className="mb-6 text-[#E8E6FB]">
                            <div className="mb-2">Quantity</div>
                            <div className="flex justify-start items-center gap-5 h-fit">
                                {/* ปุ่มลดจำนวน (-): ลดได้ต่ำสุดเหลือ 1 */}
                                <button
                                    type="button"
                                    className="border-1 border-solid border-[#E8E6FB] justify-center items-center flex w-4 h-4"
                                    onClick={() => setCount(prev => Math.max(1, prev - 1))}
                                >
                                    <Minus />
                                </button>

                                {/* แสดงตัวเลขจำนวนปัจจุบัน */}
                                <span id="quan">{count}</span>

                                {/* ปุ่มเพิ่มจำนวน (+): เพิ่มทีละ 1 */}
                                <button
                                    type="button"
                                    className="border-1 border-solid border-[#E8E6FB] justify-center items-center flex w-4 h-4"
                                    onClick={() => setCount(prev => prev + 1)}
                                >
                                    <Plus />
                                </button>

                            </div>
                        </div>

                        {/* ปุ่ม Action Buttons: Add to Cart และ Buy Now */}
                        <div className="flex justify-start">
                            {/* ปุ่ม Add to Cart: จะเรียก onAddToCart เมื่อคลิก */}
                            <button type="button"
                                className="border-white bg-white text-[#282151] rounded-xl p-3 shadow-xl font-bold text-lg disabled:opacity-50"
                                onClick={() => onAddToCart(count)}
                                disabled={quantity === 0}>Add to Cart</button>

                            <div className="m-4"></div>

                            {/* ปุ่ม Buy Now: จะเรียก onBuyNow เมื่อคลิก */}
                            <button type="button" className="border-[#E00303] bg-[#E00303] text-white rounded-xl py-3 px-6 shadow-xl font-bold text-lg"
                                onClick={() => onBuyNow(count)}
                                disabled={quantity === 0}>Buy Now</button>
                        </div>
                    </div>
                    <div className="m-15"></div>
                </div>
            </main>
        </div>
    );
}