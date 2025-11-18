'use client'
import React from "react";
import Link from 'next/link'; 
import { useAuth } from "@/app/context/AuthContext";//เรียกใช้ usestate ที่เกี่ยวข้องกับ authentication
import { useCart, formatCurrency } from "@/app/context/CartContext"; //เรียกใช้ usestate ที่เกี่ยวข้องกับ cart
import CartItemRow from "@/components/built-components/cartrecord"; //import component จาก cartrecord

export default function Cart() {
  // function ไว้แสดงผลหน้า cart โดรจะต้องมีการยืนยัน token และการ map ข้อมูลตะกร้าที่ได้มาจากฐานข้อมูลที่ตรงกับผู้ใช้
  const { user, isLoading: isAuthLoading } = useAuth(); 
  
  const { 
    cartItems, 
    summary, 
    updateItemQuantity, 
    toggleItemCheck,
    removeItem, 
    isLoading: isCartLoading,
    isCalculating
  } = useCart();
  
  if (isAuthLoading || isCartLoading) {
    return (
      <div className="flex-col flex min-h-screen p-8 text-center justify-center items-center bg-[#282151]">
        <div className="text-white text-2xl animate-pulse">Loading Cart...</div>
      </div>
    );
  }
  
  if (!user)  {// ถ้าไม่พบ token ให้ไป login ก่อน
    return (
      <div className="flex-col flex min-h-screen p-8 text-center bg-[#282151]">
         <div className="bg-white w-full rounded-4xl p-20">
           <h1 className="text-3xl font-bold text-[#240046]">MY CART</h1>
           <p className="text-xl text-gray-600 mt-4">Please login to view your cart.</p>
           <Link href="/login" className="mt-6 inline-block bg-[#775AC4] text-white p-3 px-8 rounded-lg font-bold hover:bg-opacity-90 transition">
             Login
           </Link>
         </div>
      </div>
    );
  }

  if (cartItems.length === 0) { // cart items ว่างจะให้ไป shopping ก่อน
    return (
      <div className="flex-col flex min-h-screen p-8 text-ce bg-[#282151]">
        <div className="bg-white w-full rounded-4xl">
          <div className="pl-10 ">
            <h1 className="pt-10 text-[#240046] text-3xl font-bold">MY CART</h1>
            <div className="text-center py-20 text-gray-500">
              <p className="text-2xl">Your cart is empty.</p>
              <Link href="/product" className="text-lg text-purple-600 hover:underline">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const loadingText = (<span className="text-sm animate-pulse">Calculating...</span>);

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
                  <th className="py-2">REMOVE</th>
                </tr>
              </thead>
              <tbody> 
                {cartItems.map(item => (
                  <CartItemRow
                    key={item.id}
                    item={item}
                    onUpdateSelect={updateItemQuantity}
                    onToggleItem={toggleItemCheck}
                    onRemoveItem={removeItem} 
                  />
                ))} 
              </tbody>
            </table>

            <div className="w-1/3 pr-10 sticky top-10">
              <div className="border-gray-200 border-2 rounded-4xl">
                <div className="pb-4 text-center border-b-2">
                  <h2 className="text-[#240046] font-bold pt-10">ORDER SUMMARY</h2>
                </div>
                <div className="space-y-1 text-[#7469B6]">
                  <div className="flex justify-between pl-10 pr-10 pb-5 pt-5">
                    <p>Subtotal</p>
                    <p>{isCalculating ? loadingText : formatCurrency(summary.subtotal)}</p>
                  </div>
                  <div className="flex justify-between pl-10 pr-10 pb-5">
                    <p>Shipping</p>
                    <p>{isCalculating ? loadingText : formatCurrency(summary.shipping)}</p>
                  </div>
                  <div className="flex justify-between pl-10 pr-10 pb-5 font-bold text-[#240046]">
                    <p>Total</p>
                    <p>{isCalculating ? loadingText : formatCurrency(summary.total)}</p>
                  </div>
                  
                  <Link href="/payment">
                    <button 
                      className="bg-[#775AC4] text-white p-30 py-3 rounded-xl ml-5 mb-5 font-semibold hover:bg-opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={summary.total === 0 || isCalculating}
                    >
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