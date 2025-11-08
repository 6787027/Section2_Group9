'use client'
import { useState, useEffect } from "react";
import Image, { StaticImageData } from "next/image";
import ImgOrder from "@/assets/ImageOrder.png"
import React from "react";
import CartItemRow from "@/components/built-components/cartrecord";
import Link from 'next/link';

type CartItemType = {
  id: number;
  name: string;
  price: number;
  collection: string;
  type: string;
  character: string;
  imageSrc: StaticImageData | string;
  selectedItem: number;
  check: boolean;
};

const MOCK_PRODUCTS: CartItemType[] = [
  { id: 1, name: "Hutao Doll", price: 500, collection: "Game", type: "Doll", character: "hutao", imageSrc: ImgOrder, selectedItem: 1, check: true },
  { id: 2, name: "Stelle Doll", price: 200, collection: "Game", type: "Doll", character: "stelle", imageSrc: ImgOrder, selectedItem: 2, check: false }
];

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('th-TH', {
    style: 'currency',
    currency: 'THB',
    minimumFractionDigits: 2,
  }).format(amount);
};


export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItemType[]>(MOCK_PRODUCTS);

  const [summary, setSummary] = useState({
    subtotal: 0,
    shipping: 0,
    total: 0
  });

  function fetchCalculation(itemsToCalc: CartItemType[]) {
    const payload = itemsToCalc.map(item => ({
      price: item.price,
      selectedItem: item.selectedItem,
      check: item.check
    }));

    const fetchURL = 'http://localhost:3001/api/cart/calculate';

    fetch(fetchURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(res => res.json())
      .then(data => {
        setSummary(data);
      })
      .catch(err => console.error("Error fetching calculation:", err));
  };

  useEffect(() => {
    fetchCalculation(cartItems);
  }, [cartItems]);


  function handleUpdateSelect(id: number, newSelectedItem: number) {
    if (newSelectedItem < 1) return;
    setCartItems(currentItems =>
      currentItems.map(item =>
        item.id === id ? { ...item, selectedItem: newSelectedItem } : item
      )
    );
  };

  function handleToggleItem(id: number) {
    setCartItems(currentItems =>
      currentItems.map(item =>
        item.id === id ? { ...item, check: !item.check } : item
      )
    );
  };

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
                    onUpdateSelect={handleUpdateSelect}
                    onToggleItem={handleToggleItem}
                  />
                ))}
              </tbody>
            </table>

            <div className="w-1/3 pr-10 sticky top-10">
              <div className="  border-gray-200 border-2 rounded-4xl">
                <div className="pb-4 text-center border-b-2">
                  <h2 className="text-[#240046] font-bold pt-10">ORDER SUMMARY</h2>
                </div>
                <div className="space-y-1 text-[#7469B6]">

                  <div className="flex justify-between pl-10 pr-10 pb-5 pt-5">
                    <p>Subtotal</p>
                    <p>{formatCurrency(summary.subtotal)}</p>
                  </div>
                  <div className="flex justify-between pl-10 pr-10 pb-5">
                    <p>Shipping</p>
                    <p>{formatCurrency(summary.shipping)}</p>
                  </div>
                  <div className="flex justify-between pl-10 pr-10 pb-5">
                    <p>Total</p>
                    <p>{formatCurrency(summary.total)}</p>
                  </div>
                  <Link href="/payment">
                    <button className="bg-[#775AC4] text-white p-30 py-3 rounded-xl ml-5 mb-5 font-semibold hover:bg-opacity-90 transition-opacity">
                      Pay Now
                    </button>
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}