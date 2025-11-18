"use client"; // ระบุว่าไฟล์นี้เป็น Client Component

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ProductInfo from "@/components/built-components/productinfo";
import { useCart } from "@/app/context/CartContext";
import { useRouter } from 'next/navigation';

// Interface กำหนดโครงสร้างข้อมูลสินค้าที่รับมาจาก API
interface Product {
  Pic_f: string; // รูปด้านหน้า
  Pic_b: string; // รูปด้านหลัง
  Pic_s: string; // รูปด้านข้าง
  Pro_ID: string;
  Pro_Name: string;
  Pro_Price: number;
  Pro_Type: string;
  Col_Name: string;
  Pro_Description: string;
  Pro_Quantity: number;
}

export default function ProductPage() {
  // ดึงค่า id จาก URL (เช่น /product/1 -> id = 1)
  const { id } = useParams<{ id: string }>();

  // State สำหรับเก็บข้อมูลสินค้าที่ Fetch มาได้
  const [product, setProduct] = useState<Product | null>(null);

  // ดึงฟังก์ชัน addToCart มาจาก CartContext เพื่อใช้เพิ่มสินค้าลงตะกร้า
  const { addToCart } = useCart();

  // สร้าง instance ของ router เพื่อใช้เปลี่ยนหน้า
  const router = useRouter();

  // ทำงานเมื่อ id เปลี่ยนแปลง หรือโหลดหน้าครั้งแรก
  useEffect(() => {
    fetch(`http://localhost:3001/v1/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data)) // บันทึกข้อมูลลง State
      .catch(err => console.log(err)); // แสดง Error ถ้ามีปัญหา
  }, [id]);


  // ฟังก์ชันเมื่อกดปุ่ม "Add to Cart"
  const handleAddToCart = (selectedQuantity: number) => {
    if (product) {
      addToCart(product, selectedQuantity); // เรียก Context function
      alert(`${selectedQuantity} x ${product.Pro_Name} has been added to th cart!`); // แจ้งเตือนผู้ใช้
    }
  };

  // ฟังก์ชันเมื่อกดปุ่ม "Buy Now"
  const handleBuyNow = async (selectedQuantity: number) => {
    if (product) {
      await addToCart(product, selectedQuantity); // เพิ่มลงตะกร้าก่อน
      router.push('/payment'); // แล้วเปลี่ยนหน้าไปที่หน้าชำระเงินทันที
    }
  };

  // Loading State: ถ้ายังไม่มีข้อมูลสินค้า ให้แสดงคำว่า Loading...
  if (!product) return <div className="text-white p-10">Loading...</div>;


  return (
    <div className="bg-[#282151] min-h-screen text-center px-8">
      <main className="flex-1 h-full">
        {/* เรียกใช้ Component ProductInfo และส่ง Props ข้อมูลสินค้าเข้าไป */}
        <ProductInfo
          name={product.Pro_Name}
          price={product.Pro_Price}
          type={product.Pro_Type}
          genre={product.Col_Name}
          quantity={product.Pro_Quantity}
          desc={product.Pro_Description}
          // Mapping รูปภาพ (ระวังเรื่องลำดับการแสดงผลตาม Design)
          img1={product.Pic_s}
          img2={product.Pic_b}
          img3={product.Pic_f}
          // ส่งฟังก์ชัน Handler ไปให้ปุ่มกดภายใน Component
          onAddToCart={handleAddToCart}
          onBuyNow={handleBuyNow}
        />

      </main>
    </div>
  );
}