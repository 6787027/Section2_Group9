"use client"
import ProductCard from "@/components/built-components/productcard"
import { useState } from "react";
import ImgOrder from "@/assets/ImageOrder.png"

const ALL_PRODUCTS = [
  { id: 1, name: "Hutao Doll", price: 500, genre: "Game", type: "Love", character: "hutao", url: ImgOrder },
  { id: 2, name: "Stelle - Star Collection", price: 500, genre: "Game", type: "Luck", character: "Stelle", url: ImgOrder },
  { id: 3, name: "Another Doll", price: 200, genre: "Anime", type: "Love", character: "annabell", url: ImgOrder }
];
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
    <div className="page-container flex w-full p-4 gap-4 bg-[#282151]">

      <aside className="sidebar w-1/4 p-4 rounded-lg flex flex-col gap-3 bg-[#4a3c6b] text-white">
        <label>Product name</label>
        <input
          type="text"
          value={product_name}
          onChange={e => setproductname(e.target.value)}
          placeholder="Search"
          className="text-black p-2 rounded bg-white" 
        />

        <label>Type</label>
        <select
          value={product_type}
          onChange={e => setproducttype(e.target.value)}
          className="text-black p-2 rounded bg-white"
        >
          <option value="">Select a Type</option>
          <option value="Love">Love</option>
          <option value="Luck">Luck</option>
        </select>

        <label>Genre</label>
        <select
          value={product_genre}
          onChange={e => setproductgenre(e.target.value)}
          className="text-black p-2 rounded bg-white"
        >
          <option value="">Select a Genre</option>
          <option value="Game">Game</option>
          <option value="Anime">Anime</option>
        </select>

        <label>Character</label>
        <select
          value={product_character}
          onChange={e => setproductcharacter(e.target.value)}
          className="text-black p-2 rounded bg-white"
        >
          <option value="">Select a Character</option>
          <option value="hutao">Hutao</option>
          <option value="Stelle">Stelle</option>
          <option value="annabell">Annabell</option>
        </select>

        <button
          onClick={handlesearch}
          className="bg-purple-400 p-2 rounded hover:bg-purple-300"
        >
          Search
        </button>
        <button
          onClick={handleClear}
          className="bg-gray-300 text-black p-2 rounded hover:bg-gray-400"
        >
          Clear
        </button>
      </aside>

      <main className="main-content flex-1">
        <div className="product-grid grid grid-cols-3 gap-4">
          {products_list.map(product => (
            <ProductCard
              key={product.id}
              name={product.name}
              price={product.price}
              imageUrl={product.url.src} />
          ))}
        </div>
      </main>
    </div>
  );

}
