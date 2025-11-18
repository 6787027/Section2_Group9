"use client"

import React, { useState } from "react";
import EditModal from "./Editproductmodal"

// Interface สำหรับกำหนดโครงสร้างข้อมูลของ Product (Props ที่รับเข้ามา)
interface Product {
    id: string;
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

export default function Protable({ id, name, price, type, quantity, desc, colname, img1, img2, img3 }: Product) {
    // State สำหรับควบคุมการแสดง Modal แก้ไขข้อมูล (Edit Modal)
    const [showEdit, setShowEdit] = useState(false);
    // State สำหรับควบคุมการแสดง Modal ยืนยันการลบ (Delete Confirmation Modal)
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    // รวมข้อมูล Product เป็น Object เพื่อส่งไปให้ EditModal
    const productData = { id, name, price, type, quantity, desc, colname, img1, img2, img3 };

    // ฟังก์ชันสำหรับลบสินค้า (Delete Product)
    const handleDelete = async () => {
        try {
            // ส่ง Request Method DELETE ไปยัง API โดยระบุ ID ของสินค้า
            const res = await fetch(`http://localhost:3001/v1/products/${id}`, {
                method: "DELETE",
            });

            // ตรวจสอบผลลัพธ์
            if (res.ok) {
                alert("Product deleted successfully!"); // แจ้งเตือนเมื่อสำเร็จ
                window.location.reload(); // refresh หน้าหลังลบเสร็จเพื่ออัปเดตข้อมูล
            } else {
                alert("Failed to delete product"); // แจ้งเตือนเมื่อล้มเหลว
            }
        } catch (err) {
            console.error("Error deleting product:", err);
            alert("Error deleting product");
        }
    };

    return (
        <tr>
            {/* แสดง ID สินค้า */}
            <td>{id}</td>

            {/* แสดงรูปภาพสินค้า */}
            <td>
                <img src={img1} width={80} alt={name} />
            </td>

            {/* แสดงข้อมูลสินค้าในแต่ละคอลัมน์ */}
            <td>{name}</td>
            <td>{quantity}</td>
            <td>{type}</td>
            <td>{colname}</td>
            <td>{price}</td>

            {/* คอลัมน์สำหรับปุ่มดูรายละเอียด Description */}
            <td className="text-center">
                {/* ปุ่มเปิด Modal ดู Description โดยใช้ ID ของ Dialog */}
                <button onClick={() => document.getElementById(`desc-${id}`)!.showModal()}>
                    <svg className="w-[24px] h-[24px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M18 14v4.833A1.166 1.166 0 0 1 16.833 20H5.167A1.167 1.167 0 0 1 4 18.833V7.167A1.166 1.166 0 0 1 5.167 6h4.618m4.447-2H20v5.768m-7.889 2.121 7.778-7.778" />
                    </svg>
                </button>

                {/* Dialog สำหรับแสดง Description */}
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

            {/* คอลัมน์สำหรับปุ่ม Action (Edit / Delete) */}
            <td className="items-center">
                <div className=" flex flex-nowrap">
                    {/* ปุ่ม Edit: เมื่อกดจะตั้งค่า showEdit เป็น true เพื่อเปิด Modal */}
                    <button id="edit" onClick={() => setShowEdit(true)}>
                        <svg className="w-[24px] h-[24px] text-black dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z" />
                        </svg>
                    </button>
                    <div className="mx-5"></div>

                    {/* ปุ่ม Delete: เมื่อกดจะตั้งค่า showDeleteConfirm เป็น true เพื่อเปิด Modal ยืนยัน */}
                    <button id="delete" onClick={() => setShowDeleteConfirm(true)}>
                        <svg className="w-[24px] h-[24px] text-[#E00303] dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z" />
                        </svg>
                    </button>
                </div>

                {/* แสดง Modal แก้ไขข้อมูลสินค้าเมื่อ showEdit เป็น true */}
                {showEdit && (
                    <EditModal
                        key={id}
                        product={productData}
                        onClose={() => setShowEdit(false)} // ปิด Modal
                        onSave={() => window.location.reload()} // รีโหลดหน้าเมื่อบันทึกเสร็จ
                    />
                )}

                {/* แสดง Modal ยืนยันการลบเมื่อ showDeleteConfirm เป็น true */}
                {showDeleteConfirm && (
                    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
                        <div className="bg-white rounded-xl shadow-2xl w-[400px] p-6">
                            <h3 className="text-xl font-bold mb-4 text-center">
                                Delete this product?
                            </h3>
                            <p className="text-gray-600 text-center mb-6">
                                Are you sure you want to delete <span className="font-semibold">{name}</span>?
                            </p>
                            <div className="flex justify-center gap-6">
                                {/* ปุ่มยืนยันการลบ: เรียกฟังก์ชัน handleDelete */}
                                <button
                                    onClick={handleDelete}
                                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                                >
                                    Delete
                                </button>
                                {/* ปุ่มยกเลิก: ปิด Modal */}
                                <button
                                    onClick={() => setShowDeleteConfirm(false)}
                                    className="text-gray-600 px-4 py-2 hover:underline"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </td>
        </tr>
    );
}