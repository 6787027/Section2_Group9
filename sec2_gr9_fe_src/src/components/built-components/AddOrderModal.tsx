import React, { useState } from "react";

export default function AddOrderModal({ onClose, onSuccess }) {
    const [formData, setFormData] = useState({
        price: "",
        status: "Ordered",
        email: "",
        address: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAdd = async () => {
        try {
            const res = await fetch("http://localhost:3001/ad_order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (res.ok) {
                alert("Order added successfully!");
                onClose();
                onSuccess();
            } else {
                alert("Failed to add order: " + data.message);
            }
        } catch (err) {
            console.error(err);
            alert("Server error");
        }
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
            <div className="bg-white rounded-xl shadow-2xl w-[600px] p-6 relative max-h-[90vh] overflow-y-auto">
                <h2 className="text-3xl font-bold text-center mb-4">Add Order</h2>

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleAdd();
                    }}
                >
                    <div className="text-[#7469B6]">

                        <label className="block text-sm font-semibold mb-1">Customer Email</label>
                        <input
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter customer's account email"
                            className="border p-2 border-[#7469B6] w-full mb-3"
                            required
                        />

                        <label className="block text-sm font-semibold mb-1">Price</label>
                        <input
                            name="price"
                            type="number"
                            value={formData.price}
                            onChange={handleChange}
                            placeholder="Enter price"
                            className="border p-2 border-[#7469B6] w-full mb-3"
                            required
                        />

                        <label className="block mb-1">Status</label>
                        <div className="w-full border border-[#7469B6] p-2 mb-3">
                            <div className="flex flex-col gap-2">
                                {["Ordered", "Paid", "Prepared", "Sent"].map((optionValue) => (
                                    <div key={optionValue} className="flex items-center">
                                        <input
                                            type="radio"
                                            name="status"
                                            value={formData.status}
                                            onChange={handleChange}
                                            required
                                            className="h-4 w-4"
                                        />
                                        <label
                                            htmlFor="status"
                                            className="ml-2 text-sm "
                                        >
                                            {optionValue}
                                        </label>
                                    </div>
                                ))}

                            </div>
                        </div>

                        <label className="block text-sm font-semibold mb-1">Shipping Address</label>
                        <textarea
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            placeholder="Enter shipping address"
                            className="border p-2 border-[#7469B6] w-full mb-3"
                            rows={3}
                            required
                        />



                        <div className="mt-2 flex justify-between">
                            <button
                                type="submit"
                                className="bg-[#7469B6] text-white px-4 py-2 rounded hover:bg-[#7469B6]"
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
