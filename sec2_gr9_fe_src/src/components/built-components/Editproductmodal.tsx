"use client"; // ระบุว่าไฟล์นี้เป็น Client Component

import React, { useState } from "react";

// Interface สำหรับกำหนด Props ที่ Modal นี้ต้องได้รับ
interface EditModalProps {
  product: {
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
  };
  onClose: () => void; // ฟังก์ชันปิด Modal
  onSave: () => void; // ฟังก์ชันอัปเดตข้อมูลในหน้าหลักเมื่อบันทึกสำเร็จ
}

export default function Editproductmodal({ product, onClose, onSave }: EditModalProps) {
  // สร้าง State เพื่อเก็บข้อมูลจาก Form โดยเริ่มต้นค่าจาก product ที่ส่งเข้ามา
  const [formData, setFormData] = useState(product);

  // ฟังก์ชันสำหรับอัปเดต State เมื่อมีการแก้ไขข้อมูลใน Input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    // ใช้ Spread Operator (...) เพื่อคงค่าเดิมใน field อื่นๆ
    // และอัปเดตเฉพาะ field ที่กำลังพิมพ์ (ระบุด้วย e.target.name)
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ฟังก์ชันสำหรับบันทึกข้อมูล (Submit Form)
  const handleSave = async () => {
    try {
      // ส่ง Request แบบ PUT ไปยัง API เพื่ออัปเดตข้อมูลสินค้าตาม ID
      const res = await fetch(`http://localhost:3001/v1/products/${formData.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData), // แปลงข้อมูลใน State เป็น JSON
      });

      // ตรวจสอบผลลัพธ์จาก Server
      if (res.ok) {
        alert("Product updated successfully!"); // แจ้งเตือนความสำเร็จ
        onSave(); // เรียกฟังก์ชัน Refresh หน้าหลัก
        onClose(); // ปิด Modal
      } else {
        alert("Failed to update product"); // แจ้งเตือนเมื่อล้มเหลว
      }
    } catch (err) {
      console.error(err); // แสดง Error ใน Console
    }
  };


  return (
    // Background Overlay: สีดำโปร่งแสง
    <div className="fixed inset-0 bg-black/40  flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-2xl w-[600px] p-6 relative max-h-[90vh] overflow-y-auto">
        <h2 className="text-3xl font-bold text-center mb-4">Edit Product</h2>

        {/* Form Section */}
        <form
          onSubmit={(e) => {
            e.preventDefault(); // ป้องกันการ Refresh หน้าเว็บ
            handleSave(); // เรียกฟังก์ชันบันทึกข้อมูล
          }}
        >

          {/* Product Name Input */}
          <label className="block text-sm font-semibold mb-1">Product Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter product name"
            className="border p-2 border-[#7469B6] w-full mb-3"
            required
          />

          {/* Price and Type (จัดวางแนวนอน) */}
          <div className="flex items-center">
            {/* Price Input */}
            <label className="mr-11 block text-sm font-semibold mb-1">Price</label>
            <input
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter price"
              className="border p-2 border-[#7469B6] w-full mb-3 mr-10"
              required
            />


            {/* Type Selection (Drop down list) */}
            <label className="mr-13 block text-sm font-semibold mb-1">Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="border p-2 border-[#7469B6] w-full mb-3 bg-white"
              required
            >
              <option value="">Select type</option>
              <option value="Doll">Doll</option>
              <option value="Accessory">Accessory</option>
            </select>

          </div>


          {/* Quantity and Collection Name (จัดวางแนวนอน) */}
          <div className="flex items-center">
            {/* Quantity Input */}
            <label className="mr-5 block text-sm font-semibold mb-1">Quantity</label>
            <input
              name="quantity"
              type="number"
              value={formData.quantity}
              onChange={handleChange}
              placeholder="Enter quantity"
              className="border mr-10 p-2 border-[#7469B6] w-full mb-3"
              required
            />

            {/* Collection Name Input */}
            <label className="mr-5 block text-sm font-semibold mb-1">Collection Name</label>
            <input
              name="colname"
              value={formData.colname}
              onChange={handleChange}
              placeholder="Enter collection name"
              className="border p-2 border-[#7469B6] w-full mb-3"
            />
          </div>

          {/* Description Input (Textarea) */}
          <label className="mt-2 block text-sm font-semibold mb-1">Description</label>
          <textarea
            name="desc"
            value={formData.desc}
            onChange={handleChange}
            placeholder="Enter description"
            className="border p-2 border-[#7469B6] w-full mb-3"
          />

          {/* Image URLs Inputs */}
          <label className="block text-sm font-semibold mb-1">Front Image URL</label>
          <input
            name="img1"
            value={formData.img1}
            onChange={handleChange}
            placeholder="Enter front image URL"
            className="border p-2 border-[#7469B6] w-full mb-3"
          />

          <label className="block text-sm font-semibold mb-1">Side Image URL</label>
          <input
            name="img2"
            value={formData.img2}
            onChange={handleChange}
            placeholder="Enter side image URL"
            className="border p-2 border-[#7469B6] w-full mb-3"
          />

          <label className="block text-sm font-semibold mb-1">Back Image URL</label>
          <input
            name="img3"
            value={formData.img3}
            onChange={handleChange}
            placeholder="Enter back image URL"
            className="border p-2 border-[#7469B6] w-full mb-5"
          />

          {/* Buttons Section: Save & Cancel */}
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-[#7469B6] text-white px-4 py-2 rounded"
            >
              Save
            </button>

            <button
              type="button"
              onClick={onClose} // ปิด Modal
              className="text-gray-600 px-4 py-2 hover:underline"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>

  );
}