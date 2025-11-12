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

type CartContextType = {
  cartItems: CartItemType[];
  summary: Summary;
  isLoading: boolean;
  isCalculating: boolean;
  addToCart: (product: Product, quantity: number) => Promise<void>;
  updateItemQuantity: (id: string, newQuantity: number) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
  toggleItemCheck: (id: string) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [summary, setSummary] = useState<Summary>({ subtotal: 0, shipping: 0, total: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [isCalculating, setIsCalculating] = useState(false);
  

  const { user, isLoading: isAuthLoading } = useAuth(); // (รอ Auth โหลดเสร็จก่อน)

  // 3. ฟังก์ชันกลางสำหรับ "ดึงตะกร้าจาก DB" (ใช้ Email)
  const fetchCartFromDB = async (userEmail: string) => {
    setIsLoading(true);
    try {
      // (เราต้อง encode email เผื่อมีอักขระพิเศษ)
      const encodedEmail = encodeURIComponent(userEmail);
      const res = await fetch(`http://localhost:3001/api/cart/${encodedEmail}`);
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
      setIsLoading(false);
    }
  };

  // 4. EFFECT: โหลดตะกร้าเมื่อ User เปลี่ยน (Login/Logout)
  useEffect(() => {
    // (รอ Auth โหลดเสร็จก่อน)
    if (isAuthLoading) {
      return; 
    }
    
    if (user && user.email) {
      // 4.1. ถ้า Login -> ดึงตะกร้าจาก DB โดยใช้ Email
      fetchCartFromDB(user.email);
    } else {
      // 4.2. ถ้า Logout -> เคลียร์ตะกร้า
      setCartItems([]);
      setIsLoading(false);
    }
  }, [user, isAuthLoading]); // ทำงานใหม่ทุกครั้งที่ user หรือ auth state เปลี่ยน

  // 5. EFFECT: คำนวณราคาทุกครั้งที่ตะกร้าเปลี่ยน
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
        check: item.check // 5.1. ส่ง 'check' state ไปให้ Backend
      }));

      try {
        const res = await fetch('http://localhost:3001/api/cart/calculate', {
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
  }, [cartItems]); // ทำงานใหม่ทุกครั้งที่ cartItems (รวมถึง check) เปลี่ยน


  /* ---------------------------------
     ฟังก์ชันที่เชื่อม DB (ใช้ Email)
  --------------------------------- */

  // 6. เพิ่มของลงตะกร้า
  const addToCart = async (product: Product, quantity: number) => {
    if (!user) {
      alert("Please login to add items to your cart.");
      return;
    }
    try {
      const res = await fetch('http://localhost:3001/api/cart/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: user.email, // 👈 ส่ง Email
          productId: product.Pro_ID,
          quantity: quantity
        })
      });
      if (!res.ok) throw new Error('Failed to add item');
      await fetchCartFromDB(user.email); // 6.1. ดึงตะกร้าใหม่ทั้งหมด
    } catch (err) {
      console.error("Failed to add to cart:", err);
    }
  };

  // 7. อัปเดตจำนวน
  const updateItemQuantity = async (id: string, newQuantity: number) => {
    if (!user || newQuantity < 1) return;
    try {
      const res = await fetch('http://localhost:3001/api/cart/update/quantity', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: user.email,
          productId: id,
          newQuantity: newQuantity
        })
      });
      if (!res.ok) throw new Error('Failed to update quantity');
      await fetchCartFromDB(user.email);
    } catch (err) {
      console.error("Failed to update quantity:", err);
    }
  };

  // 8. ลบของ
  const removeItem = async (id: string) => {
    if (!user) return;
    try {
      const res = await fetch('http://localhost:3001/api/cart/remove', {
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
      isLoading,
      isCalculating,
      addToCart,
      updateItemQuantity,
      removeItem,
      toggleItemCheck
    }}>
      {children}
    </CartContext.Provider>
  );
}

// Custom Hook
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within an CartProvider');
  }
  return context;
}