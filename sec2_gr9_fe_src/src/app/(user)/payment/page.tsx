"use client"

import Image from "next/image";
import ImgOrder from "@/assets/ImageOrder.png"
import Visa from "@/assets/visa.svg"
import QR from "@/assets/qr.png"
import { Minus, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import QRModal from "@/components/QRModal";
import { useAuth } from "@/app/context/AuthContext";
import { CartItemType, formatCurrency, useCart } from "@/app/context/CartContext";
import { SuccessPaymentModal } from "@/components/SuccessPaymentModal";

export default function Payment() {
  const { user, token, isLoading: isAuthLoading } = useAuth();

  const [method, setMethod] = useState<'qr' | 'visa' | null>("qr")
  const [modalShown, setShowModalShown] = useState<'qr' | 'visa' | null>(null)
  const [count, setCount] = useState(1)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const [name, setName] = useState("")
  const [tel, setTel] = useState("")
  const [address, setAddress] = useState("")

  const [paymentSuccess, setPaymentSuccess] = useState(false)

  const {
    cartItems,
    summary,
    updateItemQuantity,
  } = useCart();

  const handleBtn = () => {
    setShowModalShown(method)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const res = await fetch('http://localhost:3001/v1/payment', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        email: user?.email,
        price: summary.total,
        address: address
      })
    })

    if(res.status === 201) {
      if(method === 'visa')
        setPaymentSuccess(true)
    }
  }

  useEffect(() => {
    if(paymentSuccess) {
      setShowModalShown(null)
    }
  }, [paymentSuccess])

  const handleQuantityChange = (item: CartItemType, newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity !== item.selectedItem) {
      updateItemQuantity(item.id, newQuantity);
    }
  };

  const isFormFilled = name && tel && address

  return (
    <div className="bg-[#282151] flex flex-col items-center justify-center min-h-screen p-8 relative">
      <div className="bg-white flex flex-1 w-full rounded-4xl">
        <div className="p-8 flex flex-col flex-1">

          <span className="text-[#240046] text-2xl font-bold font-instrument-sans">YOUR ORDER</span>
          {/*Order Product*/}
          {cartItems.map(item => (
            <div className="pt-4 flex gap-8" key={item.id}>
              <Image src={item.imageSrc} alt="ProductImg" width={80}
                height={80}
                className="rounded-lg object-cover" />
              <div>
                <span className="text-[#7469B6] font-bold font-instrument-sans">{item.name}</span><br />
                <span className="text-[#9A9A9A]">$ {item.price}</span>
              </div>
              <div className="flex justify-center items-center gap-4 h-fit">
                <button
                  type="button"
                  className="border border-solid border-[#E8E6FB] justify-center items-center flex w-4 h-4"
                  onClick={() => handleQuantityChange(item, item.selectedItem - 1)}
                  disabled={item.selectedItem <= 1}
                >
                  <Minus />
                </button>

                <span id="quan">{item.selectedItem}</span>

                <button
                  type="button"
                  className="border border-solid border-[#E8E6FB] justify-center items-center flex w-4 h-4"
                  onClick={() => handleQuantityChange(item, item.selectedItem + 1)}
                >
                  <Plus />
                </button>

              </div>
            </div>
          ))}
          <div>
            <hr className="my-6" />
          </div>
          <div className="flex justify-between items-center text-[#7469B6]">
            <div className="flex flex-col">
              <span>Subtotal</span>
              <span>Shipping</span>
              <span>Total</span>
            </div>
            <div className="flex flex-col items-end">
              <span>{formatCurrency(summary.subtotal)}</span>
              <span>{formatCurrency(summary.shipping)}</span>
              <span>{formatCurrency(summary.total)}</span>
            </div>
          </div>
        </div>
        <div className="p-8 flex flex-col flex-1">
          <form className="flex" onSubmit={handleSubmit}>
            <fieldset className="flex flex-1">
              <legend className="border-base-300 rounded-box p-4 flex flex-col gap-2 w-full max-w-[24rem]">
                <span className="text-[#240046] font-semibold font-instrument-sans">SHIPPING DETAILS</span>
                <label className="label text-[#7469B6] font-instrument-sans">Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="input rounded-2xl border w-full" required />
                <label className="label text-[#7469B6] font-instrument-sans">Phone Number</label>
                <input type="tel" value={tel} onChange={(e) => setTel(e.target.value)} className="input rounded-2xl border w-full" required />
                <label className="label text-[#7469B6] font-instrument-sans">Address Details</label>
                <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} className="input rounded-2xl border w-full" required />
                <div className="flex flex-col gap-2 pt-2 mb-4">
                  <span className="text-[#240046] font-semibold font-instrument-sans">PAYMENT DETAILS</span>
                  <div className="flex gap-2">
                    <button className={`cursor-pointer h-12 py-1 px-8 rounded-full border shadow-2xl flex items-center justify-center hover:bg-neutral-200 transition-all duration-200 ${method === 'visa' ? 'bg-neutral-100' : ''}`} onClick={() => setMethod('visa')}>
                      <Image src={Visa} width={48} alt="visa" />
                    </button>
                    <button className={`cursor-pointer h-12 py-1 px-8 rounded-full border shadow-2xl flex items-center justify-center hover:bg-neutral-200 transition-all duration-200 ${method === 'qr' ? 'bg-neutral-100' : ''}`} onClick={() => setMethod('qr')}>
                      <Image src={QR} width={48} alt="qr" />
                    </button>
                  </div>
                </div>

                {method === 'visa' && (
                  <>
                    <label className="label text-[#7469B6] font-instrument-sans">Name on Card</label>
                    <input type="text" className="input rounded-2xl border w-full" required />
                    <label className="label text-[#7469B6] font-instrument-sans">Card Number</label>
                    <input type="number" className="input rounded-2xl border w-full" required />
                    <div className="flex gap-2">
                      <div>
                        <label className="label text-[#7469B6] font-instrument-sans">Valid Through</label>
                        <input type="date" className="input rounded-2xl border" required />
                      </div>

                      <div>
                        <label className="label text-[#7469B6] font-instrument-sans">CVV</label>
                        <input type="number" className="input rounded-2xl border" required />
                      </div>
                    </div>
                  </>
                )}

                <button type="submit" disabled={!isFormFilled} onClick={() => handleBtn()} className="mt-4 cursor-pointer bg-[#7b6fe6] hover:bg-[#7469B6] disabled:bg-gray-400 disabled:cursor-not-allowed hover:text-white rounded-2xl p-2 flex justify-center items-center text-white">Pay Now</button>
              </legend>
            </fieldset>
          </form>
        </div>
      </div>

      {modalShown === 'qr' && (
        <QRModal setSuccess={setPaymentSuccess} setModalShown={setShowModalShown} />
      )}

      {paymentSuccess && (
        <SuccessPaymentModal setModalShown={setPaymentSuccess} />
      )}
    </div>
  );
}