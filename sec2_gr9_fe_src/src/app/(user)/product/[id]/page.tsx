"use client"
import { Minus, Plus } from "lucide-react";
import ProductInfo from "@/components/built-components/productinfo"
import ImgOrder from "@/assets/ImageOrder.png"
import Link from "next/link";
import { notFound, useParams } from "next/navigation";

const ALL_PRODUCTS = [
  { id: 1, name: "Hutao Doll", price: 500.00, genre: "Game", type: "Doll", character: "hutao", url: ImgOrder, quantity: 705, desc:"I am groot" },
  { id: 2, name: "Stelle - Star Collection", price: 500.00, genre: "Game", type: "Accessory", character: "Stelle", url: ImgOrder, quantity: 70, desc:"I am groot" },
  { id: 3, name: "Another Doll", price: 200.00, genre: "Anime", type: "Doll", character: "annabell", url: ImgOrder, quantity: 159, desc:"I am groot"  },
  { id: 4, name: "Hutao Doll", price: 500.00, genre: "Game", type: "Accessory", character: "hutao", url: ImgOrder, quantity: 60, desc:"I am groot"  },
  { id: 5, name: "Stelle - Star Collection", price: 500.00, genre: "Game", type: "Doll", character: "Stelle", url: ImgOrder, quantity: 25, desc:"I am groot" },
  { id: 6, name: "Another Doll", price: 200.00, genre: "Anime", type: "Accessory", character: "annabell", url: ImgOrder, quantity: 23, desc:"I am groot" },
  { id: 7, name: "Hutao Doll", price: 500.00, genre: "Game", type: "Doll", character: "hutao", url: ImgOrder, quantity: 2, desc:"I am groot" },
  { id: 8, name: "Stelle - Star Collection", price: 500.00, genre: "Game", type: "Accessory", character: "Stelle", url: ImgOrder, quantity: 150, desc:"I am groot"},
  { id: 9, name: "Another Doll", price: 200.00, genre: "Anime", type: "Doll", character: "annabell", url: ImgOrder, quantity: 200, desc:"I am groot" }
];

export default function Product() {
    const { id } = useParams<{id: string}>();

    const numericId = parseInt(id, 10);
    const product = ALL_PRODUCTS.find(p => p.id === numericId);

    if (!product) {
        notFound();

    }

  return (
    <div className="bg-[#282151]  min-h-screen  text-center px-8">
        <main className="flex-1 h-screen">
            <div>
                <ProductInfo
                  key={product.id}
                  name={product.name}
                  price={product.price}
                  imageUrl={product.url.src}
                  type={product.type}
                  genre={product.genre}
                  quantity={product.quantity}
                  desc={product.desc}
                />
            </div>
        </main>
    </div>
  );
}