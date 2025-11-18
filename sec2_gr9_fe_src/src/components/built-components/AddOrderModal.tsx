import React, { useState } from "react";

// Component Modal สำหรับเพิ่ม Order ใหม่
export default function AddOrderModal({ onClose, onSuccess }) {

    // เก็บค่าจาก Form input ต่างๆ
    const [formData, setFormData] = useState({
        price: "",
        status: "Ordered", // ค่า Default เริ่มต้น
        email: "",
        address: ""
    });

    // --- Event Handlers ---
    // ฟังก์ชันสำหรับอัปเดต State เมื่อมีการพิมพ์ข้อมูลใน Input
    const handleChange = (e) => {
        // ใช้ Spread Operator (...) เพื่อคงค่าเดิมไว้ และอัปเดตเฉพาะ field ที่มีการเปลี่ยนแปลง
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // ฟังก์ชันสำหรับส่งข้อมูลไปยัง API (Submit Form)
    const handleAdd = async () => {
        try {
            // ส่ง Request แบบ POST ไปยัง API
            const res = await fetch("http://localhost:3001/ad_order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData), // แปลงข้อมูลใน State เป็น JSON
            });

            const data = await res.json();

            // ตรวจสอบผลลัพธ์
            if (res.ok) {
                alert("Order added successfully!"); // แจ้งเตือนเมื่อสำเร็จ
                onClose();   // ปิด Modal
                onSuccess(); // เรียกฟังก์ชัน Callback (เช่น เพื่อรีโหลดหน้าเว็บ)
            } else {
                alert("Failed to add order: " + data.message); // แจ้งเตือนเมื่อล้มเหลว
            }
        } catch (err) {
            console.error(err);
            alert("Server error");
        }
    };

    return (
        // Modal Overlay: พื้นหลังสีดำโปร่งแสง
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

            {/* Modal Container */}
            <div className="bg-white rounded-xl shadow-2xl w-[600px] p-6 relative max-h-[90vh] overflow-y-auto">
                <h2 className="text-3xl font-bold text-center mb-4">Add Order</h2>

                {/* Form Input Section */}
                <form
                    onSubmit={(e) => {
                        e.preventDefault(); // ป้องกันการ Refresh หน้าเว็บเมื่อกด Submit
                        handleAdd(); // เรียกฟังก์ชันเพิ่มข้อมูล
                    }}
                >
                    <div className="text-[#7469B6]">

                        {/* Email Input */}
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

                        {/* Price Input */}
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

                        {/* Status Selection (Radio Buttons) */}
                        <label className="block mb-1">Status</label>
                        <div className="w-full border border-[#7469B6] p-2 mb-3">
                            <div className="flex flex-col gap-2">
                                {/*  */}{/* Loop สร้าง Radio button สำหรับแต่ละสถานะ */}
                                {["Ordered", "Paid", "Prepared", "Sent"].map((optionValue) => (
                                    <div key={optionValue} className="flex items-center">
                                        <input
                                            type="radio"
                                            name="status"
                                            value={formData.status}
                                            onChange={() => setFormData({ ...formData, status: optionValue })}
                                            checked={formData.status === optionValue} // ตรวจสอบว่าสถานะปัจจุบันตรงกับตัวเลือกนี้หรือไม่
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

                        {/* Address Input */}
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


                        {/* Buttons: Submit & Cancel */}
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