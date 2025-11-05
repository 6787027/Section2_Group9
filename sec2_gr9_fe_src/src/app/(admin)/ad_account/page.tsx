"use client"
import Adacc from "@/components/built-components/acctable"
import ImgOrder from "@/assets/ImageOrder.png"
import { notFound, useParams } from "next/navigation";
import { useState } from "react";


const ALL_ACCOUNTS = [
    { email: "thananchanok@gmail.com", fname: "thananchanok", lname: "chuensaeng", type: "User", pass: "1234", phonenum: "0812222222" },
    { email: "Admin123@gmail.com", fname: "admin123", lname: "naja", type: "Admin", pass: "ict555", phonenum: "0444444444" },
    { email: "celestecraft@gmail.com", fname: "NongNoey", lname: "EangKub", type: "Admin", pass: "ilovemyjob", phonenum: "0132456848" },
    { email: "maewnamQ@outlook.co.th", fname: "MaewNam", lname: "Oung Oung", type: "User", pass: "mafiahadyai123", phonenum: "0789541213" }
];

export default function Ad_account() {
    const [accounts] = useState(ALL_ACCOUNTS)
    const [filterType, setFilterType] = useState<string>("all");
    const [searchTerm, setSearchTerm] = useState("");

    const filteredByType =
        filterType === "all"
            ? accounts
            : accounts.filter((a) => a.type === filterType);


    const filteredAccount = filteredByType.filter((a) => {
        const keyword = searchTerm.toLowerCase();
        return (
            a.fname.toLowerCase().toString().includes(keyword) ||
            a.lname.toLowerCase().includes(keyword) ||
            a.email.toString().includes(keyword)
        );
    });




    return (
        <div className="bg-[#F1F0F4] min-h-screen min-w-screen flex flex-row">
            <div className="bg-white min-w-65 shadow-xl ">
                <header>
                    <div className="my-16 ml-8 justify-items-start">
                        <h1 className="text-[#282151] font-bold text-xl">Admin name</h1>
                    </div>
                </header>
                <div className="mx-3 border-b-1 border-[#D9D9D9]"></div>
                <nav>
                    <div className="my-10 ml-8 text-xl justify-items-start">
                        <div className="mb-7 text-[#282151] font-bold">Tools</div>
                        <h2 className="mb-7 text-xl"><a href="/ad_product">Product</a><br></br></h2>
                        <h2 className="font-bold mb-7 text-xl"><a href="/ad_account">Account</a><br></br></h2>
                        <h2 className="text-xl"><a href="/ad_order">Order</a><br></br></h2>
                    </div>
                </nav>
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
                                onChange={(e) => setSearchTerm(e.target.value)} className="placeholder-[#D0D0D0] input-m ml-2 mr-2 my-1 pr-20 bg-white"></input>
                            <button type="button" >
                                <svg className="w-4 h-4 text-black dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className="mr-5 ">
                        <button type="button" className="flex flex-nowrap font-bold text-[#282151] bg-[#E8E6FB] p-2 border-solid border-1 border-[#E8E6FB] rounded-2xl">
                            <svg className="mr-2 w-6 h-6 text-[#282151] dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7 7V5" />
                            </svg> Add Product
                        </button>
                    </div>
                </div>
                <div className="border-1 border-white rounded-t-2xl shadow-xl bg-white w-250 h-fit">
                    <div className="mt-3 ml-5 mb-2">
                        <label htmlFor="filter" className="text-[#7469B6] mr-2">Type</label>
                        <select
                            id="filter"
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value)}
                            className="select pl-3 text-grey-200 bg-white border-solid border-1 border-white rounded-xl shadow-xl">
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
                                    {filteredAccount.length === 0 ? (
                                        <p className="text-gray-500 text-center">No products found</p>
                                    ) : (
                                        filteredAccount.map((a) => (
                                            <Adacc key={a.email}
                                                email = {a.email}
                                                fname = {a.fname}
                                                lname = {a.lname}
                                                phonenum = {a.phonenum}
                                                pass = {a.pass}
                                                type = {a.type}
                                            >
                                            </Adacc>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
