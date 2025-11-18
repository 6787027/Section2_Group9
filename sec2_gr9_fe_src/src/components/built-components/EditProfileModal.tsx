"use client"

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function EditProfileModal({ open, onClose, profile, refreshProfile }) {
  // กำหนด state สำหรับเก็บค่าใน form โดยดึงค่าเริ่มต้นมาจาก profile หรือใช้ "" ถ้าไม่มี
  const [form, setForm] = useState({
    firstName: profile?.Acc_FName || "",
    lastName: profile?.Acc_LName || "",
    email: profile?.Acc_Email || "",
    phone: profile?.Acc_PhoneNum || "",
    password: "",
  });

  // ใช้ useEffect เพื่อ update state ของ form เมื่อมีการเปลี่ยนแปลงของข้อมูล
  useEffect(() => {
    if (profile) {
      setForm({
        firstName: profile.Acc_FName,
        lastName: profile.Acc_LName,
        email: profile.Acc_Email,
        phone: profile.Acc_PhoneNum,
        password: "",
      });
    }
  }, [profile]); // Dependency array: รันเมื่อ 'profile' เปลี่ยน

  // เมื่อมีการเปลี่ยนแปลงก็ให้ update state ของ form โดยใช้ชื่อ (name) ของ input เป็น key
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ถ้ากดปุ่มบันทึก
  const handleSubmit = async (e) => {
    e.preventDefault(); // ไม่ให้เกิดการ reload ของ html
    const res = await fetch("http://localhost:3001/user_profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        // ส่งข้อมูลไป update
        email: form.email, // ใช้ email จาก form แต่จะไม่ให้แก้เพราะเป็น Primary key
        fname: form.firstName,
        lname: form.lastName,
        phone: form.phone,
        password: form.password // ส่งรหัสผ่านใหม่ ถ้ามีการกรอก
      }),

    });

    // รอการดำเนินการใน backend เมื่อสำเร็จหรือไม่สำเร็จ ก็จะส่งข้อมูล respond กลับมา
    const data = await res.json();
    if (res.ok) {
      // ถ้าสำเร็จ
      alert("Profile updated successfully!");
      onClose();
      refreshProfile(); // reload data
    } else {
      //ถ้าไม่สำเร็จ
      alert("Failed to update: " + data.message);
    }
  };


  return (
    // AnimatePresence จัดการการมี/ไม่มี (mount/unmount) ของคอมโพเนนต์ลูกด้วยแอนิเมชัน
    <AnimatePresence>
      {open && ( // แสดง Modal เมื่อ prop 'open' เป็น true
        // ส่วนของ Backdrop (พื้นหลังมืด)
        <motion.div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          initial={{ opacity: 0 }} // สถานะเริ่มต้น (ซ่อน)
          animate={{ opacity: 1 }} // สถานะเมื่อแสดง
          exit={{ opacity: 0 }} // สถานะเมื่อซ่อน
        >
          {/* ส่วนของ Modal/Content Box */}
          <motion.div
            className="bg-white rounded-2xl shadow-2xl p-8 w-[600px]"
            initial={{ scale: 0.8, opacity: 0 }} // สถานะเริ่มต้นของ Modal
            animate={{ scale: 1, opacity: 1 }} // สถานะเมื่อแสดง Modal
            exit={{ scale: 0.8, opacity: 0 }} // สถานะเมื่อซ่อน Modal
            onClick={(e) => e.stopPropagation()} // หยุด event propagation เพื่อไม่ให้คลิกใน Modal ไปปิด Backdrop
          >
            {/* header */}
            <h2 className="text-center text-2xl font-bold mb-6 text-[#282151]">
              Edit Profile
            </h2>

            {/* ฟอร์มสำหรับแก้ไขโปรไฟล์ */}
            <form onSubmit={handleSubmit} className="space-y-4 text-[#7469B6]">
              <div className="grid grid-cols-2 gap-4">

                {/* Firstname */}
                <div>
                  <label className="block text-left text-sm">First name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    className="w-full border-[#7469B6] border p-2 mt-1"
                  />
                </div>

                {/* Lastname */}
                <div>
                  <label className="block text-left text-sm">Last name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    className="w-full border-[#7469B6] border p-2 mt-1"
                  />
                </div>
              </div>

              {/* Phone number */}
              <div>
                <label className="block text-left text-sm">Phone number</label>
                <input
                  type="text"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full border-[#7469B6] border p-2 mt-1"
                />
              </div>

              {/*Password (สำหรับกรอกเมื่อต้องการเปลี่ยน) */}
              <div>
                <label className="block text-left text-sm">Password</label>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full border-[#7469B6] border p-2 mt-1"
                />
              </div>

              {/* ปุ่ม */}
              <div className="mt-5 justify-between flex ">
                {/* ปุ่ม Save (เรียก handleSubmit) */}
                <button
                  type="submit"
                  className="bg-[#7469B6] px-7 text-white py-2 rounded-xl"
                >
                  Save
                </button>
                {/* ปุ่ม Cancel (เรียก onClose) */}
                <button
                  type="button"
                  onClick={onClose}
                  className="py-2 px-5 bg-gray-200 text-gray-800 rounded-xl hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
