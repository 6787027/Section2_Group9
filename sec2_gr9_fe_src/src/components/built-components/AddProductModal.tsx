import React, { useState } from "react";

export default function AddProductModal({ onClose, onSuccess }) {
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        type: "",
        quantity: "",
        colname: "",
        desc: "",
        img1: "",
        img2: "",
        img3: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAdd = async () => {
        try {
            const res = await fetch("http://localhost:3001/v1/products", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (res.ok) {
                alert("Product added successfully!");
                onClose();
                onSuccess();
            } else {
                alert("Failed to add product: " + data.message);
            }
        } catch (err) {
            console.error(err);
            alert("Server error");
        }
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
            <div className="bg-white rounded-xl shadow-2xl w-[600px] p-6 relative">
                <h2 className="text-3xl font-bold text-center mb-4">Add Product</h2>

                <form className="overflow-auto"
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleAdd();
                    }}
                >
                    <div className="text-[#7469B6]">
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

                        <div className="mt-2 flex items-center">
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

                            {/* Type */}
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

                        <div className="flex items-center">
                            {/* Quantity */}
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

                            {/* Collection */}
                            <label className="mr-5 block text-sm font-semibold mb-1">Collection</label>
                            <input
                                name="colname"
                                value={formData.colname}
                                onChange={handleChange}
                                placeholder="Enter collection name"
                                className="border p-2 rounded w-full mb-3"
                            />
                        </div>

                        <label className="mt-2 block text-sm font-semibold mb-1">Description</label>
                        <textarea
                            name="desc"
                            value={formData.desc}
                            onChange={handleChange}
                            placeholder="Enter description"
                            className="border p-2 rounded w-full mb-3"
                        />

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
                                className="bg-[#7469B6] text-white px-4 py-2 rounded hover:bg-green-700"
                            >
                                Add Product
                            </button>

                            <button
                                type="button"
                                onClick={onClose}
                                className="text-gray-600 px-4 py-2 hover:underline"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
