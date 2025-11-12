'use client'
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { StaticImageData } from 'next/image';
import { useAuth } from './AuthContext'; // 1. Import Auth

/* ---------------------------------
  Types
--------------------------------- */
export type CartItemType = {
  id: string; // Pro_ID
  name: string;
  price: number;
  collection: string;
  type: string;
  imageSrc: StaticImageData | string;
  selectedItem: number; // Quantity
  check: boolean; // State นี้จะอยู่แค่ใน Frontend
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
  subtotal: number;
  shipping: number;
  total: number;
};

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('th-TH', {
    style: 'currency', currency: 'THB', minimumFractionDigits: 2,
  }).format(amount);
};

/* ---------------------------------
  Context Type
--------------------------------- */
type CartContextType = {
  cartItems: CartItemType[];
  summary: Summary;
  isLoading: boolean; // 👈 (เพิ่ม state ที่ขาดไป)
  isCalculating: boolean;
  fetchCartFromDB: (userEmail: string) => Promise<void>; // 👈 (เพิ่มฟังก์ชันที่ขาดไป)
  addToCart: (product: Product, quantity: number) => Promise<void>;
  updateItemQuantity: (id: string, newQuantity: number) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
  toggleItemCheck: (id: string) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [summary, setSummary] = useState<Summary>({ subtotal: 0, shipping: 0, total: 0 });
  const [isLoading, setIsLoading] = useState(true); // 👈 (เพิ่ม state ที่ขาดไป)
  const [isCalculating, setIsCalculating] = useState(false);
  
  const { user, isLoading: isAuthLoading } = useAuth();

  // 3. ฟังก์ชันกลางสำหรับ "ดึงตะกร้าจาก DB" (ใช้ Email)
  const fetchCartFromDB = async (userEmail: string) => {
    setIsLoading(true); // 👈 (เพิ่ม isLoading)
    try {
      const encodedEmail = encodeURIComponent(userEmail);
      
      // ✅ 1. แก้ไข URL: ใช้ '/api/'
      const res = await fetch(`http://localhost:3001/v1/cart/${encodedEmail}`); 
      
      if (!res.ok) throw new Error('Failed to fetch cart');
      
      const dbItems = await res.json();
      const newCartItems = dbItems.map((item: any) => ({
        ...item,
        check: true // ติ๊กเลือกทุกชิ้นที่โหลดมา
      }));
      setCartItems(newCartItems);
    } catch (err) {
      console.error("Failed to fetch cart:", err);
      setCartItems([]);
    } finally {
      setIsLoading(false); // 👈 (เพิ่ม isLoading)
    }
  };

  // 4. EFFECT: โหลดตะกร้าเมื่อ User เปลี่ยน (Login/Logout)
  useEffect(() => {
    if (isAuthLoading) {
      return; 
    }
    if (user && user.email) {
      fetchCartFromDB(user.email);
    } else {
      setCartItems([]);
      setIsLoading(false); // (สำคัญ)
    }
  }, [user, isAuthLoading]);

  useEffect(() => {
    const calculateSummary = async () => {
      if (cartItems.length === 0) {
        setSummary({ subtotal: 0, shipping: 0, total: 0 });
        return;
      }
      setIsCalculating(true);
      const payload = cartItems.map(item => ({
        price: item.price,
        selectedItem: item.selectedItem,
        check: item.check
      }));

      try {
        // ✅ 2. แก้ไข URL: ใช้ '/api/'
        const res = await fetch('http://localhost:3001/v1/cart/calculate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (!res.ok) throw new Error('Failed to calculate');
        const data = await res.json();
        setSummary(data);
      } catch (err) {
        console.error("Failed to calculate:", err);
      } finally {
        setIsCalculating(false);
      }
    };
    calculateSummary();
  }, [cartItems]);


  
  const addToCart = async (product: Product, quantity: number) => {
    if (!user) {
      alert("Please login to add items to your cart.");
      return;
    }
    try {
     
      const res = await fetch('http://localhost:3001/v1/cart/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: user.email, 
          productId: product.Pro_ID,
          quantity: quantity
        })
      });
      if (!res.ok) throw new Error('Failed to add item');
      await fetchCartFromDB(user.email); 
    } catch (err) {
      console.error("Failed to add to cart:", err);
    }
  };

  // 7. อัปเดตจำนวน
  const updateItemQuantity = async (id: string, newQuantity: number) => {
    if (!user || newQuantity < 1) return;

    // (เก็บ State เก่าไว้ เผื่อต้อง Rollback)
    const oldCartItems = [...cartItems];

    // --- 7.1. (Optimistic Update) ---
    // อัปเดต UI ทันที โดยไม่ต้องรอ Backend
    setCartItems(currentItems =>
      currentItems.map(item =>
        item.id === id ? { ...item, selectedItem: newQuantity } : item
      )
    );
    // (ตอนนี้ `useEffect` ที่คำนวณราคา (ข้อ 5) จะทำงานทันที)

    // --- 7.2. (Background Update) ---
    // ส่ง `fetch` ไปอัปเดต DB เบื้องหลัง
    try {
      const res = await fetch('http://localhost:3001/v1/cart/update/quantity', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: user.email,
          productId: id,
          newQuantity: newQuantity
        })
      });
      if (!res.ok) {
        // ถ้า Backend พัง ให้ Rollback
        throw new Error('Failed to update quantity in DB');
      }
      // ถ้าสำเร็จ... ก็ไม่ต้องทำอะไร! (UI มันอัปเดตไปแล้ว)

    } catch (err) {
      console.error("Failed to update quantity:", err);
      
      // --- 7.3. (Rollback) ---
      // ถ้า Backend พังจริงๆ ให้ "ย้อนกลับ" UI ไปเป็นเหมือนเดิม
      alert("Failed to update quantity. Please try again.");
      setCartItems(oldCartItems);
    }
  };
  

  // 8. ลบของ
  const removeItem = async (id: string) => {
    if (!user) return;
    try {
      // ✅ 5. แก้ไข URL: ใช้ '/api/'
      const res = await fetch('http://localhost:3001/v1/cart/remove', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: user.email,
          productId: id
        })
      });
      if (!res.ok) throw new Error('Failed to remove item');
      await fetchCartFromDB(user.email);
    } catch (err) {
      console.error("Failed to remove item:", err);
    }
  };

  // 9. ติ๊กเลือก (Frontend-only)
  const toggleItemCheck = (id: string) => {
    setCartItems(currentItems =>
      currentItems.map(item =>
        item.id === id ? { ...item, check: !item.check } : item
      )
    );
  };


  return (
    <CartContext.Provider value={{
      cartItems,
      summary,
      isLoading, // 👈 (เพิ่ม)
      isCalculating,
      fetchCartFromDB, // 👈 (เพิ่ม)
      addToCart,
      updateItemQuantity,
      removeItem,
      toggleItemCheck
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within an CartProvider');
  }
  return context;
}