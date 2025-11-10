//AI
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function EditProfileModal({ open, onClose }) {
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
    });

    // needed to be edit
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // needed to be edit
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(form);
        onClose();
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
                        className="bg-white rounded-2xl shadow-2xl p-8 w-[420px]"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                    >
                        <h2 className="text-center text-xl font-semibold mb-6 text-[#282151]">Edit Profile</h2>
                        <form onSubmit={handleSubmit} className="space-y-4 ">
                            <div className="grid grid-cols-2 gap-4 text-[#7469B6]">
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

                            <div className="text-[#7469B6]">
                                <div className="grid justify-items-start py-2">
                                    <span className=" text-sm">Email</span>
                                </div>

                                <div className="w-full border-[#7469B6] border p-2 mt-1 grid justify-items-start ">
                                    <span className="" id="email">thananchanok.chu@student.mahidol.edu</span>
                                </div>
                            </div>

                            <div className="text-[#7469B6]">
                                <label className="block text-left text-sm">Phone number</label>
                                <input
                                    type="text"
                                    name="phone"
                                    value={form.phone}
                                    onChange={handleChange}
                                    className="w-full border-[#7469B6] border  p-2 mt-1"
                                />
                            </div>

                            <div className="text-[#7469B6]">
                                <label className="block text-left text-sm">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    className="w-full border-[#7469B6] border p-2 mt-1"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-[#7469B6] text-white py-2 rounded-xl mt-4"
                            >
                                Save
                            </button>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
