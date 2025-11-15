"use client";
import { useState } from "react";

interface Order {
    id: string;
    time: string;
    price: number;
    status: string;
};

interface EditModalProps {
    or: Order;
    onClose: () => void;
    onSave: () => void;
}

export default function EditOrderModal({ or, onClose, onSave }: EditModalProps) {
    const [id] = useState(or.id);
    const [time, setTime] = useState(or.time);
    const [price, setPrice] = useState(or.price);;
    const [status, setStatus] = useState(or.status);

    const handleSave = async () => {
        try {
            const response = await fetch("http://localhost:3001/ad_order", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    Or_Num: id,
                    Or_Time: time,
                    Or_Price: price,
                    Or_Status: status
                }),
            });

            if (response.ok) {
                alert("Order updated successfully!");
                onSave();
                onClose();
            } else {
                alert("Failed to update order.");
            }
        } catch (error) {
            console.error("Error updating order:", error);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-[450px]">
                <h2 className="text-2xl font-bold text-center text-[#282151] mb-6">
                    Edit Order
                </h2>

                <div className="space-y-4">
                    <div>
                        <label className="block text-[#282151] mb-1">Order Number</label>
                        <input
                            type="text"
                            value={id}
                            readOnly
                            className="w-full border border-[#8575B4] rounded-md p-2"
                        />
                    </div>

                    <div>
                        <label className="block text-[#282151] mb-1">Price</label>
                        <input
                            type="text"
                            value={price}
                            readOnly
                            className="w-full border border-[#8575B4] rounded-md p-2"
                        />
                    </div>

                    <div>
                        
                        <label className="block text-[#282151] mb-1">Status</label>
                        <div className="w-full border border-[#8575B4] rounded-md p-2">
                            <div className="flex flex-col gap-2">
                                {["Ordered", "Paid", "Prepared", "Sent"].map((optionValue) => (
                                    <div key={optionValue} className="flex items-center">
                                        <input
                                            type="radio"
                                            id={`status-${optionValue}`} 
                                            name="status" 
                                            value={optionValue}
                                            checked={status === optionValue}
                                            onChange={(e) => setStatus(e.target.value)}
                                            required
                                            className="h-4 w-4"
                                        />
                                        <label
                                            htmlFor={`status-${optionValue}`} 
                                            className="ml-2 text-sm" 
                                        >
                                            {optionValue}
                                        </label>
                                    </div>
                                ))}

                            </div>
                        </div>
                    </div>


                    <div className="flex justify-between mt-5">

                        <button
                            onClick={handleSave}
                            className="bg-[#6F63B0] text-white py-2 px-6 rounded-lg hover:bg-[#5c52a0] transition-all"
                        >
                            Save
                        </button>



                        <button
                            onClick={onClose}
                            className="text-sm text-gray-500 hover:underline"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div >
    );
}
