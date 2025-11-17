'use client'
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { StaticImageData } from 'next/image';
import { useAuth } from './AuthContext';

/* ---------------------------------
  Types
--------------------------------- */
export type CartItemType = {
  id: string; 
  name: string;
  price: number;
  collection: string;
  type: string;
  imageSrc: StaticImageData | string;
  selectedItem: number; 
  check: boolean; 
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
  isLoading: boolean;
  isCalculating: boolean;
  fetchCartFromDB: (userEmail: string) => Promise<void>;
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
  
  const { user, isLoading: isAuthLoading, token } = useAuth();

  const fetchCartFromDB = async (userEmail: string) => {
    if (!token) return;
    
    setIsLoading(true); 
    try {
      const res = await fetch(`http://localhost:3001/v1/cart`, {
         headers: {
           'Authorization': `Bearer ${token}`
         }
      }); 
      
      if (!res.ok) throw new Error('Failed to fetch cart');
      
      const dbItems = await res.json();
      const newCartItems = dbItems.map((item: any) => ({
        ...item,
        check: true 
      }));
      setCartItems(newCartItems);
    } catch (err) {
      console.error("Failed to fetch cart:", err);
      setCartItems([]);
    } finally {
      setIsLoading(false); 
    }
  };

  useEffect(() => {
    if (isAuthLoading) {
      return; 
    }
    if (user && user.email && token) {
      fetchCartFromDB(user.email);
    } else {
      setCartItems([]);
      setIsLoading(false); 
    }
  }, [user, isAuthLoading, token]);

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
      await fetchCartFromDB(user.email); 
    } catch (err) {
      console.error("Failed to add to cart:", err);
    }
  };

  const updateItemQuantity = async (id: string, newQuantity: number) => {
    if (!user || !token || newQuantity < 1) return;

    const oldCartItems = [...cartItems];

    setCartItems(currentItems =>
      currentItems.map(item =>
        item.id === id ? { ...item, selectedItem: newQuantity } : item
      )
    );

    try {
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
      setCartItems(oldCartItems);
    }
  };
  
  const removeItem = async (id: string) => {
    if (!user || !token) return;
    try {
      const res = await fetch('http://localhost:3001/api/cart/remove', {
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
      await fetchCartFromDB(user.email);
    } catch (err) {
      console.error("Failed to remove item:", err);
    }
  };

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
      fetchCartFromDB, 
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