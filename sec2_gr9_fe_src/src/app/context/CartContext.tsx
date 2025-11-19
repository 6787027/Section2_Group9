'use client'
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { StaticImageData } from 'next/image';
import { useAuth } from './AuthContext';

// --- Types Definition (นิยามรูปแบบข้อมูล) ---

// รูปแบบข้อมูลสินค้าในตะกร้า (สำหรับใช้ใน Frontend)
export type CartItemType = {
  id: string; 
  name: string;
  price: number;
  collection: string;
  type: string;
  imageSrc: StaticImageData | string;
  selectedItem: number; // จำนวนสินค้าที่เลือก
  check: boolean;       // สถานะ Checkbox (เลือกเพื่อชำระเงินหรือไม่)
};

interface Product {
  Pro_ID: string;
  Pro_Name: string;
  Pro_Price: number;
  Pro_Type: string;
  Col_Name: string;
  Pic_f: string;
}


type Summary = {
  subtotal: number; // ยอดรวมสินค้า
  shipping: number; // ค่าส่ง
  total: number;    // ยอดสุทธิ
};


export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('th-TH', {
    style: 'currency', currency: 'THB', minimumFractionDigits: 2,
  }).format(amount);
};

// รูปแบบของ Context ที่จะส่งออกไปให้ Component อื่นใช้
type CartContextType = {
  cartItems: CartItemType[];
  summary: Summary;
  isLoading: boolean;     // โหลดข้อมูลตะกร้าอยู่หรือไม่
  isCalculating: boolean; // กำลังคำนวณราคาอยู่หรือไม่
  fetchCartFromDB: (userEmail: string) => Promise<void>;
  addToCart: (product: Product, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  updateItemQuantity: (id: string, newQuantity: number) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
  toggleItemCheck: (id: string) => void;
};

// สร้าง Context
const CartContext = createContext<CartContextType | undefined>(undefined);

// --- Provider Component ---
export function CartProvider({ children }: { children: ReactNode }) {
  // State เก็บรายการสินค้า
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  // State เก็บยอดเงินสรุป
  const [summary, setSummary] = useState<Summary>({ subtotal: 0, shipping: 0, total: 0 });
  // State จัดการ Loading
  const [isLoading, setIsLoading] = useState(true); 
  const [isCalculating, setIsCalculating] = useState(false);
  
  // ดึงข้อมูล User และ Token จาก AuthContext
  const { user, isLoading: isAuthLoading, token } = useAuth();

  // ฟังก์ชันดึงข้อมูลตะกร้าจาก Database
  const fetchCartFromDB = async (userEmail: string) => {
    if (!token) return; // ถ้าไม่มี Token ให้จบฟังก์ชัน
    
    setIsLoading(true); 
    try {
      const res = await fetch(`http://localhost:3001/v1/cart`, {
         headers: {
           'Authorization': `Bearer ${token}` // แนบ Token ไปยืนยันตัวตน
         }
      }); 
      
      if (!res.ok) throw new Error('Failed to fetch cart');
      
      const dbItems = await res.json();
      // แปลงข้อมูลจาก DB ให้เพิ่ม field 'check' เป็น true โดย default
      const newCartItems = dbItems.map((item: any) => ({
        ...item,
        check: true 
      }));
      setCartItems(newCartItems);
    } catch (err) {
      console.error("Failed to fetch cart:", err);
      setCartItems([]); // ถ้า Error ให้เคลียร์ตะกร้าเป็นว่าง
    } finally {
      setIsLoading(false); 
    }
  };

  // Effect 1: ทำงานเมื่อ User Login หรือ Token เปลี่ยน
  useEffect(() => {
    if (isAuthLoading) {
      return; // รอให้ Auth โหลดเสร็จก่อน
    }
    if (user && user.email && token) {
      // ถ้า Login แล้ว ให้ดึงข้อมูลตะกร้าเก่ามาแสดง
      fetchCartFromDB(user.email);
    } else {
      // ถ้า Logout หรือไม่มี User ให้เคลียร์ตะกร้า
      setCartItems([]);
      setIsLoading(false); 
    }
  }, [user, isAuthLoading, token]);

  // Effect 2: คำนวณราคาเมื่อ cartItems มีการเปลี่ยนแปลง
  useEffect(() => {
    const calculateSummary = async () => {
      if (cartItems.length === 0) {
        setSummary({ subtotal: 0, shipping: 0, total: 0 });
        return;
      }
      setIsCalculating(true);

      // เตรียมข้อมูลส่งไปคำนวณ
      const payload = cartItems.map(item => ({
        price: item.price,
        selectedItem: item.selectedItem, // จำนวน
        check: item.check                // สถานะถูกเลือก
      }));

      try {
        // ส่งไปให้ Backend คำนวณ 
        const res = await fetch('http://localhost:3001/v1/cart/calculate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (!res.ok) throw new Error('Failed to calculate');
        const data = await res.json();
        setSummary(data); // อัปเดตยอดเงินที่ได้กลับมา
      } catch (err) {
        console.error("Failed to calculate:", err);
      } finally {
        setIsCalculating(false);
      }
    };
    calculateSummary();
  }, [cartItems]); // dependency เป็น cartItems คือเปลี่ยนเมื่อไหร่ คำนวณใหม่เมื่อนั้น

  // ฟังก์ชันเพิ่มสินค้าลงตะกร้า
  const addToCart = async (product: Product, quantity: number) => {
    if (!user || !token) {
      alert("Please login to add items to your cart.");
      return;
    }
    try {
      const res = await fetch('http://localhost:3001/v1/cart/add', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          productId: product.Pro_ID,
          quantity: quantity
        })
      });
      if (!res.ok) throw new Error('Failed to add item');
      
      // เพิ่มสำเร็จ ให้ดึงข้อมูลตะกร้าใหม่ทั้งหมดเพื่อให้ Sync กับ DB
      await fetchCartFromDB(user.email); 
    } catch (err) {
      console.error("Failed to add to cart:", err);
    }
  };

  // ฟังก์ชันเคลียร์ตะกร้า (ใช้หลังจากจ่ายเงินสำเร็จ)
  const clearCart = async () => {
    setCartItems([])
  }

  // ฟังก์ชันอัปเดตจำนวนสินค้า (+/-)
  const updateItemQuantity = async (id: string, newQuantity: number) => {
    if (!user || !token || newQuantity < 1) return;

    // จำค่าเก่าไว้ก่อน เผื่อ API Error จะได้แก้กลับได้
    const oldCartItems = [...cartItems];

    // Optimistic Update: อัปเดตหน้าจอทันทีไม่ต้องรอ API
    setCartItems(currentItems =>
      currentItems.map(item =>
        item.id === id ? { ...item, selectedItem: newQuantity } : item
      )
    );

    try {
      // ยิง API ไปอัปเดตหลังบ้าน
      const res = await fetch('http://localhost:3001/v1/cart/update/quantity', {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          productId: id,
          newQuantity: newQuantity
        })
      });
      if (!res.ok) {
        throw new Error('Failed to update quantity in DB');
      }
    } catch (err) {
      console.error("Failed to update quantity:", err);
      alert("Failed to update quantity. Please try again.");
      // ถ้า Error ให้ย้อนค่ากลับเป็นค่าเก่า
      setCartItems(oldCartItems);
    }
  };
  
  // ฟังก์ชันลบสินค้าออกจากตะกร้า
  const removeItem = async (id: string) => {
    if (!user || !token) return;
    try {
      const res = await fetch('http://localhost:3001/v1/cart/remove', {
        method: 'DELETE',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          productId: id
        })
      });
      if (!res.ok) throw new Error('Failed to remove item');
      // ลบสำเร็จ ดึงข้อมูลใหม่
      await fetchCartFromDB(user.email);
    } catch (err) {
      console.error("Failed to remove item:", err);
    }
  };

  // ฟังก์ชันติ๊กถูก/เอาออก (Checkbox) 
  const toggleItemCheck = (id: string) => {
    setCartItems(currentItems =>
      currentItems.map(item =>
        item.id === id ? { ...item, check: !item.check } : item
      )
    );
    // พอ cartItems เปลี่ยน Effect การคำนวณราคาจะทำงานอัตโนมัติ
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      summary,
      isLoading, 
      isCalculating,
      fetchCartFromDB, 
      addToCart,
      clearCart,
      updateItemQuantity,
      removeItem,
      toggleItemCheck
    }}>
      {children}
    </CartContext.Provider>
  );
}

// Hook สำหรับเรียกใช้ Context นี้
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within an CartProvider');
  }
  return context;
}