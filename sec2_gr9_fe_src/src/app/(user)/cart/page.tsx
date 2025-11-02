'use client'
import { useState } from "react";
import Image, { StaticImageData } from "next/image"; // 1. Import StaticImageData
import ImgOrder from "@/assets/ImageOrder.png"
import React from "react";
import CartItemRow from "@/components/built-components/cartrecord";

type CartItemType = {
  id: number;
  name: string;
  price: number;
  genre: string;
  type: string;
  character: string;
  imageSrc: StaticImageData | string;
  quantity: number;
  isChecked: boolean;
};

const ALL_PRODUCTS: CartItemType[] = [
  { id: 1, name: "Hutao Doll", price: 500, genre: "Game", type: "Love", character: "hutao", imageSrc: ImgOrder, quantity: 1, isChecked: false },
  { id: 2, name: "Stelle - Star Collection", price: 500, genre: "Game", type: "Luck", character: "Stelle", imageSrc: ImgOrder, quantity: 1, isChecked: false },
  { id: 3, name: "Another Doll", price: 200, genre: "Anime", type: "Love", character: "annabell", imageSrc: ImgOrder, quantity: 1, isChecked: false },
  { id: 4, name: "Hutao Doll", price: 500, genre: "Game", type: "Love", character: "hutao", imageSrc: ImgOrder, quantity: 1, isChecked: false },
  { id: 5, name: "Stelle - Star Collection", price: 500, genre: "Game", type: "Luck", character: "Stelle", imageSrc: ImgOrder, quantity: 1, isChecked: false },
  { id: 6, name: "Another Doll", price: 200, genre: "Anime", type: "Love", character: "annabell", imageSrc: ImgOrder, quantity: 1, isChecked: false },
  { id: 7, name: "Hutao Doll", price: 500, genre: "Game", type: "Love", character: "hutao", imageSrc: ImgOrder, quantity: 1, isChecked: false },
  { id: 8, name: "Stelle - Star Collection", price: 500, genre: "Game", type: "Luck", character: "Stelle", imageSrc: ImgOrder, quantity: 1, isChecked: false },
  { id: 9, name: "Another Doll", price: 200, genre: "Anime", type: "Love", character: "annabell", imageSrc: ImgOrder, quantity: 1, isChecked: false }
];

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('th-TH', {
    style: 'currency',
    currency: 'THB',
    minimumFractionDigits: 2,
  }).format(amount);
};


export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItemType[]>(ALL_PRODUCTS);

  const handleUpdateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems(currentItems =>
      currentItems.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleToggleItem = (id: number) => {
    setCartItems(currentItems =>
      currentItems.map(item =>
        item.id === id ? { ...item, isChecked: !item.isChecked } : item
      )
    );
  };

  const subtotal = cartItems.reduce((acc: number, item: CartItemType) => {
    if (item.isChecked) {
      return acc + (item.price * item.quantity);
    }
    return acc;
  }, 0);

  const shipping = 0.00;
  const total = subtotal + shipping;

  return (
    <div className="flex-col flex min-h-screen p-8 text-ce bg-[#282151] overflow-auto">
      <div className="bg-white w-full rounded-4xl">
        <div className="pl-10 ">
          <h1 className="pt-10 text-[#240046] text-3xl font-bold">MY CART</h1>
          <div className="flex flex-row gap-10">

            <table className="w-2/3 text-center mt-10">
              <thead>
                <tr className="border-b-2 text-[#282151]">
                  <th className="py-2">PRODUCT</th>
                  <th className="py-2">PRICE</th>
                  <th className="py-2">QTY</th>
                  <th className="py-2">TOTAL</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map(item => (
                  <CartItemRow
                    key={item.id}
                    item={item}
                    onUpdateQuantity={handleUpdateQuantity}
                    onToggleItem={handleToggleItem}
                  />
                ))}
              </tbody>
            </table>

            <div className="w-1/3 pr-10 sticky top-10">
              <div className="  border-gray-200 border-2 rounded-4xl">
                <div className="pb-4 text-center border-b-2">
                  <h2 className="text-[#240046] font-bold pt-10">ORDER SUMMARY</h2>
                </div>
                <div className="space-y-1 text-[#7469B6]">
                  
                  <div className="flex justify-between pl-10 pr-10 pb-5 pt-5">
                    <p>Subtotal</p>
                    <p>{formatCurrency(subtotal)}</p>
                  </div>
                  <div className="flex justify-between pl-10 pr-10 pb-5">
                    <p>Shipping</p>
                    <p>{formatCurrency(shipping)}</p>
                  </div>
                  <div className="flex justify-between pl-10 pr-10 pb-5">
                    <p>Total</p>
                    <p>{formatCurrency(total)}</p>
                  </div>
                  <a href="/payment">
                    <button className="bg-[#775AC4] text-white p-30 py-3 rounded-xl ml-5 mb-5 font-semibold hover:bg-opacity-90 transition-opacity">
                      Pay Now
                    </button>
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}