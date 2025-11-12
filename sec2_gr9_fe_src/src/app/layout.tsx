import "@/app/globals.css";
import { AuthProvider } from '@/app/context/AuthContext';
import { CartProvider } from '@/app/context/CartContext';

// 1. Import ฟอนต์จาก next/font/google
import { Instrument_Sans } from 'next/font/google';

// 2. ตั้งค่าฟอนต์
const instrumentSans = Instrument_Sans({
  subsets: ['latin'], // (เลือก subset ที่คุณต้องการ)
  display: 'swap',
  variable: '--font-instrument-sans' // (ทางเลือก: ถ้าคุณอยากใช้เป็น CSS Variable)
});

// 3. ย้าย metadata ของคุณมาไว้ที่นี่
export const metadata = { title: "CelesteCraft", description: "Next.js App" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // 4. ใส่ className ของฟอนต์ที่ <html>
      
        <AuthProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </AuthProvider>
  );
}