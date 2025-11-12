'use client';
import { useState } from 'react';
import Link from "next/link";
import Image from "next/image";
import { AuroraText } from "@/components/ui/aurora-text";
import home from "@/assets/Home.svg";
import TarotModal from '@/components/built-components/tarotModal';

export type TarotCard = {
  name: string;
  name_short: string;
  meaning_up: string;
  desc: string;
};

export default function Home() {
  const [card, setCard] = useState<TarotCard | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRandomCard = async () => {
    setIsLoading(true);
    setError(null);
    setCard(null);

    try {
      const response = await fetch("https://tarotapi.dev/api/v1/cards/random?n=1");
      if (!response.ok) {
        throw new Error("Failed to fetch card from API.");
      }
      const data = await response.json();
      
      setCard(data.cards[0]);
      setIsModalOpen(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="bg-[#282151] min-h-screen text-center ">
        <main>
          <div className=" min-h-screen relative w-full h-screen">
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${home.src})` }} > </div>
          </div>

          <div>
            <div className="flex flex-col pt-12 pb-12">
              <span className="text-3xl text-white font-semibold ">"Welcome to an enchanting world,</span>
              <span className="text-3xl text-white font-semibold "> brimming with magical energy that is ready to assist you."</span>
            </div>
          </div>

          <div className="py-12">
            <button
              onClick={handleRandomCard}
              disabled={isLoading}
              className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transform transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Load your future" : "Pick a Card"}
            </button>
            {error && <p className="text-red-400 mt-4">{error}</p>}
          </div>

          <div className="py-8">
            <div className="py-8"><AuroraText className="text-4xl font-bold" colors={["#FFDFEF", "#EABDE6", "#D69ADE", "#AA60C8"]} speed={2} >Recommended Products</AuroraText></div>
            <div className="flex overflow-x-auto py-4 mx-10 flex-row gap-10 item-center justify-center">
              <div className="bg-white p-4 rounded-2xl no-scrollbar ">
                <div>
                  <Image alt="logo" src={"https://i.pinimg.com/736x/eb/63/dd/eb63ddb0fb4c04a9c7bad03671130f18.jpg"} width={250} height={360} className=" rounded-2xl w-full h-full object-cover" />
                </div>
                <div className="text-left flex flex-col pt-2 text-7469B6 text-lg">
                  <span className="font-semibold">Fortuna Doll</span>
                  <span>฿ 590</span>
                </div>
              </div>

              <div className="bg-white p-4 rounded-2xl no-scrollbar ">
                <div>
                  <Image alt="logo" src={"https://i.pinimg.com/736x/eb/63/dd/eb63ddb0fb4c04a9c7bad03671130f18.jpg"} width={250} height={360} className=" rounded-2xl w-full h-full object-cover" />
                </div>
                <div className="text-left flex flex-col pt-2 text-7469B6 text-lg">
                  <span className="font-semibold">Fortuna Doll</span>
                  <span>฿ 590</span>
                </div>
              </div>

              <div className="bg-white p-4 rounded-2xl no-scrollbar ">
                <div>
                  <Image alt="logo" src={"https://i.pinimg.com/736x/eb/63/dd/eb63ddb0fb4c04a9c7bad03671130f18.jpg"} width={250} height={360} className=" rounded-2xl w-full h-full object-cover" />
                </div>
                <div className="text-left flex flex-col pt-2 text-7469B6 text-lg">
                  <span className="font-semibold">Fortuna Doll</span>
                  <span>฿ 590</span>
                </div>
              </div>

              <div className="bg-white p-4 rounded-2xl no-scrollbar ">
                <div>
                  <Image alt="logo" src={"https://i.pinimg.com/736x/eb/63/dd/eb63ddb0fb4c04a9c7bad03671130f18.jpg"} width={250} height={360} className=" rounded-2xl w-full h-full object-cover" />
                </div>
                <div className="text-left flex flex-col pt-2 text-7469B6 text-lg">
                  <span className="font-semibold">Fortuna Doll</span>
                  <span>฿ 590</span>
                </div>
              </div>
            </div>
          </div>
          <div>
          </div>
        </main>
      </div>

      <TarotModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        card={card}
      />
    </>
  );
}