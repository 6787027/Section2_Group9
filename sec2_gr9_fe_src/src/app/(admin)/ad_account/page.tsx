"use client"

import Adacc from "@/components/built-components/acctable";
import { useEffect, useState } from "react";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import AddAccountModal from "@/components/built-components/AddAccountModal";

// Interface สำหรับกำหนดโครงสร้างข้อมูลของ Account
interface Account {
    Acc_Type: string;
    Acc_Password: string;
    Acc_PhoneNum: string;
    Acc_LName: string;
    Acc_FName: string;
    Acc_Email: string;
}

export default function Ad_account() {
    // --- State Management ---
    const [accounts, setAccounts] = useState<Account[]>([]); // เก็บข้อมูลบัญชี
    const [filterType, setFilterType] = useState<string>("all"); // Filter ประเภทบัญชี
    
    // แยก State: searchTerm สำหรับ API (Trigger การค้นหา) และ searchInput สำหรับช่องกรอกข้อความ
    const [searchTerm, setSearchTerm] = useState(""); 
    const [searchInput, setSearchInput] = useState(""); 

    const [isAuthLoading, setIsAuthLoading] = useState(true); // สถานะการโหลด Auth
    const [showAddModal, setShowAddModal] = useState(false); // Modal เพิ่มบัญชี

    // Hooks
    const router = useRouter();
    const auth = useAuth();

    // ตรวจสอบสิทธิ์ Admin
    useEffect(() => {
        if (auth.isLoading) return;
        if (!auth.user) {
            router.push("/login");
            return;
        }
        if (auth.user.type !== "Admin") {
            router.push("/user_profile");
            return;
        }
        setIsAuthLoading(false);
    }, [auth.isLoading, auth.user, router]);

    // useEffect สำหรับดึงข้อมูล (ทำงานเมื่อ filterType หรือ searchTerm เปลี่ยนแปลง)
    // *จะไม่ทำงานตอนพิมพ์ searchInput แต่จะรอจนกว่า setSearchTerm จะถูกเรียก*
    useEffect(() => {
        if (isAuthLoading) return;

        const fetchAccounts = async () => {
            try {
                const query = new URLSearchParams({
                    type: filterType,
                    search: searchTerm, // ใช้ค่า searchTerm ที่ยืนยันแล้ว
                }).toString();

                const res = await fetch(`http://localhost:3001/ad_account?${query}`);
                if (!res.ok) throw new Error("Failed to fetch");

                const result = await res.json();
                setAccounts(result);
            } catch (err) {
                console.error("Error fetching accounts:", err);
            }
        };

        fetchAccounts();
    }, [filterType, searchTerm, isAuthLoading]); // Dependencies: ไม่รวม searchInput

    // ฟังก์ชันเริ่มการค้นหา (กดปุ่มหรือ Enter)
    const handleSearch = () => {
        setSearchTerm(searchInput); // ย้ายค่าจาก Input ไปเป็น Term เพื่อ Trigger useEffect
    };

    // ฟังก์ชันจับปุ่ม Enter
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const handleLogout = () => {
        auth.logout();
        router.push("/home");
    };

    if (isAuthLoading) {
        return (
            <div className="bg-[#F1F0F4] min-h-screen w-screen flex justify-center items-center">
                <h1 className="text-2xl font-bold text-[#282151]">Verifying Admin Access...</h1>
            </div>
        );
    }

    return (
        <div className="bg-[#F1F0F4] flex flex-row">
            {/* Sidebar */}
            <div className="bg-white min-w-65 shadow-xl ">
                <header>
                    <div className="my-16 ml-8 justify-items-start">
                        <h1 className="text-[#282151] font-bold text-xl">
                            {auth.user?.firstName || "Admin"}
                        </h1>
                    </div>
                </header>
                <div className="mx-3 border-b-1 border-[#D9D9D9]"></div>
                <nav>
                    <div className="my-10 ml-8 text-xl justify-items-start">
                        <div className="mb-7 text-[#282151] font-bold">Tools</div>
                        <h2 className="mb-7 text-xl"><a href="/ad_product">Product</a></h2>
                        <h2 className="font-bold mb-7 text-xl"><a href="/ad_account">Account</a></h2>
                        <h2 className="text-xl mb-7"><a href="/ad_order">Order</a></h2>
                        <h2 className="text-xl"><a href="/ad_log">Login History</a></h2>
                    </div>
                </nav>
                <div className="items-baseline-last text-[#7469B6] mt-25 px-4">
                    <div className="flex flex-row">
                        <button onClick={handleLogout} className="px-4 py-2 flex flex-row ">
                            <LogOut className="mr-2"></LogOut> Logout
                        </button>
                    </div>
                </div>
            </div>

            <main className="flex flex-col m-15 mt-10">
                {/* Search Bar & Add Account Button */}
                <div className="flex justify-between bg-white w-250 py-3 mb-10 items-center border-solid border-1 border-white rounded-2xl shadow-xl">
                    <div className="ml-5">
                        {/* Search Input */}
                        <div className="flex flex-nowrap border-solid border-1 border-black rounded-3xl pl-3 pr-3 ">
                            <input
                                id="search"
                                type="text"
                                placeholder="Search by any field..."
                                value={searchInput} // ใช้ searchInput แทน searchTerm
                                onChange={(e) => setSearchInput(e.target.value)} // อัปเดตแค่ searchInput (ยังไม่ fetch)
                                onKeyDown={handleKeyDown} // เพิ่มให้กด Enter ได้
                                className="placeholder-[#D0D0D0] input-m ml-2 mr-2 my-1 pr-20 bg-white"
                            ></input>
                            <button type="button" onClick={handleSearch}> {/* เพิ่ม onClick ให้ปุ่มแว่นขยาย */}
                                <svg
                                    className="w-4 h-4 text-black dark:text-white cursor-pointer hover:text-gray-600"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeWidth="2"
                                        d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Add Account Button */}
                    <div className="mr-5 ">
                        <button
                            type="button"
                            onClick={() => setShowAddModal(true)}
                            className="flex flex-nowrap font-bold text-[#282151] bg-[#E8E6FB] p-2 border-solid border-1 border-[#E8E6FB] rounded-2xl"
                        >
                            <svg className="mr-2 w-6 h-6 text-[#282151] dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7 7V5" />
                            </svg>{" "}
                            Add Account
                        </button>
                    </div>
                </div>

                {/* Filter Section */}
                <div className="border-1 border-white rounded-t-2xl shadow-xl bg-white w-250 h-fit">
                    <div className="mt-3 ml-5 mb-2">
                        <label htmlFor="filter" className="text-[#7469B6] mr-2">Type</label>
                        <select
                            id="filter"
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value)}
                            className="select pl-3 text-grey-200 bg-white border-solid border-1 border-white rounded-xl shadow-xl"
                        >
                            <option value="all">Select a type</option>
                            <option value="User">User</option>
                            <option value="Admin">Admin</option>
                        </select>
                    </div>
                    <div className="border-b-1 border-[#D9D9D9]"></div>
                </div>

                {/* Display account table */}
                <div className="overflow-auto border-1 border-white rounded-b-2xl shadow-xl bg-white w-250 h-110">
                    <div>
                        <div className="overflow-auto">
                            <table className="table table-pin-rows table-pin-cols">
                                <thead>
                                    <tr>
                                        <th>Email</th>
                                        <th>Type</th>
                                        <th>First name</th>
                                        <th>Last name</th>
                                        <th>Phone number</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {accounts.length === 0 ? (
                                        <tr>
                                            <td colSpan={5} className="text-center text-gray-500">
                                                No accounts found
                                            </td>
                                        </tr>
                                    ) : (
                                        accounts.map((a) => (
                                            <Adacc
                                                key={a.Acc_Email}
                                                email={a.Acc_Email}
                                                fname={a.Acc_FName}
                                                lname={a.Acc_LName}
                                                phonenum={a.Acc_PhoneNum}
                                                pass={a.Acc_Password}
                                                type={a.Acc_Type}
                                            />
                                        ))
                                    )}
                                </tbody>
                            </table>

                            {showAddModal && (
                                <AddAccountModal
                                    onClose={() => setShowAddModal(false)}
                                    onSuccess={() => {
                                        setShowAddModal(false);
                                        // Refresh โดย trigger การ search อีกครั้งด้วยคำค้นเดิม
                                        const currentSearch = searchTerm;
                                        setSearchTerm(prev => prev + ' '); // Hack เล็กน้อยเพื่อให้ state เปลี่ยนถ้าค่าซ้ำ
                                        setTimeout(() => setSearchTerm(currentSearch), 0);
                                        // หรือถ้าอยาก refresh หน้าเว็บ: window.location.reload()
                                    }}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}