"use client"
import Adpro from "@/components/built-components/protable"
import ImgOrder from "@/assets/ImageOrder.png"
import { notFound, useParams } from "next/navigation";
import { useState } from "react";


const ALL_PRODUCTS = [
    { id: 1, name: "Hutao Doll", price: 500.00, type: "Doll", url: ImgOrder, quantity: 705, desc: "I am groot", colid:10 },
    { id: 2, name: "Stelle - Star Collection", price: 500.00, type: "Accessory", url: ImgOrder, quantity: 70, desc: "I am groot",colid:20 },
    { id: 3, name: "Another Doll", price: 200.00, type: "Doll", url: ImgOrder, quantity: 159, desc: "I am groot",colid:11 },
    { id: 4, name: "Hutao Doll", price: 500.00, type: "Accessory", url: ImgOrder, quantity: 60, desc: "I am groot",colid:21 },
    { id: 5, name: "Stelle - Star Collection", price: 500.00, type: "Doll", url: ImgOrder, quantity: 25, desc: "I am groot",colid:12 },
    { id: 6, name: "Another Doll", price: 200.00, type: "Accessory", url: ImgOrder, quantity: 23, desc: "I am groot",colid:22 },
    { id: 7, name: "Hutao Doll", price: 500.00, type: "Doll", url: ImgOrder, quantity: 2, desc: "I am groot",colid:13 },
    { id: 8, name: "Stelle - Star Collection", price: 500.00, type: "Accessory", url: ImgOrder, quantity: 150, desc: "I am groot",colid:23 },
    { id: 9, name: "Another Doll", price: 200.00, type: "Doll", url: ImgOrder, quantity: 200, desc: "I am groot",colid:14 }
];


export default function Ad_product() {
    const [products] = useState(ALL_PRODUCTS)
    const [filterType, setFilterType] = useState<string>("all");
    const [searchTerm, setSearchTerm] = useState("");

    const filteredByType =
    filterType === "all"
      ? products
      : products.filter((p) => p.type === filterType);

  
  const filteredProducts = filteredByType.filter((p) => {
    const keyword = searchTerm.toLowerCase();
    return (
      p.id.toString().includes(keyword) ||
      p.name.toLowerCase().includes(keyword) ||
      p.type.toLowerCase().includes(keyword) ||
      p.quantity.toString().includes(keyword)
    );
  });
    
    return (
        <div className="bg-[#F1F0F4] min-h-screen min-w-screen flex flex-row">
            <div className="bg-white min-w-65 shadow-xl ">
                <header>
                    <div className="my-16 ml-8 justify-items-start">
                        <h1 className="text-[#282151] font-bold text-xl">Admin name</h1>
                    </div>
                </header>
                <div className="mx-3 border-b-1 border-[#D9D9D9]"></div>
                <nav>
                    <div className="my-10 ml-8 text-xl justify-items-start">
                        <div className="mb-7 text-[#282151] font-bold">Tools</div>
                        <h2 className="mb-7 font-bold text-xl"><a href="/ad_product">Product</a><br></br></h2>
                        <h2 className="mb-7 text-xl"><a href="/ad_account">Account</a><br></br></h2>
                        <h2 className="text-xl"><a href="/ad_order">Order</a><br></br></h2>
                    </div>
                </nav>
            </div>

            {/* search bar */}

            <main className="flex flex-col m-15 mt-10">
                <div className="flex justify-between bg-white w-250 py-3 mb-10 items-center border-solid border-1 border-white rounded-2xl shadow-xl">
                    <div className="ml-5">
                        <div className="flex flex-nowrap border-solid border-1 border-black rounded-3xl pl-3 pr-3 ">
                            <input id="search"
                            type="text"
                            placeholder="Search by any field..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)} 
                            className="placeholder-[#D0D0D0] input-m ml-2 mr-2 my-1 pr-20 bg-white"></input>
                            <button type="button" >
                                <svg className="w-4 h-4 text-black dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className="mr-5 ">
                        <button type="button" className="flex flex-nowrap font-bold text-[#282151] bg-[#E8E6FB] p-2 border-solid border-1 border-[#E8E6FB] rounded-2xl">
                            <svg className="mr-2 w-6 h-6 text-[#282151] dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7 7V5" />
                            </svg> Add Product
                        </button>
                    </div>
                </div>

                {/* filter */}

                <div className="border-1 border-white rounded-t-2xl shadow-xl bg-white w-250 h-fit">
                    <div className="mt-3 ml-5 mb-2">
                        <label htmlFor="filter" className="text-[#7469B6] mr-2">Type</label>
                        <select
                        id="filter"
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                        className="select pl-3 text-grey-200 bg-white border-solid border-1 border-white rounded-xl shadow-xl">
                            <option value="all">Select a Type</option>
                            <option value="Doll">Doll</option>
                            <option value="Accessory">Accessory</option>
                        </select>

                    </div>
                    <div className="border-b-1 border-[#D9D9D9]"></div>

                    {/* Table */}
                </div>
                <div className="overflow-auto border-1 border-white rounded-b-2xl shadow-xl bg-white w-250 h-110">
                    <div>
                        <div className="overflow-auto">
                            <table className="table table-pin-rows table-pin-cols">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Picture</th>
                                        <th>Product Name</th>
                                        <th>Quantity</th>
                                        <th>Type</th>
                                        <th>Category/Collection</th>
                                        <th>Price</th>
                                        <th>Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredProducts.length === 0 ? (
                                        <p className="text-gray-500 text-center">No products found</p>
                                        ) : (
                                        filteredProducts.map((p) => (
                                            <Adpro key={p.id}
                                            id={p.id}
                                            name={p.name}
                                            price={p.price}
                                            imageUrl={p.url.src}
                                            type={p.type}
                                            quantity={p.quantity}
                                            desc={p.desc}
                                            colid= {p.colid}
                                            >      
                                            </Adpro>
                                        ))
                                        )}                    
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
