'use client'
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// หน้าตาของ User ที่ได้จาก API login
// (สังเกตว่า 'id' ตอนนี้คือ string (email))
interface User {
  id: string; // <-- เราจะใช้ Email เป็น ID
  email: string;
  firstName: string;
  lastName: string;
  phonenum:string
};

// หน้าตาของ Context
interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (token: string, userData: User) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // พยายามดึง User จาก localStorage ตอนเปิดเว็บ
  useEffect(() => {
    try {
      const storedToken = localStorage.getItem('authToken');
      const storedUser = localStorage.getItem('authUser');
      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse auth user from localStorage", error);
    }
    setIsLoading(false); // โหลดเสร็จ ไม่ว่าจะมี user หรือไม่
  }, []);

  // ฟังก์ชัน Login
  const login = (token: string, userData: User) => {
    setToken(token);
    setUser(userData);
    localStorage.setItem('authToken', token);
    localStorage.setItem('authUser', JSON.stringify(userData));
  };

  // ฟังก์ชัน Logout
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('authUser');
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}