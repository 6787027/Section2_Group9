import Link from "next/link";
import Image from "next/image";
import { AuroraText } from "@/components/ui/aurora-text"
import home from "@/assets/Home.svg"


export default function Home() {
  return (
    <div className="bg-[#282151]  min-h-screen  text-center ">
      <main>
        {/* Ad  */}
        <div className=" min-h-screen relative w-full h-screen">

          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${home.src})` }} > </div>

        </div>
        {/* text  */}
        <div>
          <div className="flex flex-col pt-12 pb-24"> 
            <span className="text-3xl text-white font-semibold ">"Welcome to an enchanting world,</span>
            <span className="text-3xl text-white font-semibold "> brimming with magical energy that is ready to assist you."</span>
          </div>
        </div>
        {/* product  */}
        <div className="py-8">

          <div className="py-8"><AuroraText className="text-4xl font-bold  " colors={["#FFDFEF", "#EABDE6", "#D69ADE", "#AA60C8"]} speed={2} >Recommended Products</AuroraText></div>

          <div className="flex overflow-x-auto  py-4 mx-10 flex-row gap-10 item-center justify-center">

            <div className="bg-white p-4 rounded-2xl no-scrollbar ">
              {/* image  */}
              <div>
                <Image alt="logo" src={"https://i.pinimg.com/736x/eb/63/dd/eb63ddb0fb4c04a9c7bad03671130f18.jpg"} width={250} height={360} className=" rounded-2xl w-full h-full object-cover" />
              </div>
              { /* text  */}
              <div className="text-left flex flex-col pt-2 text-7469B6 text-lg">
                <span className="font-semibold">Fortuna Doll</span>
                <span>฿ 590</span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl no-scrollbar ">
              {/* image  */}
              <div>
                <Image alt="logo" src={"https://i.pinimg.com/736x/eb/63/dd/eb63ddb0fb4c04a9c7bad03671130f18.jpg"} width={250} height={360} className=" rounded-2xl w-full h-full object-cover" />
              </div>
              { /* text  */}
              <div className="text-left flex flex-col pt-2 text-7469B6 text-lg">
                <span className="font-semibold">Fortuna Doll</span>
                <span>฿ 590</span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl no-scrollbar ">
              {/* image  */}
              <div>
                <Image alt="logo" src={"https://i.pinimg.com/736x/eb/63/dd/eb63ddb0fb4c04a9c7bad03671130f18.jpg"} width={250} height={360} className=" rounded-2xl w-full h-full object-cover" />
              </div>
              { /* text  */}
              <div className="text-left flex flex-col pt-2 text-7469B6 text-lg">
                <span className="font-semibold">Fortuna Doll</span>
                <span>฿ 590</span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl no-scrollbar ">
              {/* image  */}
              <div>
                <Image alt="logo" src={"https://i.pinimg.com/736x/eb/63/dd/eb63ddb0fb4c04a9c7bad03671130f18.jpg"} width={250} height={360} className=" rounded-2xl w-full h-full object-cover" />
              </div>
              { /* text  */}
              <div className="text-left flex flex-col pt-2 text-7469B6 text-lg">
                <span className="font-semibold">Fortuna Doll</span>
                <span>฿ 590</span>
              </div>
            </div>




          </div>


        </div>


        {/* Celeste Craft  */}
        <div>

        </div>

      </main>
    </div>
  );
}
