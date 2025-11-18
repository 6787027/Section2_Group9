import React, { useState } from "react";

// กำหนด Interface สำหรับ Props 
interface AddAccountModalProps {
    onClose: () => void;
    onSuccess: () => void;
}

export default function AddAccountModal({ onClose, onSuccess }: AddAccountModalProps) {
    // เก็บข้อมูลจาก Form Input ทั้งหมดไว้ใน Object เดียว
    const [formData, setFormData] = useState({
        email: "",
        fname: "",
        lname: "",
        phonenum: "",
        pass: "",
        type: "", // จะเก็บค่า "User" หรือ "Admin"
    });


    // ฟังก์ชันสำหรับอัปเดต State เมื่อผู้ใช้พิมพ์ข้อมูลใน Input
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        // ใช้ Spread Operator (...) เพื่อรักษาค่าเดิมใน Field อื่นๆ ไว้
        // และอัปเดตเฉพาะ Field ที่กำลังพิมพ์ (ระบุด้วย e.target.name)
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // ฟังก์ชันสำหรับบันทึกข้อมูล (Submit Form)
    const handleAdd = async () => {
        try {
            // ส่ง Request แบบ POST ไปยัง API เพื่อสร้างบัญชีใหม่
            const res = await fetch("http://localhost:3001/ad_account", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData), // แปลงข้อมูลใน State เป็น JSON
            });

            const data = await res.json();

            // ตรวจสอบผลลัพธ์จาก Server
            if (res.ok) {
                alert("Account added successfully!"); // แจ้งเตือนความสำเร็จ
                onClose();   // ปิด Modal
                onSuccess(); // เรียก Callback เพื่อให้หน้าหลักอัปเดตข้อมูล
            } else {
                alert("Failed to add product: " + data.message); // แจ้งเตือนเมื่อล้มเหลว
            }
        } catch (err) {
            console.error(err);
            alert("Server error");
        }
    };


    return (
        //  Background Overlay: สีดำโปร่งแสง (fixed เต็มหน้าจอ)
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

            <div className="bg-white rounded-xl shadow-2xl w-[600px] p-6 relative max-h-[90vh] overflow-y-auto">
                <h2 className="text-3xl font-bold text-center mb-4">Add Account</h2>

                {/* Form Section */}
                <form
                    onSubmit={(e) => {
                        e.preventDefault(); // ป้องกันการ Refresh หน้าเว็บ
                        handleAdd(); // เรียกฟังก์ชันเพิ่มข้อมูล
                    }}
                >
                    <div className="text-[#7469B6]">

                        {/* Email Input */}
                        <label className="block text-sm font-semibold mb-1">Email</label>
                        <input
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter email"
                            className="border p-2 border-[#7469B6] w-full mb-3"
                            required
                        />

                        {/* Password Input */}
                        <div>
                            <label className="block text-sm font-semibold mb-1">Password</label>
                            <input
                                name="pass"
                                type="text" // ใช้ text เพราะต้องการให้เห็นว่าใส่ค่าอะไรไปก่อนจะทำไป encrypt ที่ backend
                                value={formData.pass}
                                onChange={handleChange}
                                placeholder="Enter password"
                                className="border p-2 border-[#7469B6] w-full"
                                required
                            />
                        </div>

                        {/* First Name & Last Name (จัดวางแนวนอนคู่กัน) */}
                        <div className="mt-5 flex items-center justify-between">
                            <div className="flex flex-col">
                                <label className="mr-5 block text-sm font-semibold text-nowrap mb-1">First name</label>
                                <input
                                    name="fname"
                                    type="text"
                                    value={formData.fname}
                                    onChange={handleChange}
                                    placeholder="Enter first name"
                                    className="border p-2 border-[#7469B6] w-60 mb-3"
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
                                    className="border p-2 border-[#7469B6] w-60 mb-3"
                                    required
                                />
                            </div>
                        </div>

                        {/* Type Selection (Drop down list) */}
                        <label className="mr-13 block text-sm font-semibold mb-1">Type</label>
                        <select
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            className="border p-2 border-[#7469B6] w-full mb-3 bg-white"
                            required
                        >
                            <option value="">Select type</option>
                            <option value="User">User</option>
                            <option value="Admin">Admin</option>
                        </select>

                        {/* Phone Number Input */}
                        <label className="block text-sm font-semibold mb-1">Phone Number</label>
                        <input
                            name="phonenum"
                            type="text"
                            value={formData.phonenum}
                            onChange={handleChange}
                            placeholder="Enter phone number" // แก้ไข placeholder ให้ตรงกับบริบท
                            className="border p-2 border-[#7469B6] w-full mb-5"
                        />

                        {/* Buttons Section: Submit & Cancel */}
                        <div className="mt-2 flex justify-between">
                            <button
                                type="submit"
                                className="bg-[#7469B6] text-white px-4 py-2 rounded hover:bg-[#7469B6]"
                            >
                                Add Account
                            </button>

                            <button
                                type="button"
                                onClick={onClose} // ปิด Modal
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