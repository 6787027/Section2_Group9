"use client"

import React, { useState } from "react";

interface EditModalProps {
  product: {
    id: string;
    name: string;
    price: number;
    type: string;
    quantity: number;
    desc: string;
    colname: string;
    img1: string;
    img2: string;
    img3: string;
  };
  onClose: () => void;
  onSave: () => void;
}

export default function Editproductmodal({ product, onClose, onSave }: EditModalProps) {
  const [formData, setFormData] = useState(product);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`http://localhost:3001/v1/products/${formData.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("Product updated successfully!");
        onSave();
        onClose();
      } else {
        alert("Failed to update product");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-2xl w-[400px] p-6 relative">
        <h2 className="text-xl font-bold text-center mb-4">Edit Product</h2>

        <input name="name" value={formData.name} onChange={handleChange} placeholder="Product Name" className="border p-2 rounded w-full mb-3" />
        <input name="price" type="number" value={formData.price} onChange={handleChange} placeholder="Price" className="border p-2 rounded w-full mb-3" />
        <input name="type" value={formData.type} onChange={handleChange} placeholder="Type" className="border p-2 rounded w-full mb-3" />
        <input name="quantity" type="number" value={formData.quantity} onChange={handleChange} placeholder="Quantity" className="border p-2 rounded w-full mb-3" />
        <input name="colname" value={formData.colname} onChange={handleChange} placeholder="Collection Name" className="border p-2 rounded w-full mb-3" />
        <textarea name="desc" value={formData.desc} onChange={handleChange} placeholder="Description" className="border p-2 rounded w-full mb-3" />

        {/* Images */}
        <input name="img1" value={formData.img1} onChange={handleChange} placeholder="Front Image URL" className="border p-2 rounded w-full mb-3" />
        <input name="img2" value={formData.img2} onChange={handleChange} placeholder="Side Image URL" className="border p-2 rounded w-full mb-3" />
        <input name="img3" value={formData.img3} onChange={handleChange} placeholder="Back Image URL" className="border p-2 rounded w-full mb-5" />

        <div className="flex justify-between">
          <button onClick={handleSave} className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
            Save
          </button>
          <button onClick={onClose} className="text-gray-600 px-4 py-2 hover:underline">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
