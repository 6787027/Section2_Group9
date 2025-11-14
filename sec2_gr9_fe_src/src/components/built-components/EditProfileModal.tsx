"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function EditProfileModal({ open, onClose, profile, refreshProfile }) {
  const [form, setForm] = useState({
    firstName: profile?.Acc_FName || "",
    lastName: profile?.Acc_LName || "",
    email: profile?.Acc_Email || "",
    phone: profile?.Acc_PhoneNum || "",
    password: "",
  });

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
  }, [profile]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:3001/user_profile", { // 👈 แก้จาก "/api/user/update"
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: form.email, // ใช้ email จาก form (แต่แก้ไม่ได้)
        fname: form.firstName,
        lname: form.lastName,
        phone: form.phone,
        password: form.password,
      }),

    });

    const data = await res.json();
    if (res.ok) {
      alert("Profile updated successfully!");
      onClose();
      refreshProfile(); // reload data
    } else {
      alert("Failed to update: " + data.message);
    }
  };


  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-2xl shadow-2xl p-8 w-[600px]"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-center text-2xl font-bold mb-6 text-[#282151]">
              Edit Profile
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4 text-[#7469B6]">
              <div className="grid grid-cols-2 gap-4">
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

              <div className="mt-5 justify-between flex ">

                <button
                  type="submit"
                  className="bg-[#7469B6] px-7 text-white py-2 rounded-xl"
                >
                  Save
                </button>

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
