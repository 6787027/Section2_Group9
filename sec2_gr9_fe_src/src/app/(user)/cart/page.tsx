import { AuroraText } from "@/components/ui/aurora-text"
import Image from "next/image";
import ImgOrder from "@/assets/ImageOrder.png"
import { Minus, Plus } from "lucide-react";
export default function Cart() {
  return (
    <div className="flex-col flex items-center min-h-screen p-8 text-ce bg-[#282151]">
      <div className="bg-white flex flex-1 w-full rounded-4xl">
        <div className="pl-10 ">
          <h1 className="pt-10 text-[#240046] text-3xl font-bold">MY CART</h1>
          <div className="pl-20 pt-10">
            <div className="flex gap-40 ">
              <h3>PRODUCT</h3>
              <h3>PRICE</h3>
              <h3>QTY</h3>
              <h3>TOTAL</h3>
            </div>
          </div>
          <hr className="my-4 border-t-2 border-gray-300 w-200" />
          <div className="flex gap-10 text-gray-400">
            <div className="flex gap-5">
              <Image src={ImgOrder} alt="ProductImg" />
              <h2>Hutao Doll</h2>
            </div>
            <h2 className="ml-5">฿590.00</h2>
            <div className="flex gap-5 ml-22 ">
              <button className="border justify-center items-center flex w-4 h-4 ">
                <Minus className="" />
              </button>
              <span>1</span>
              <button className="border flex items-center justify-center w-4 h-4">
                <Plus className="" />
              </button>
            </div>
            

          </div>
          
        </div>
      </div> 
      
      
      
    </div>
  );
}
