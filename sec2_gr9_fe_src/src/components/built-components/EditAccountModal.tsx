"use client";
import { useState } from "react";

interface Account {
    email: string;
    fname: string;
    lname: string;
    phonenum: string;
    pass: string;
    type: string;
}

interface EditModalProps {
    acc: Account;
    onClose: () => void;
    onSave: () => void;
}

export default function EditAccountModal({ acc, onClose, onSave }: EditModalProps) {
    const [email, setEmail] = useState(acc.email);
    const [fname, setFname] = useState(acc.fname);
    const [lname, setLname] = useState(acc.lname);
    const [phonenum, setPhonenum] = useState(acc.phonenum);
    const [type, setType] = useState(acc.type);

    const handleSave = async () => {
        try {
            const response = await fetch("http://localhost:3001/ad_account", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    Acc_Email: email,
                    Acc_FName: fname,
                    Acc_LName: lname,
                    Acc_PhoneNum: phonenum,
                    Acc_Type: type,
                }),
            });

            if (response.ok) {
                alert("Account updated successfully!");
                onSave();
                onClose();
            } else {
                alert("Failed to update account.");
            }
        } catch (error) {
            console.error("Error updating account:", error);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-[450px]">
                <h2 className="text-2xl font-bold text-center text-[#282151] mb-6">
                    Edit Account
                </h2>

                <div className="space-y-4">
                    <div>
                        <label className="block text-[#282151] mb-1">Email</label>
                        <input
                            type="email"
                            value={email}
                            readOnly
                            className="w-full border border-[#7469B6] p-2"
                        />
                    </div>

                    <div>
                        <label className="block text-[#282151] mb-1">First name</label>
                        <input
                            type="text"
                            value={fname}
                            onChange={(e) => setFname(e.target.value)}
                            className="w-full border border-[#7469B6] p-2"
                        />
                    </div>

                    <div className="mt-3">
                        <label className="block text-[#282151] mb-1">Last name</label>
                        <input
                            type="text"
                            value={lname}
                            onChange={(e) => setLname(e.target.value)}
                            className="w-full border border-[#7469B6] p-2"
                        />
                    </div>


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

                    <div>
                        <label className="block text-[#282151] mb-1">Phone number</label>
                        <input
                            type="text"
                            value={phonenum}
                            onChange={(e) => setPhonenum(e.target.value)}
                            className="w-full border border-[#7469B6] p-2"
                        />
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
        </div >
    );
}
