"use client";
import Adacc from "@/components/built-components/acctable";
import { useEffect, useState } from "react";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import AddAccountModal from "@/components/built-components/AddAccountModal";

interface Account {
    Acc_Type: string;
    Acc_Password: string;
    Acc_PhoneNum: string;
    Acc_LName: string;
    Acc_FName: string;
    Acc_Email: string;
}

export default function Ad_account() {
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [filterType, setFilterType] = useState<string>("all");
    const [searchTerm, setSearchTerm] = useState("");
    const router = useRouter();
    const auth = useAuth();
    const [isAuthLoading, setIsAuthLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);


    useEffect(() => {
        // ถ้าระบบ Auth (จาก AuthProvider) ยังโหลดไม่เสร็จ ให้รอก่อน
        if (auth.isLoading) {
            return;
        }
        // ถ้าโหลดเสร็จ แต่ "ไม่มี" user, เด้งไปหน้า login
        if (!auth.user) {
            router.push("/login");
            return;
        }
        // ถ้า "มี" user แต่ "ไม่ใช่" Admin, เด้งไปหน้า user profile
        if (auth.user.type !== "Admin") {
            router.push("/user_profile");
            return;
        }
        // ถ้ามาถึงตรงนี้ = เป็น Admin จริง
        setIsAuthLoading(false); // อนุญาตให้แสดงผลหน้าเว็บ
    }, [auth.isLoading, auth.user, router]);


    useEffect(() => {
        // เพิ่ม Guard: ถ้ารอตรวจสอบสิทธิ์ ห้าม fetch
        if (isAuthLoading) {
            return;
        }

        const fetchAccounts = async () => {
            try {
                const query = new URLSearchParams({
                    type: filterType,
                    search: searchTerm,
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
    }, [filterType, searchTerm, isAuthLoading]);

    const handleLogout = () => {
        auth.logout(); // เคลียร์ token และ user ออกจาก context/localStorage
        router.push("/home"); // กลับไปหน้า Home
    };


    if (isAuthLoading) {
        return (
            <div className="bg-[#F1F0F4] min-h-screen w-screen flex justify-center items-center">
                <h1 className="text-2xl font-bold text-[#282151]">
                    Verifying Admin Access...
                </h1>
            </div>
        );
    }

    return (
        <div className="bg-[#F1F0F4] min-h-screen min-w-screen flex flex-row">
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
                        <h2 className="mb-7 text-xl">
                            <a href="/ad_product">Product</a>
                            <br></br>
                        </h2>
                        <h2 className="font-bold mb-7 text-xl">
                            <a href="/ad_account">Account</a>
                            <br></br>
                        </h2>
                        <h2 className="text-xl mb-7">
                            <a href="/ad_order">Order</a>
                            <br></br>
                        </h2>
                        <h2 className="text-xl">
                            <a href="/ad_log">Login History</a>
                            <br></br>
                        </h2>
                    </div>
                </nav>
                <div className="items-baseline-last text-[#7469B6] mt-25 px-4">
                    <div className="flex flex-row">
                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 flex flex-row "
                        >
                            <LogOut className="mr-2"></LogOut> Logout
                        </button>
                    </div>
                </div>
            </div>

            <main className="flex flex-col m-15 mt-10">
                <div className="flex justify-between bg-white w-250 py-3 mb-10 items-center border-solid border-1 border-white rounded-2xl shadow-xl">
                    <div className="ml-5">
                        <div className="flex flex-nowrap border-solid border-1 border-black rounded-3xl pl-3 pr-3 ">
                            <input
                                id="search"
                                type="text"
                                placeholder="Search by any field..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="placeholder-[#D0D0D0] input-m ml-2 mr-2 my-1 pr-20 bg-white"
                            ></input>
                            <button type="button">
                                <svg
                                    className="w-4 h-4 text-black dark:text-white"
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
                    <div className="mr-5 ">
                        <button
                            type="button"
                            onClick={() => setShowAddModal(true)}
                            className="flex flex-nowrap font-bold text-[#282151] bg-[#E8E6FB] p-2 border-solid border-1 border-[#E8E6FB] rounded-2xl"
                        >
                            <svg
                                className="mr-2 w-6 h-6 text-[#282151] dark:text-white"
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
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M5 12h14m-7 7V5"
                                />
                            </svg>{" "}
                            Add Account
                        </button>
                    </div>
                </div>
                <div className="border-1 border-white rounded-t-2xl shadow-xl bg-white w-250 h-fit">
                    <div className="mt-3 ml-5 mb-2">
                        <label htmlFor="filter" className="text-[#7469B6] mr-2">
                            Type
                        </label>
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
                <div className="overflow-auto border-1 border-white rounded-b-2xl shadow-xl bg-white w-250 h-110">
                    <div>
                        <div className="overflow-auto">
                            <table className="table table-pin-rows table-pin-cols">
                                {/* head */}
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
                                        const currentSearch = searchTerm;
                                        setSearchTerm(prev => prev + ' ');
                                        setSearchTerm(currentSearch);
                                        window.location.reload()
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