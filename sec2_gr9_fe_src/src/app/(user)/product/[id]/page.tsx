"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ProductInfo from "@/components/built-components/productinfo";

interface Product {
  Pic_f: string;
  Pic_b: string;
  Pic_s: string;
  Pro_ID: number;
  Pro_Name: string;
  Pro_Price: number;
  Pro_Type: string;
  Col_Name: string;
  Pro_Description: string;
  Pro_Quantity: number;
}

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetch(`http://localhost:3001/v1/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data))
      .catch(err => console.log(err));
  }, [id]);

  if (!product) return <div className="text-white p-10">Loading...</div>;

  return (
    <div className="bg-[#282151] min-h-screen text-center px-8">
      <main className="flex-1 h-full">
        <ProductInfo
          name={product.Pro_Name}
          price={product.Pro_Price}
          type={product.Pro_Type}
          genre={product.Col_Name}
          quantity={product.Pro_Quantity}
          desc={product.Pro_Description}
          img1={product.Pic_s}
          img2={product.Pic_b}
          img3={product.Pic_f}
        />
      </main>
    </div>
  );
}
