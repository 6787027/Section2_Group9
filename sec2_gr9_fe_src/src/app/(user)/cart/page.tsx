import { AuroraText } from "@/components/ui/aurora-text"
import Image from "next/image";
import ImgOrder from "@/assets/ImageOrder.png"
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
          <hr className="my-4 border-t-2 border-gray-300 w-auto" />
          <div className="flex">
            <Image src={ImgOrder} alt="ProductImg" />
          </div>
          
        </div>
      </div> 
      
      
      
    </div>
  );
}
