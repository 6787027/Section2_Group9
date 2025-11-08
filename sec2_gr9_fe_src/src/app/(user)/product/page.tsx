"use client"
import ProductCard from "@/components/built-components/productcard"
import { useState } from "react";
import ImgOrder from "@/assets/ImageOrder.png"
import Link from 'next/link';

const ALL_PRODUCTS = [
  { id: 1, name: "Hutao Doll", price: 500, genre: "Game", type: "Doll", character: "hutao", url: ImgOrder },
  { id: 2, name: "Stelle - Star Collection", price: 500, genre: "Game", type: "Accessory", character: "Stelle", url: ImgOrder },
  { id: 3, name: "Another Doll", price: 200, genre: "Anime", type: "Doll", character: "annabell", url: ImgOrder },
  { id: 4, name: "Hutao Doll", price: 500, genre: "Game", type: "Accessory", character: "hutao", url: ImgOrder },
  { id: 5, name: "Stelle - Star Collection", price: 500, genre: "Game", type: "Doll", character: "Stelle", url: ImgOrder },
  { id: 6, name: "Another Doll", price: 200, genre: "Anime", type: "Accessory", character: "annabell", url: ImgOrder },
  { id: 7, name: "Hutao Doll", price: 500, genre: "Game", type: "Doll", character: "hutao", url: ImgOrder },
  { id: 8, name: "Stelle - Star Collection", price: 500, genre: "Game", type: "Accessory", character: "Stelle", url: ImgOrder },
  { id: 9, name: "Another Doll", price: 200, genre: "Anime", type: "Doll", character: "annabell", url: ImgOrder }
];

const genre =[{id: 1,ch}]

export default function Product() {
  const [products_list, setshowproduct] = useState(ALL_PRODUCTS)
  const [product_name, setproductname] = useState('')
  const [product_type, setproducttype] = useState('')
  const [product_genre, setproductgenre] = useState('')
  const [product_character, setproductcharacter] = useState('')

  const handlesearch = () => {

    let filtered = ALL_PRODUCTS;
    if (product_name) {
      filtered = filtered.filter(p => p.name.toLowerCase().includes(product_name.toLowerCase()))
    }
    if (product_type) {
      filtered = filtered.filter(p => p.type === product_type)
    }
    if (product_genre) {
      filtered = filtered.filter(p => p.genre === product_genre)
    }
    if (product_character) {
      filtered = filtered.filter(p => p.character === product_character)
    }



    setshowproduct(filtered);
  }

  const handleClear = () => {
    setproductname('');
    setproducttype('');
    setproductgenre('');
    setproductcharacter('');
    setshowproduct(ALL_PRODUCTS);
  }


  return (
    <div className="page-container flex p-4 gap-4 bg-[#282151]">

      <aside className="sidebar w-1/4 p-4 rounded-lg flex flex-col gap-3 bg-gradient-to-b from-[#7469B6] to-[#332E50] text-white">
        <label className="font-semibold pt-5 text-xl">Product name</label>
        <input
          type="text"
          value={product_name}
          onChange={e => setproductname(e.target.value)}
          placeholder="Search"
          className="text-black p-2  bg-white rounded-xl"
        />

        <label className="font-semibold text-xl">Type</label>
        <select
          value={product_type}
          onChange={e => setproducttype(e.target.value)}
          className="text-black p-2  bg-white rounded-xl"
        >
          <option value="">Select a Type</option>
          <option value="Doll">Doll</option>
          <option value="Accessory">Accessory</option>
        </select>

        <label className="font-semibold text-xl">Genre</label>
        <select
          value={product_genre}
          onChange={e => setproductgenre(e.target.value)}
          className="text-black p-2 rounded-xl bg-white"
        >
          <option value="">Select a Genre</option>
          <option value="Game">Game</option>
          <option value="Anime">Anime</option>
        </select>

        <label className="font-semibold text-xl">Character</label>
        <select
          value={product_character}
          onChange={e => setproductcharacter(e.target.value)}
          className="text-black p-2 rounded-xl bg-white"
        >
          <option value="" >Select a Character</option>
          <option value="hutao">Hutao</option>
          <option value="Stelle">Stelle</option>
          <option value="annabell">Annabell</option>
        </select>

        <button
          onClick={handlesearch}
          className="bg-[#BBC0FF] p-2  hover:bg-purple-300 mt-20 text-[#282151] font-bold rounded-lg"
        >
          Search
        </button>
        <button
          onClick={handleClear}
          className="bg-none  p-2 rounded hover:bg-gray-400 text-white font-bold"
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
                imageUrl={product.url.src}
                type={product.type}
                genre={product.genre}
              />
            </Link>
          ))}
        </div>
      </main>
    </div>
  );

}
