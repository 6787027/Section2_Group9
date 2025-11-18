"use client"; // ระบุว่าไฟล์นี้เป็น Client Component

import { useState, FormEvent } from "react";

// Interface สำหรับกำหนดโครงสร้างข้อมูลของ Account
interface Account {
    email: string;
    fname: string;
    lname: string;
    phonenum: string;
    pass: string;
    type: string;
}

// Interface สำหรับ Props ที่ Modal นี้ต้องการ
interface EditModalProps {
    acc: Account;         // ข้อมูลบัญชีเดิมที่จะนำมาแก้ไข
    onClose: () => void;
    onSave: () => void;
}

export default function EditAccountModal({ acc, onClose, onSave }: EditModalProps) {
    // สร้าง State เพื่อเก็บค่าใน Form โดยกำหนดค่าเริ่มต้นจากข้อมูลเดิม
    const [email, setEmail] = useState(acc.email);
    const [fname, setFname] = useState(acc.fname);
    const [lname, setLname] = useState(acc.lname);
    const [phonenum, setPhonenum] = useState(acc.phonenum);
    const [type, setType] = useState(acc.type);

    // ฟังก์ชันสำหรับบันทึกข้อมูล (เปลี่ยนเป็น handleSubmit)
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault(); // ป้องกันไม่ให้หน้าเว็บ Refresh

        try {
            // ส่ง Request แบบ PUT ไปยัง API เพื่ออัปเดตข้อมูล
            const response = await fetch("http://localhost:3001/ad_account", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                // ส่งข้อมูลที่แก้ไขแล้วไปใน Body (Mapping Key ให้ตรงกับ Database/API)
                body: JSON.stringify({
                    Acc_Email: email,      // ใช้ Email เป็น Key ในการระบุ User ไม่ให้แก้ไข
                    Acc_FName: fname,
                    Acc_LName: lname,
                    Acc_PhoneNum: phonenum,
                    Acc_Type: type,
                }),
            });

            // ตรวจสอบสถานะการตอบกลับ
            if (response.ok) {
                alert("Account updated successfully!"); // แจ้งเตือนความสำเร็จ
                onSave();  // เรียกฟังก์ชันเพื่อ Refresh ข้อมูลในหน้าหลัก
                onClose(); // ปิด Modal
            } else {
                alert("Failed to update account."); // แจ้งเตือนความล้มเหลว
            }
        } catch (error) {
            console.error("Error updating account:", error);
        }
    };

    return (
        // Background Overlay: สีดำโปร่งแสง
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

            <div className="bg-white p-8 rounded-2xl shadow-xl w-[450px]">
                <h2 className="text-2xl font-bold text-center text-[#282151] mb-6">
                    Edit Account
                </h2>

                {/* เปลี่ยน div เป็น form และใส่ onSubmit */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Email Input (Read-only) */}
                    <div>
                        <label className="block text-[#282151] mb-1">Email</label>
                        <input
                            type="email"
                            value={email}
                            readOnly // ห้ามแก้ไข Email 
                            className="w-full border border-[#7469B6] p-2 bg-gray-100"
                        />
                    </div>

                    {/* First Name Input */}
                    <div>
                        <label className="block text-[#282151] mb-1">First name</label>
                        <input
                            type="text"
                            value={fname}
                            onChange={(e) => setFname(e.target.value)} // อัปเดต State เมื่อพิมพ์
                            className="w-full border border-[#7469B6] p-2"
                        />
                    </div>

                    {/* Last Name Input */}
                    <div>
                        <label className="block text-[#282151] mb-1">Last name</label>
                        <input
                            type="text"
                            value={lname}
                            onChange={(e) => setLname(e.target.value)}
                            className="w-full border border-[#7469B6] p-2"
                        />
                    </div>

                    {/* Type Selection (Drop down list) */}
                    <div>
                        <label className="block text-[#282151] mb-1">Type</label>
                        <select
                            name="type"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            className="w-full border border-[#7469B6] p-2"
                            required
                        >
                            <option value="">Select type</option>
                            <option value="User">User</option>
                            <option value="Admin">Admin</option>
                        </select>
                    </div>

                    {/* Phone Number Input */}
                    <div>
                        <label className="block text-[#282151] mb-1">Phone number</label>
                        <input
                            type="text"
                            value={phonenum}
                            onChange={(e) => setPhonenum(e.target.value)}
                            className="w-full border border-[#7469B6] p-2"
                        />
                    </div>

                    {/* Buttons Section: ปุ่ม Save และ Cancel */}
                    <div className="flex justify-between mt-5 pt-2">
                        {/* ปุ่ม Save: เปลี่ยน type เป็น submit */}
                        <button
                            type="submit"
                            className="bg-[#6F63B0] text-white py-2 px-6 rounded-lg hover:bg-[#5c52a0] transition-all"
                        >
                            Save
                        </button>

                        {/* ปุ่ม Cancel: เพิ่ม type button เพื่อกัน Submit */}
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
        </div >
    );
}