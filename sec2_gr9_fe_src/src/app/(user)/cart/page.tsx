'use client'
import React from "react";
import CartItemRow from "@/components/built-components/cartrecord"; // (ต้องมี Component นี้)
import Link from 'next/link';
import { useCart, formatCurrency } from "@/app/context/CartContext";
import { useAuth } from "@/app/context/AuthContext"; // (Import Auth เพื่อเช็ก Login)

export default function Cart() {
  const { user, isLoading: isAuthLoading } = useAuth();
  const { 
    cartItems, 
    summary, 
    updateItemQuantity, 
    toggleItemCheck,
    removeItem, // 1. ดึงฟังก์ชันลบ
    isLoading,
    isCalculating
  } = useCart();
  
  if (isLoading || isAuthLoading) {
    return <div className="text-white p-10 text-center text-xl">Loading Cart...</div>
  }
  
  // (ถ้ายังไม่ Login)
  if (!user) {
    return (
      <div className="flex-col flex min-h-screen p-8 text-center bg-[#282151]">
         <div className="bg-white w-full rounded-4xl p-20">
           <h1 className="text-3xl font-bold text-[#240046]">MY CART</h1>
           <p className="text-xl text-gray-600 mt-4">Please login to view your cart.</p>
           <Link href="/login" className="mt-6 inline-block bg-[#775AC4] text-white p-3 px-8 rounded-lg font-bold">
             Login
           </Link>
         </div>
      </div>
    )
  }

  const loadingText = (<span className="text-sm animate-pulse">...</span>);

  return (
    <div className="flex-col flex min-h-screen p-8 text-ce bg-[#282151] overflow-auto">
      <div className="bg-white w-full rounded-4xl">
        <div className="pl-10 ">
          <h1 className="pt-10 text-[#240046] text-3xl font-bold">MY CART</h1>
          
          {cartItems.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
              <p className="text-2xl">Your cart is empty.</p>
              <Link href="/" className="text-lg text-purple-600 hover:underline">
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="flex flex-row gap-10">
              <table className="w-2/3 text-center mt-10">
                <thead>
                  <tr className="border-b-2 text-[#282151]">
                    <th className="py-2">PRODUCT</th>
                    <th className="py-2">PRICE</th>
                    <th className="py-2">QTY</th>
                    <th className="py-2">TOTAL</th>
                    {/* (คุณอาจจะต้องเพิ่ม TH สำหรับ "ลบ" และ "เลือก") */}
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map(item => (
                    <CartItemRow
                      key={item.id}
                      item={item}
                      onUpdateSelect={updateItemQuantity} // 2. สำหรับเปลี่ยนจำนวน
                      onToggleItem={toggleItemCheck} // 3. สำหรับติ๊กถูก
                      onRemoveItem={removeItem} // 4. (คุณต้องเพิ่มปุ่มลบใน CartItemRow)
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
                    <div className="flex justify-between pl-10 pr-10 pb-5">
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
          )}
        </div>
      </div>
    </div>
  );
}