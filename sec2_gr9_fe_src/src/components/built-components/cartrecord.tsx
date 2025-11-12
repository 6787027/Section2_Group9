'use client'
import Image from "next/image";
import { CartItemType, formatCurrency } from "@/app/context/CartContext";
import { Minus, Plus, Trash2 } from "lucide-react";

// 1. กำหนด Props ที่จะรับมาจาก Cart.tsx
type CartItemRowProps = {
  item: CartItemType;
  onUpdateSelect: (id: string, newQuantity: number) => void;
  onToggleItem: (id: string) => void;
  onRemoveItem: (id: string) => void;
};

export default function CartItemRow({ 
  item, 
  onUpdateSelect, 
  onToggleItem, 
  onRemoveItem 
}: CartItemRowProps) {

  // (สร้าง handler เพื่อป้องกันการยิง API รัวๆ)
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity !== item.selectedItem) {
      onUpdateSelect(item.id, newQuantity);
    }
  };

  return (
    <tr className="border-b">
      {/* 1. PRODUCT (Checkbox + Image + Name) */}
      <td className="py-4 px-2">
        <div className="flex items-center justify-start gap-3">
          <input
            type="checkbox"
            checked={item.check}
            onChange={() => onToggleItem(item.id)} // 👈 ใช้ onToggleItem
            className="checkbox checkbox-primary" 
          />
          <Image
            src={item.imageSrc}
            alt={item.name}
            width={80}
            height={80}
            className="rounded-lg object-cover"
          />
          <span className="font-semibold text-left">{item.name}</span>
        </div>
      </td>

      {/* 2. PRICE */}
      <td className="py-4 px-2">
        {formatCurrency(item.price)}
      </td>

      {/* 3. QTY (Quantity Selector) */}
      <td className="py-4 px-2">
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => handleQuantityChange(item.selectedItem - 1)} // 👈 ใช้ handler
            className="p-1 rounded-full hover:bg-gray-200 disabled:opacity-30"
            disabled={item.selectedItem <= 1}
          >
            <Minus size={16} />
          </button>
          <span className="font-bold w-10 text-center">
            {item.selectedItem}
          </span>
          <button
            onClick={() => handleQuantityChange(item.selectedItem + 1)} // 👈 ใช้ handler
            className="p-1 rounded-full hover:bg-gray-200"
          >
            <Plus size={16} />
          </button>
        </div>
      </td>

      {/* 4. TOTAL */}
      <td className="py-4 px-2 font-semibold">
        {formatCurrency(item.price * item.selectedItem)}
      </td>
      
      {/* 5. REMOVE */}
      <td className="py-4 px-2">
        <button
          onClick={() => onRemoveItem(item.id)} // 👈 ใช้ onRemoveItem
          className="text-red-500 hover:text-red-700"
        >
          <Trash2 size={20} />
        </button>
      </td>
    </tr>
  );
}