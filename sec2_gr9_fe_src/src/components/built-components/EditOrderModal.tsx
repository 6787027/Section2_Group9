"use client";
import { useState, FormEvent } from "react";

// Interface สำหรับกำหนดโครงสร้างข้อมูลของ Order
interface Order {
    id: string;
    time: string;
    price: number;
    status: string;
    email: string;
    address: string;
};

// Interface สำหรับ Props ที่จะรับเข้ามาใน Modal
interface EditModalProps {
    or: Order; // ข้อมูล Order ที่ต้องการแก้ไข
    onClose: () => void;
    onSave: () => void;
}

export default function EditOrderModal({ or, onClose, onSave }: EditModalProps) {
    // กำหนดค่าเริ่มต้นของ State จากข้อมูล Order ที่อนุญาตให้แก้ไขได้
    const [id] = useState(or.id);
    //แก้ได้แค่ status กับข้อมูลที่อยู่
    const [status, setStatus] = useState(or.status);
    const [address, setAddress] = useState(or.address);

    // เปลี่ยนจาก handleSave เป็น handleSubmit เพื่อรองรับ Form Event
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault(); // ป้องกันไม่ให้หน้าเว็บ Refresh เมื่อกด Submit

        try {
            const response = await fetch("http://localhost:3001/ad_order", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    Or_Num: id,
                    Or_Status: status,
                    Or_Address: address
                }),
            });

            // ตรวจสอบผลลัพธ์จาก API
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

                {/* เริ่มต้น Form ตรงนี้ */}
                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* Or_num ห้ามแก้ */}
                    <div>
                        <label className="block text-[#282151] mb-1">Order Number</label>
                        <input
                            type="text"
                            value={id}
                            readOnly
                            className="w-full border border-[#7469B6] p-2 bg-gray-100"
                        />
                    </div>

                    {/* Or_Email ห้ามแก้ */}
                    <div>
                        <label className="block text-[#282151] mb-1">Customer Email</label>
                        <input type="text" value={or.email} readOnly className="w-full border border-[#7469B6] p-2 bg-gray-100" />
                    </div>

                    {/* Or_Price ห้ามแก้ */}
                    <div>
                        <label className="block text-[#282151] mb-1">Price</label>
                        <input
                            type="text"
                            value={or.price}
                            readOnly
                            className="w-full border border-[#7469B6] p-2 bg-gray-100"
                        />
                    </div>

                    {/* Or_Status แก้ได้ */}
                    <div>
                        <label className="block mb-1">Status</label>
                        <div className="w-full border-[#7469B6] border p-2">
                            <div className="flex flex-col gap-2">
                                {/* Loop สร้าง Radio button สำหรับแต่ละสถานะ */}
                                {["Ordered", "Paid", "Prepared", "Sent"].map((optionValue) => (
                                    <div key={optionValue} className="flex items-center">
                                        <input
                                            type="radio"
                                            id={`status-${optionValue}`}
                                            name="status"
                                            value={optionValue}
                                            checked={status === optionValue}
                                            onChange={(e) => setStatus(e.target.value)}
                                            className="h-4 w-4"
                                        />
                                        <label
                                            htmlFor={`status-${optionValue}`}
                                            className="ml-2 text-sm cursor-pointer"
                                        >
                                            {optionValue}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Or_Address แก้ได้ */}
                    <div>
                        <label className="block text-[#282151] mb-1">Shipping Address</label>
                        <textarea
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="w-full border border-[#7469B6] p-2"
                            rows={3}
                        />
                    </div>

                    {/* ปุ่ม Action */}
                    <div className="mt-5 flex justify-between pt-2">
                        {/* ปุ่ม Save: เป็น type="submit" เพื่อส่งฟอร์ม */}
                        <button
                            type="submit"
                            className="bg-[#6F63B0] text-white py-2 px-6 rounded-lg hover:bg-[#5c52a0] transition-all"
                        >
                            Save
                        </button>

                        {/* ปุ่ม Cancel: ต้องใส่ type="button" เพื่อไม่ให้มัน Submit ฟอร์ม */}
                        <button
                            type="button"
                            onClick={onClose}
                            className="text-sm text-gray-500 hover:underline"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}