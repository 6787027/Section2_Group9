"use client"; // ระบุว่าไฟล์นี้เป็น Client Component ใน Next.js

import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { useEffect, useState } from "react";

// Interface สำหรับรองรับข้อมูลดิบที่ได้จาก API
// (Interface นี้ถูกต้องแล้ว)
interface ApiLoginLog {
  Acc_Email: string;
  Acc_LogTime: string;
}

// Interface สำหรับข้อมูลที่จัดรูปแบบแล้วเพื่อนำไปแสดงผลหน้าเว็บ
interface DisplayLoginLog {
  email: string;
  logTime: string;
}

export default function Ad_log() {
  const router = useRouter();
  const auth = useAuth(); // เรียกใช้ Auth Context เพื่อดูสถานะ user ปัจจุบัน

  // State สำหรับตรวจสอบว่ากำลังโหลดสถานะ Auth อยู่หรือไม่
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  // State สำหรับเก็บข้อมูล Log การล็อกอิน
  const [loginLogs, setLoginLogs] = useState<DisplayLoginLog[]>([]);
  // State สำหรับตรวจสอบสถานะการโหลดข้อมูลจาก API
  const [isDataLoading, setIsDataLoading] = useState<boolean>(true);
  // State สำหรับเก็บ Error message (ถ้ามี)
  const [error, setError] = useState<string | null>(null);


  // useEffect: ตรวจสอบสิทธิ์การเข้าถึง (Authorization Check)
  // กันไม่ให้คนที่ไม่มียศแอดมินเข้าถึง
  useEffect(() => {
    // รอจนกว่า Auth Context จะโหลดเสร็จ
    if (auth.isLoading) {
      return;
    }
    // ถ้าไม่มี User (ยังไม่ได้ login) ให้ดีดไปหน้า login
    if (!auth.user) {
      router.push("/login");
      return;
    }
    // ถ้ามี User แต่ไม่ใช่ Admin ให้ดีดไปหน้า user_profile
    if (auth.user.type !== "Admin") {
      router.push("/user_profile");
      return;
    }
    // ถ้าผ่านทุกเงื่อนไข ให้หยุดสถานะ Loading ของ Auth
    setIsAuthLoading(false);
  }, [auth.isLoading, auth.user, router]);


  // useEffect: ดึงข้อมูล Log (Data Fetching)
  useEffect(() => {
    // รอให้ผ่านการตรวจสอบสิทธิ์ (isAuthLoading เป็น false) ก่อนค่อยดึงข้อมูล
    if (isAuthLoading) {
      return;
    }

    const fetchLoginLogs = async () => {
      setIsDataLoading(true); // เริ่มแสดงสถานะโหลดข้อมูล
      setError(null); // เคลียร์ Error เก่า

      try {
        // ต้องส่ง Token ไปใน Header เพื่อยืนยันสิทธิ์
        const response = await fetch("http://localhost:3001/ad_log", {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${auth.token}`, // แนบ Token ของ Admin
          },
        });

        // ตรวจสอบสถานะ Response
        if (!response.ok) {
          throw new Error(`Failed to fetch login logs: ${response.statusText}`);
        }

        const data: ApiLoginLog[] = await response.json();

        // แปลงข้อมูลที่ได้จาก API ให้อยู่ในรูปแบบที่แสดงผล
        const formattedLogs = data.map((log) => {
          // แปลง ISO string เป็น Date object แล้ว format เป็นเวลาไทย
          const formattedTime = new Date(log.Acc_LogTime).toLocaleString("th-TH", {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          });

          return {
            email: log.Acc_Email,
            logTime: formattedTime,
          };
        });

        // fetch data มาแสดงผล ถ้าสำเร็จจะให้หยุดการทำ IsDataLoading
        setLoginLogs(formattedLogs);
      } catch (err: any) {
        console.error("Fetch error:", err);
        setError(err.message || "An unknown error occurred");
      } finally {
        // ไม่ว่าจะสำเร็จหรือล้มเหลว ให้หยุดสถานะ Loading
        setIsDataLoading(false);
      }
    };

    fetchLoginLogs();
  }, [isAuthLoading, auth.token]);

  // ฟังก์ชันสำหรับ Logout
  //logout
  const handleLogout = () => {
    auth.logout(); // เรียก function logout จาก context
    router.push("/home"); // ดีดกลับไปหน้า Home
  };

  // UI: แสดงผลระหว่างรอตรวจสอบสิทธิ์ Admin
  if (isAuthLoading) {
    return (
      <div className="bg-[#F1F0F4] flex justify-center items-center">
        <h1 className="text-2xl font-bold text-[#282151]">
          Verifying Admin Access...
        </h1>
      </div>
    );
  }


  return (
    <div className="bg-[#F1F0F4] min-h-screen min-w-screen flex flex-row">
      {/* Sidebar Section */}
      <div className="bg-white min-w-65 shadow-xl ">

        {/* Display Firstname ของ Admin */}
        <header>
          <div className="my-16 ml-8 justify-items-start">
            <h1 className="text-[#282151] font-bold text-xl">
              {/* แสดงชื่อ Admin ถ้าไม่มีให้แสดงคำว่า Admin */}
              {auth.user?.firstName || "Admin"}
            </h1>
          </div>
        </header>

        {/* Navbar Menu */}
        <div className="mx-3 border-b-1 border-[#D9D9D9]"></div>
        <nav>
          <div className="my-10 ml-8 text-xl justify-items-start">
            <div className="mb-7 text-[#282151] font-bold">Tools</div>
            <h2 className="mb-7 text-xl">
              <a href="/ad_product">Product</a>
              <br></br>
            </h2>
            <h2 className="mb-7 text-xl">
              <a href="/ad_account">Account</a>
              <br></br>
            </h2>
            <h2 className="text-xl  mb-7">
              <a href="/ad_order">Order</a>
              <br></br>
            </h2>
            {/* เมนูปัจจุบัน */}
            <h2 className="text-xl font-bold">
              <a href="/ad_log">Login History</a>
              <br></br>
            </h2>
          </div>
        </nav>

        {/* Logout */}
        <div className="items-baseline-last text-[#7469B6] mt-25 px-4">
          <div className="flex flex-row">
            <button
              onClick={handleLogout}
              className="px-4 py-2 flex flex-row "
            >
              <LogOut className="mr-2"></LogOut> Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Section: Table Display */}
      <main className="flex flex-col m-15 mt-10">
        <div className="overflow-auto border-1 border-white rounded-2xl shadow-xl bg-white w-250 h-150">
          <div>
            <div className="overflow-auto">
              <table className="table table-pin-rows table-pin-cols">
                {/* head (หัวตาราง) */}
                <thead>
                  <tr>
                    <th>Email</th>
                    <th>Login Date time</th>
                  </tr>
                </thead>

                <tbody>
                  {/* ระหว่างรอโหลด data */}
                  {isDataLoading && (
                    <tr>
                      <td colSpan={2} className="text-center">Loading data...</td>
                    </tr>
                  )}

                  {/* ถ้า error */}
                  {error && (
                    <tr>
                      <td colSpan={2} className="text-center text-red-500">{error}</td>
                    </tr>
                  )}

                  {/* ถ้าไม่มีข้อมูลใน Login_Log */}
                  {!isDataLoading && !error && loginLogs.length === 0 && (
                    <tr>
                      <td colSpan={2} className="text-center">No login history found.</td>
                    </tr>
                  )}

                  {/* จะ display ข้อมูลโดยใช้ mapping ระหว่างข้อมูลกับหัวตาราง*/}
                  {!isDataLoading && !error && loginLogs.map((log, index) => (
                    <tr key={index}>
                      <td>{log.email}</td>
                      <td>{log.logTime}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}