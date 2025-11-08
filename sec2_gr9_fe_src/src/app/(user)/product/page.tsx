"use client"
import ProductCard from "@/components/built-components/productcard"
import { useState, useEffect } from "react";
import Link from 'next/link';
import React from 'react'

export default function Product() {
  interface MySearchParams {
    name?: string;
    type?: string;
    collection?: string;
  }
  interface Product {
    id: number;
    name: string;
    price: number;
    url: string; // API ส่ง url เป็น string
    type: string;
    collection: string;
  }
  const [products_list, setshowproduct] = useState<Product[]>([]);
  const [product_name, setproductname] = useState('')
  const [product_type, setproducttype] = useState('')
  const [product_collection, setproductcollection] = useState('')

  function fetchProducts(params = {}) {
    let query = new URLSearchParams(params).toString();
    let fetchURL = `http://localhost:3001/api/products?${query}`
    fetch(fetchURL)
      .then(res => res.json())
      .then(data => setshowproduct(data))
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    fetchProducts()
  }, []);





  function handlesearch() {
    let searchParams: MySearchParams = {}
    if (product_name) {
      searchParams.name = product_name;
    }
    if (product_type) {
      searchParams.type = product_type;
    }
    if (product_collection) {
      searchParams.collection = product_collection;
    }
    fetchProducts(searchParams)
  }

  function handleclear() {
    setproductname('');
    setproducttype('');
    setproductcollection('');
    fetchProducts()
  }

  function handleformsubmit(e: React.FormEvent) {
    e.preventDefault();
    handlesearch()
  }


  return (
    <div className="page-container flex p-4 gap-4 bg-[#282151]">

      <aside className="sidebar w-1/4 p-4 rounded-lg flex flex-col gap-4 bg-gradient-to-b from-[#7469B6] to-[#332E50] text-white">
        <form onSubmit={handleformsubmit} className="flex flex-col gap-y-5 pt-3">

          <div>

            <label className="block font-semibold text-xl mb-2">Product name</label>
            <input type="text"
              value={product_name}
              onChange={e => setproductname(e.target.value)}
              placeholder="Search Type"
              className="text-black p-2 bg-white rounded-xl w-full" />
          </div>

          <div>
            <label className="block font-semibold text-xl mb-2">Type</label>
            <input type="text"
              value={product_type}
              onChange={e => setproducttype(e.target.value)}
              placeholder="Type Search"
              className="text-black p-2 bg-white rounded-xl w-full" />
          </div>
          <div> 
            <label className="block font-semibold text-xl mb-2">Category/Collection</label>
            <input type="text"
              value={product_collection}
              onChange={e => setproductcollection(e.target.value)}
              placeholder="Search Category/Collection"
              className="text-black p-2 bg-white rounded-xl w-full" />
          </div>
          <button
            type="submit"
            className="bg-[#BBC0FF] p-2 hover:bg-purple-300 mt-4 text-[#282151] font-bold rounded-lg "
          >
            Search
          </button>
        </form>
        <button
          onClick={handleclear}
          className="bg-none p-2 rounded hover:bg-gray-400 text-white font-bold"
        >
          Clear
        </button>
      </aside>

      <main className="main-content flex-1 h-screen overflow-y-auto custom-scrollbar pr-4 ">
        <div className="product-grid grid grid-cols-3 gap-4 ">
          {products_list.map(product => (
            <Link key={product.id} href={`/product/${product.id}`}>
              <ProductCard
                name={product.name}
                price={product.price}
                imageUrl={product.url}
                type={product.type}
                collection={product.collection}
              />
            </Link>
          ))}
        </div>
      </main>
    </div>
  );

}
