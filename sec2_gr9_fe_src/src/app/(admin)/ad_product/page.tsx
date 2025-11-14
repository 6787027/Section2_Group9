"use client";


import { LogOut } from "lucide-react";
import Adpro from "@/components/built-components/protable";
import { useEffect, useState } from "react";
import AddProductModal from "@/components/built-components/AddProductModal";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";

interface Product {
    Pic_f: any;
    Pic_b: any;
    Pic_s: any;
    Col_Name: string;
    Pro_Description: string;
    Pro_Quantity: number;
    Pro_Type: string;
    Pro_Price: number;
    Pro_Name: string;
    Pro_ID: any;
}

export default function Ad_product() {
    const [products, setProducts] = useState<Product[]>([]);
    const [filterType, setFilterType] = useState<string>("all");
    const [searchTerm, setSearchTerm] = useState("");
    const [showAddModal, setShowAddModal] = useState(false);

    const router = useRouter();
    const auth = useAuth();


    const [isAuthLoading, setIsAuthLoading] = useState(true);


    useEffect(() => {

        if (auth.isLoading) {
            return;
        }

        if (!auth.user) {
            router.push("/login");
            return;
        }

        if (auth.user.type !== 'Admin') {
            router.push("/user_profile");
            return;
        }

        setIsAuthLoading(false); // อนุญาตให้แสดงผลหน้าเว็บ

    }, [auth.isLoading, auth.user, router]);


    useEffect(() => {
        if (isAuthLoading) {
            return;
        }

        fetch(`http://localhost:3001/ad_product?search=${searchTerm}&type=${filterType}`)
            .then(res => res.json())
            .then(data => setProducts(data))
            .catch(err => console.error("Error loading products:", err));

    }, [searchTerm, filterType, isAuthLoading]);

    const handleLogout = () => {
        auth.logout();
        router.push("/home");
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

            {/* Sidebar */}
            <div className="bg-white min-w-65 shadow-xl">
                <header>
                    <div className="my-16 ml-8">
                        <h1 id="adname" className="text-[#282151] font-bold text-xl">
                            {auth.user?.firstName || "Admin"}
                        </h1>
                    </div>
                </header>

                <div className="mx-3 border-b-1 border-[#D9D9D9]"></div>

                <nav className="my-10 ml-8 text-xl">
                    <div className="mb-7 text-[#282151] font-bold">Tools</div>
                    <h2 className="mb-7 font-bold"><a href="/ad_product">Product</a></h2>
                    <h2 className="mb-7"><a href="/ad_account">Account</a></h2>
                    <h2><a href="/ad_order">Order</a></h2>
                </nav>
                <div className="items-baseline-last text-[#7469B6] mt-25 px-4">
                    <div className="flex flex-row">
                        <button onClick={handleLogout} className="px-4 py-2 flex flex-row " ><LogOut className="mr-2"></LogOut> Logout</button>
                    </div>
                </div>

            </div>

            {/* Content */}
            <main className="flex flex-col m-15 mt-10">

                {/* Search bar */}
                <div className="flex justify-between bg-white w-250 py-3 mb-10 items-center border-1 rounded-2xl shadow-xl">

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

                    <div className="mr-5">
                        <button onClick={() => setShowAddModal(true)} className="flex font-bold text-[#282151] bg-[#E8E6FB] p-2 border-1 rounded-2xl">
                            <svg className="mr-2 w-6 h-6 text-[#282151] dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7 7V5" />
                            </svg> Add Product
                        </button>
                    </div>
                </div>

                {/* Filter */}
                <div className="border-1 bg-white rounded-t-2xl shadow-xl w-250 h-fit">
                    <div className="mt-3 ml-5 mb-2">
                        <label htmlFor="filter" className="text-[#7469B6] mr-2">Type</label>
                        <select
                            id="filter"
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value)}
                            className="select pl-3 bg-white border-1 rounded-xl shadow-xl"
                        >
                            <option value="all">Select a Type</option>
                            <option value="Doll">Doll</option>
                            <option value="Accessory">Accessory</option>
                        </select>
                    </div>
                    <div className="border-b-1 border-[#D9D9D9]"></div>
                </div>

                {/* Table */}
                <div className="overflow-auto border-1 bg-white rounded-b-2xl shadow-xl w-250 h-110">
                    <table className="table table-pin-rows table-pin-cols">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Picture</th>
                                <th>Product Name</th>
                                <th>Quantity</th>
                                <th>Type</th>
                                <th>Category/Collection</th>
                                <th>Price</th>
                                <th>Description</th>
                            </tr>
                        </thead>

                        <tbody>
                            {products.length === 0 ? (
                                <tr>
                                    <td colSpan={8} className="text-center py-4 text-gray-500">
                                        No products found
                                    </td>
                                </tr>
                            ) : (
                                products.map(p => (
                                    <Adpro
                                        key={p.Pro_ID}
                                        id={p.Pro_ID}
                                        name={p.Pro_Name}
                                        price={p.Pro_Price}
                                        type={p.Pro_Type}
                                        colname={p.Col_Name}
                                        quantity={p.Pro_Quantity}
                                        desc={p.Pro_Description}
                                        img1={p.Pic_f}
                                        img2={p.Pic_s}
                                        img3={p.Pic_b} />
                                ))
                            )}
                        </tbody>
                    </table>
                    {showAddModal && (
                        <AddProductModal
                            onClose={() => setShowAddModal(false)}
                            onSuccess={() => { window.location.reload() }}
                        />
                    )}
                </div>
            </main>
        </div>
    );
}
