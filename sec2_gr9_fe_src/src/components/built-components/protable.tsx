"use client"

import React, { useState } from "react";
import EditModal from "./EditProfileModal"

interface Product {
    id: number;
    name: string;
    price: number;
    type: string;
    quantity: number;
    desc: string;
    colname: string;
    img1: string;
    img2: string;
    img3: string;
}

export default function Protable({ id, name, price, type, quantity, desc, colname, img1, img2, img3}: Product) {
    const [showEdit, setShowEdit] = useState(false);

    const productData = { id, name, price, type, quantity, desc, colname, img1, img2, img3};

    return (
        <tr>
            <td>{id}</td>

            <td>
                <img src={img1} width={80} alt={name} />
            </td>

            <td>{name}</td>
            <td>{quantity}</td>
            <td>{type}</td>
            <td>{colname}</td>
            <td>{price}</td>
            <td className="items-center">
                <button onClick={() => document.getElementById(`desc-${id}`)!.showModal()}>
                    <svg className="w-[24px] h-[24px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M18 14v4.833A1.166 1.166 0 0 1 16.833 20H5.167A1.167 1.167 0 0 1 4 18.833V7.167A1.166 1.166 0 0 1 5.167 6h4.618m4.447-2H20v5.768m-7.889 2.121 7.778-7.778" />
                    </svg>
                </button>
                <dialog id={`desc-${id}`} className="modal">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">{name}'s Description</h3>
                        <p className="py-4">{desc}</p>
                    </div>
                    <form method="dialog" className="modal-backdrop">
                        <button>Close</button>
                    </form>
                </dialog>
            </td>
            <td className="items-center">
                <div className=" flex flex-nowrap">
                    <button id="edit" onClick={() => setShowEdit(true)}> 
                        <svg className="w-[24px] h-[24px] text-black dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z" />
                        </svg>
                    </button> {/* Modal Edit */}
                    <div className="mx-5"></div>
                    <button id="delete">
                        <svg className="w-[24px] h-[24px] text-[#E00303] dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z" />
                        </svg>
                    </button>
                </div>
                {showEdit && (
                    <EditModal
                        key={id}
                        product={productData}
                        onClose={() => setShowEdit(false)}
                        onSave={() => window.location.reload()}
                    />
                )}
            </td>
        </tr>
    );
}
