"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ProductInfo from "@/components/built-components/productinfo";
import { useCart } from "@/app/context/CartContext";
import { useRouter } from 'next/navigation';

interface Product {
  Pic_f: string;
  Pic_b: string;
  Pic_s: string;
  Pro_ID: string;
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
  const { addToCart } = useCart();
  const router = useRouter();

  useEffect(() => {
    fetch(`http://localhost:3001/v1/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data))
      .catch(err => console.log(err));
  }, [id]);

  const handleAddToCart = (selectedQuantity: number) => {
    if (product) {
      addToCart(product, selectedQuantity);
      alert(`${selectedQuantity} x ${product.Pro_Name} ถูกเพิ่มลงในตะกร้าแล้ว!`);
    }
  };

  const handleBuyNow = async (selectedQuantity: number) => {
    if (product) {
      await addToCart(product, selectedQuantity);
      router.push('/payment');
    }
  };

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
          onAddToCart={handleAddToCart}
          onBuyNow={handleBuyNow}
        />
        
        
      </main>
    </div>
  );
}
