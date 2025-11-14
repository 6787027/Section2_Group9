import React, { useState } from "react";

export default function AddAccountModal({ onClose, onSuccess }) {
    const [formData, setFormData] = useState({
        email:"",
        fname: "",
        lname: "",
        phonenum: "",
        pass: "",
        type: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAdd = async () => {
        try {
            const res = await fetch("http://localhost:3001/ad_account", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (res.ok) {
                alert("Account added successfully!");
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
            <div className="bg-white rounded-xl shadow-2xl w-[600px] p-6 relative max-h-[90vh] overflow-y-auto">
                <h2 className="text-3xl font-bold text-center mb-4">Add Account</h2>

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleAdd();
                    }}
                >
                    <div className="text-[#7469B6]">
                        <label className="block text-sm font-semibold mb-1">Email</label>
                        <input
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter email"
                            className="border p-2 rounded w-full mb-3"
                            required
                        />

                         <div>
                            <label className="block text-sm font-semibold mb-1">Password</label>
                            <input
                                name="pass"
                                type="text"
                                value={formData.pass}
                                onChange={handleChange}
                                placeholder="Enter password"
                                className="border p-2 rounded w-full"
                                required
                            />
                        </div>

                        <div className="mt-5 flex items-center justify-between">
                            <div className="flex flex-col">
                            <label className="mr-5 block text-sm font-semibold text-nowrap mb-1">First name</label>
                            <input
                                name="fname"
                                type="text"
                                value={formData.fname}
                                onChange={handleChange}
                                placeholder="Enter first name"
                                className="border p-2 rounded w-60 mb-3"
                                required
                            />
                            </div>
                            
                            <div className="flex flex-col">
                            <label className="mr-5 block text-sm font-semibold text-nowrap mb-1">Last name</label>
                            <input
                                name="lname"
                                type="text"
                                value={formData.lname}
                                onChange={handleChange}
                                placeholder="Enter last name"
                                className="border p-2 rounded w-60 mb-3"
                                required
                            />
                            </div>
                        </div>
                        <label className="mr-13 block text-sm font-semibold mb-1">Type</label>
                            <select
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                                className="border p-2 rounded w-full mb-3 bg-white"
                                required
                            >
                                <option value="">Select type</option>
                                <option value="User">User</option>
                                <option value="Admin">Admin</option>
                            </select>


                    

                        <label className="block text-sm font-semibold mb-1">Phone Number</label>
                        <input
                            name="phonenum"
                            type="text" 
                            value={formData.phonenum}
                            onChange={handleChange}
                            placeholder="Enter front image URL"
                            className="border p-2 rounded w-full mb-5"
                        />


                        <div className="mt-2 flex justify-between">
                            <button
                                type="submit"
                                className="bg-[#7469B6] text-white px-4 py-2 rounded hover:bg-[#7469B6]"
                            >
                                Add Account
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
