'use client';
import { useContext, useEffect, useState } from 'react';
import Link from "next/link";
import Image from "next/image";
import { AuroraText } from "@/components/ui/aurora-text";
import home from "@/assets/Home.svg";
import TarotModal from '@/components/built-components/tarotModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
 
// Define the TarotCard type based on the expected API response
export type TarotCard = {
    name: string;
    name_short: string;
    meaning_up: string;
    desc: string;
};

// Main Home component
export default function Home() {
    const [card, setCard] = useState<TarotCard | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

// Function to handle fetching a random tarot card
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
         {/* Main container with background and centering */}
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

                    {/* Recommended Products Section */}
                    <div className="py-2">
                        <div className="py-2"><AuroraText className="text-4xl font-bold" colors={["#FFDFEF", "#EABDE6", "#D69ADE", "#AA60C8"]} speed={2} >Recommended Products</AuroraText></div>
                    {/* Product Cards Container */}
                        <div className="flex overflow-x-scroll py-2 gap-8 mx-auto max-w-7xl">
                        {/* Product Card 1 */}
                            <Link href="http://localhost:3000/product/DS00003" className="hover:text-[#A599ED] active:text-black text-2xl" > 
                            <div className="bg-white p-4 rounded-2xl shrink-0 w-72 h-110">
                                <div>
                                    <Image alt="logo" src={"https://i.pinimg.com/736x/57/24/7f/57247fb4206d5a5a209ccdb26f469462.jpg"} width={250} height={360} className=" rounded-2xl w-full h-full object-cover" />
                                </div>
                                <div className="text-left flex flex-col pt-2 text-7469B6 text-lg">
                                    <span className="font-semibold">Chang'e Doll</span>
                                    <span>฿ 590</span>
                                </div>
                            </div>
                            </Link>
                        {/* Product Card 2 */}
                             <Link href="http://localhost:3000/product/DS00007" className="hover:text-[#A599ED] active:text-black text-2xl" > 
                            <div className="bg-white p-4 rounded-2xl shrink-0 w-72 h-110">
                                <div>
                                    <Image alt="logo" src={"https://i.pinimg.com/736x/f0/ff/77/f0ff7791d1b75ef6d05c06bd396e55bd.jpg"} width={250} height={360} className=" rounded-2xl w-full h-full object-cover" />
                                </div>
                                <div className="text-left flex flex-col pt-2 text-7469B6 text-lg">
                                    <span className="font-semibold">Isis Doll</span>
                                    <span>฿ 590</span>
                                </div>
                            </div>
                            </Link>
                        {/* Product Card 3 */}
                             <Link href="http://localhost:3000/product/DS00006" className="hover:text-[#A599ED] active:text-black text-2xl" > 
                            <div className="bg-white p-4 rounded-2xl shrink-0 w-72 h-110">
                                <div>
                                    <Image alt="logo" src={"https://i.pinimg.com/736x/4f/74/4f/4f744f6dab471c1ee10f596338d6d94b.jpg"} width={250} height={360} className=" rounded-2xl w-full h-full object-cover" />
                                </div>
                                <div className="text-left flex flex-col pt-2 text-7469B6 text-lg">
                                    <span className="font-semibold">Lakshmi Doll</span>
                                    <span>฿ 590</span>
                                </div>
                            </div>
                            </Link>
                        {/* Product Card 4 */}
                            <Link href="http://localhost:3000/product/DS00010" className="hover:text-[#A599ED] active:text-black text-2xl" > 
                            <div className="bg-white p-4 rounded-2xl shrink-0 w-72 h-110">
                                <div>
                                    <Image alt="logo" src={"https://i.pinimg.com/736x/33/66/a6/3366a6d33472b8a6ad86d5c4cd5e1c05.jpg"} width={250} height={360} className=" rounded-2xl w-full h-full object-cover" />
                                </div>
                                <div className="text-left flex flex-col pt-2 text-7469B6 text-lg">
                                    <span className="font-semibold">Inari Okami Doll</span>
                                    <span>฿ 590</span>
                                </div>
                            </div>
                            </Link>
                        {/* Product Card 5 */}
                            <Link href="http://localhost:3000/product/DS00009" className="hover:text-[#A599ED] active:text-black text-2xl" > 
                            <div className="bg-white p-4 rounded-2xl shrink-0 w-72 h-110">
                                <div>
                                    <Image alt="logo" src={"https://i.pinimg.com/736x/9e/a6/82/9ea682c88a9b21c612453814777e39c7.jpg"} width={250} height={360} className=" rounded-2xl w-full h-full object-cover" />
                                </div>
                                <div className="text-left flex flex-col pt-2 text-7469B6 text-lg">
                                    <span className="font-semibold">Ganesha Doll</span>
                                    <span>฿ 590</span>
                                </div>
                            </div>
                            </Link>
                        {/* Product Card 6 */}
                            <Link href="http://localhost:3000/product/DS000005" className="hover:text-[#A599ED] active:text-black text-2xl" > 
                            <div className="bg-white p-4 rounded-2xl shrink-0 w-72 h-110">
                                <div>
                                    <Image alt="logo" src={"https://i.pinimg.com/736x/fb/b0/95/fbb095e222842702e3eda5bd48d8109c.jpg"} width={250} height={360} className=" rounded-2xl w-full h-full object-cover" />
                                </div>
                                <div className="text-left flex flex-col pt-2 text-7469B6 text-lg">
                                    <span className="font-semibold">Cupid Doll</span>
                                    <span>฿ 590</span>
                                </div>
                            </div>
                            </Link>

                        </div>

                    </div>
                    <div>
                    </div>
                </main>
            </div>
            {/* Tarot Modal Component */}    
            <TarotModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                card={card}
            />
        </>
    );
}