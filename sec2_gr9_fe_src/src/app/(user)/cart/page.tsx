import { AuroraText } from "@/components/ui/aurora-text"
import Image from "next/image";
import ImgOrder from "@/assets/ImageOrder.png"
import { Minus, Plus } from "lucide-react";
export default function Cart() {
  return (
    <div className="flex-col flex min-h-screen p-8 text-ce bg-[#282151]">
      <div className="bg-white h-screen w-full rounded-4xl">
        <div className="pl-10 ">
          <h1 className="pt-10 text-[#240046] text-3xl font-bold">MY CART</h1>
          <div className="flex flex-row gap-10">
            <div className="w-2/3 pt-10"> 
              <table className="table-fixed w-full">
                <thead className="border-b border-gray-200">
                  <tr>
                    <th className="text-left font-semibold text-[#240046] pb-4 w-2/5">Product</th>
                    <th className="text-left font-semibold text-[#240046] pb-4 w-1/5">Price</th>
                    <th className="text-left font-semibold text-[#240046] pb-4 w-1/5">QTY</th>
                    <th className="text-left font-semibold text-[#240046] pb-4 w-1/5">Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="text-fuchsia-900 align-middle">
                    <td className="flex items-center gap-4">
                      <Image src={ImgOrder} alt="" className="rounded-lg" />
                      <p>Hutao doll</p>
                    </td>
                    <td>
                      <p>฿590.00</p>
                    </td>
                    <td>
                      <div className="flex items-center gap-3">
                        <button className="text-fuchsia-900 hover:text-fuchsia-400">
                          <Minus size={16} />
                        </button>
                        <span className=" text-fuchsia-900">1</span>
                        <button className="text-fuchsia-900 hover:text-fuchsia-400">
                          <Plus size={16} />
                        </button>
                      </div>
                    </td>
                    <td>
                      <div className="flex gap-4 text-fuchsia-900">
                        <p>฿590.00</p>
                        <input type="checkbox" defaultChecked className="form-checkbox h-5 w-5 rounded text-[#775AC4] focus:ring-[#775AC4]" />
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>

            </div>
            <div className="w-1/3 pr-10">
              <div className=" border border-gray-400 rounded-4xl">
                <div className="pb-4 text-center">
                  <h2 className="text-[#240046] font-semibold pt-10">Order Summary</h2>
                  <hr className="mt-4" />
                </div>
                <div className="space-y-1 text-fuchsia-900">
                  <div className="flex justify-between pl-10 pr-10 pb-5 pt-5">
                    <p>Subtotal</p>
                    <p>590.00</p>
                  </div>
                  <div className="flex justify-between pl-10 pr-10 pb-5">
                    <p>Shipping</p>
                    <p>0.00</p>
                  </div>
                  <div className="flex justify-between pl-10 pr-10 pb-5">
                    <p>Total</p>
                    <p>590.00</p>
                  </div>
                  <button className="bg-[#775AC4] text-white p-30 py-3 rounded-xl ml-5 mb-5 font-semibold hover:bg-opacity-90 transition-opacity">
                  Pay Now
                </button>

                </div>
              </div>
            </div>


          </div>

        </div>
      </div> 
      
      
      
    </div>
  );
}
