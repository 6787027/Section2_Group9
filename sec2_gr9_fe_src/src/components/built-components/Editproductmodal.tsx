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
    <div className="fixed inset-0 bg-black/40  flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-2xl w-[600px] p-6 relative max-h-[90vh] overflow-y-auto">
        <h2 className="text-3xl font-bold text-center mb-4">Edit Product</h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
        >
          
          {/* Product Name */}
          <label className="block text-sm font-semibold mb-1">Product Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter product name"
            className="border p-2 rounded w-full mb-3"
            required
          />

          <div className="flex items-center">
          {/* Price */}
          <label className="mr-11 block text-sm font-semibold mb-1">Price</label>
          <input
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            placeholder="Enter price"
            className="border p-2 rounded w-full mb-3 mr-10"
            required
          />
          
          
          {/* Type (Select box) */}
          <label className="mr-13 block text-sm font-semibold mb-1">Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="border p-2 rounded w-full mb-3 bg-white"
            required
          >
            <option value="">Select type</option>
            <option value="Doll">Doll</option>
            <option value="Accessory">Accessory</option>
          </select>

          </div>

          
          {/* Quantity */}
          <div className="flex items-center">
          <label className="mr-5 block text-sm font-semibold mb-1">Quantity</label>
          <input
            name="quantity"
            type="number"
            value={formData.quantity}
            onChange={handleChange}
            placeholder="Enter quantity"
            className="border mr-10 p-2 rounded w-full mb-3"
            required
          />

          {/* Collection Name */}
          <label className="mr-5 block text-sm font-semibold mb-1">Collection Name</label>
          <input
            name="colname"
            value={formData.colname}
            onChange={handleChange}
            placeholder="Enter collection name"
            className="border p-2 rounded w-full mb-3"
          />
          </div>
          
          {/* Description */}
          <label className="mt-2 block text-sm font-semibold mb-1">Description</label>
          <textarea
            name="desc"
            value={formData.desc}
            onChange={handleChange}
            placeholder="Enter description"
            className="border p-2 rounded w-full mb-3"
          />

          {/* Image URLs */}
          <label className="block text-sm font-semibold mb-1">Front Image URL</label>
          <input
            name="img1"
            value={formData.img1}
            onChange={handleChange}
            placeholder="Enter front image URL"
            className="border p-2 rounded w-full mb-3"
          />

          <label className="block text-sm font-semibold mb-1">Side Image URL</label>
          <input
            name="img2"
            value={formData.img2}
            onChange={handleChange}
            placeholder="Enter side image URL"
            className="border p-2 rounded w-full mb-3"
          />

          <label className="block text-sm font-semibold mb-1">Back Image URL</label>
          <input
            name="img3"
            value={formData.img3}
            onChange={handleChange}
            placeholder="Enter back image URL"
            className="border p-2 rounded w-full mb-5"
          />

          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-[#7469B6] text-white px-4 py-2 rounded"
            >
              Save
            </button>

            <button
              type="button"
              onClick={onClose}
              className="text-gray-600 px-4 py-2 hover:underline"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>

  );
}
