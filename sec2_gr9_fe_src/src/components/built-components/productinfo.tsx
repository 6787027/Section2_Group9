import { Minus, Plus } from "lucide-react";
import Link from 'next/link';
import { useState } from "react";



interface ProductInfo {
    name: string
    price: number
    type: string
    genre: string
    quantity: number
    desc: string
    img1: string
    img2: string
    img3: string
};

export default function ProductInfo({ name, price, type, genre, quantity, desc, img1, img2, img3 }: ProductInfo) {
    const [count, setCount] = useState(1);

    return (
        <div className="min-h-screen  text-center px-8">
            <main className="flex flex-col">
                <div className="mt-10 flex flex-row justify-center">
                    <div className="flex">
                        <div>
                            <div className="p-1 bg-white my-5 mr-2 rounded-lg">
                                <img
                                    src={img1}
                                    width={100}
                                    alt={name} />

                            </div>
                            <div className="p-1 bg-white my-5 mr-2 rounded-lg">
                                <img
                                    src={img2}
                                    width={100}
                                    alt={name} />

                            </div>
                        </div>

                    </div>
                    <div>
                        <div className="bg-white p-1 my-5 ml-5 rounded-sm">
                            <img
                                src={img3}
                                width={320}
                                alt={name} />

                        </div>
                        <h1 className="ml-5 text-xl text-white font-bold text-start mt-15">
                            Description
                        </h1>
                        <div className="max-w-80">
                            <p className="break-all ml-5 mt-5 mb-5 text-white max-w-screen text-start">
                                {desc}
                            </p>
                        </div>

                    </div>

                    <div className=" justify-items-start mt-5 ml-10 flex flex-col text-left">
                        <div className="text-3xl mb-3 text-white">
                            {name}
                        </div>
                        <div className="mb-7">
                            <div className="badge badge-outline bg-pink-200 px-4 mr-2">{type}</div>
                            <div className="badge badge-outline bg-purple-200 px-3">{genre}</div>
                        </div>
                        <div className="flex flex-row mb-17 text-[#C8C4EE]">
                            <div className="text-2xl self-end">
                                ฿ {price}
                            </div>
                            <div className="px-5 text-2xl self-end">|</div>
                            <div className="text-l self-end">
                                {quantity} left
                            </div>
                        </div>


                        {/* Unfinished from here*/}
                        <div className="mb-6 text-[#E8E6FB]">
                            <div className="mb-2">Quantity</div>
                            <div className="flex justify-start items-center gap-5 h-fit">
                                <button
                                    type="button"
                                    className="border-1 border-solid border-[#E8E6FB] justify-center items-center flex w-4 h-4"
                                    onClick={() => setCount(prev => Math.max(1, prev - 1))}
                                >
                                    <Minus />
                                </button>

                                <span id="quan">{count}</span>

                                <button
                                    type="button"
                                    className="border-1 border-solid border-[#E8E6FB] justify-center items-center flex w-4 h-4"
                                    onClick={() => setCount(prev => prev + 1)}
                                >
                                    <Plus />
                                </button>

                            </div>
                        </div>
                        <div className="flex justify-start">
                            <button type="button" className="border-white bg-white text-[#282151] rounded-xl p-3 shadow-xl font-bold text-lg">Add to Cart</button>
                            <div className="m-4"></div>
                            <button type="button" className="border-[#E00303] bg-[#E00303] text-white rounded-xl py-3 px-6 shadow-xl font-bold text-lg">Buy Now</button>
                        </div>
                    </div>
                    <div className="m-15"></div>
                </div>
            </main>
        </div>
    );
}