"use client";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import AdOr from "@/components/built-components/ortable";
import AddOrderModal from "@/components/built-components/AddOrderModal";

// Interface สำหรับกำหนดโครงสร้างข้อมูลของ Order ที่จะได้รับจาก API
interface Order {
  Or_Status: string;
  Or_Price: number;
  Or_Time: string;
  Or_Num: string;
  Or_AccEmail: string;
  Or_Address: string;
}

export default function Ad_order() {
  const router = useRouter();
  const auth = useAuth(); // เรียกใช้ Auth Context เพื่อตรวจสอบสถานะ User

  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [order, setOrder] = useState<Order[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>("all");

  // แยก State: searchTerm สำหรับ API (Trigger การค้นหา) และ searchInput สำหรับช่องกรอกข้อความ
    const [searchTerm, setSearchTerm] = useState(""); 
    const [searchInput, setSearchInput] = useState(""); 
  const [showAddModal, setShowAddModal] = useState(false);

  // ตรวจสอบว่า User เป็น Admin หรือไม่ ก่อนให้เข้าถึงหน้านี้
  useEffect(() => {

    if (auth.isLoading) {
      return;
    }

    // ถ้ายังไม่ได้ Login ให้ดีดไปหน้า Login
    if (!auth.user) {
      router.push("/login");
      return;
    }

    // ถ้า Login แล้วแต่ไม่ใช่ Admin ให้ดีดไปหน้า Profile ปกติ
    if (auth.user.type !== "Admin") {
      router.push("/user_profile");
      return;
    }

    // ถ้าผ่านทุกเงื่อนไข ให้จบการโหลด Auth และแสดงเนื้อหา
    setIsAuthLoading(false);
  }, [auth.isLoading, auth.user, router]);

  // ดึงข้อมูล Order เมื่อ searchTerm หรือ filterStatus เปลี่ยนแปลง
  useEffect(() => {
    if (isAuthLoading) {
      return;
    }

    // เรียก API พร้อมส่ง Query Parameters (search และ status)
    fetch(`http://localhost:3001/ad_order?search=${searchTerm}&status=${filterStatus}`)
      .then(res => res.json())
      .then(data => setOrder(data))
      .catch(err => console.error("Error loading products:", err));

  }, [searchTerm, filterStatus, isAuthLoading]);

  // ฟังก์ชันเริ่มการค้นหา (กดปุ่มหรือ Enter)
    const handleSearch = () => {
        setSearchTerm(searchInput); // ย้ายค่าจาก Input ไปเป็น Term เพื่อ Trigger useEffect
    };

    // ฟังก์ชันจับปุ่ม Enter
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

  // Logout
  const handleLogout = () => {
    auth.logout();
    router.push("/home");
  };

  // Loading Screen
  // แสดงระหว่างรอตรวจสอบสิทธิ์ Admin
  if (isAuthLoading) {
    return (
      <div className="bg-[#F1F0F4] min-h-screen w-screen flex justify-center items-center">
        <h1 className="text-2xl font-bold text-[#282151]">
          Verifying Admin Access...
        </h1>
      </div>
    );
  }


  return (
    <div id="main" className="bg-[#F1F0F4] flex flex-row">
      {/* Side bar */}
      <div className="bg-white min-w-65 shadow-xl ">

        <header>
          <div className="my-16 ml-8 justify-items-start">
            <h1 className="text-[#282151] font-bold text-xl">
              {auth.user?.firstName || "Admin"}
            </h1>
          </div>
        </header>

        {/* Navbar */}
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
            <h2 className="text-xl font-bold mb-7">
              <a href="/ad_order">Order</a>
              <br></br>
            </h2>
            <h2 className="text-xl">
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

      <main className="flex flex-col m-15 mt-10">
        <div className="flex justify-between bg-white w-250 py-3 mb-10 items-center border-solid border-1 border-white rounded-2xl shadow-xl">
          <div className="ml-5">

            {/* Search bar */}
            <div className="flex flex-nowrap border-solid border-1 border-black rounded-3xl pl-3 pr-3 ">
              <input
                type="text"
                id="search"
                placeholder="Search"
                value={searchInput} // ใช้ searchInput แทน searchTerm
                onChange={(e) => setSearchInput(e.target.value)} // อัปเดตแค่ searchInput (ยังไม่ fetch)
                onKeyDown={handleKeyDown} // เพิ่มให้กด Enter ได้
                className="placeholder-[#D0D0D0] input-m ml-2 mr-2 my-1 pr-20 bg-white"
              ></input>
              <button type="button" onClick={handleSearch}>
                <svg
                  className="w-4 h-4 text-black dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeWidth="2"
                    d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Add Order จะขึ้น Modal จาก componetn AddOrModal */}
          <div className="mr-5 ">
            <button
              type="button"
              onClick={() => setShowAddModal(true)}
              className="flex flex-nowrap font-bold text-[#282151] bg-[#E8E6FB] p-2 border-solid border-1 border-[#E8E6FB] rounded-2xl"
            >
              <svg
                className="mr-2 w-6 h-6 text-[#282151] dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 12h14m-7 7V5"
                />
              </svg>{" "}
              Add Order
            </button>
          </div>
        </div>


        <div className="border-1 border-white rounded-t-2xl shadow-xl bg-white w-250 h-fit">
          <div className="mt-3 ml-5 mb-2">

            {/* Filter order by status : Drop down list*/}
            <label className="text-[#7469B6] mr-2">Order Status</label>
            <select
              id="or_select"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="select pl-3 text-grey-200 bg-white border-solid border-1 border-white rounded-xl shadow-xl"
            >
              <option value="all">Select status</option>
              <option value="Ordered">Ordered</option>
              <option value="Paid">Paid</option>
              <option value="Prepared">Prepared</option>
              <option value="Sent">Sent</option>
            </select>
          </div>
          <div className="border-b-1 border-[#D9D9D9]"></div>
        </div>
        <div className="overflow-auto border-1 border-white rounded-b-2xl shadow-xl bg-white w-250 h-110">
          <div>
            <div className="overflow-auto">
              <table className="table table-pin-rows table-pin-cols">
                {/* head */}
                <thead>
                  <tr>
                    <th>Order NO.</th>
                    <th>Customer Email</th>
                    <th>Time</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th>Sending Info.</th>
                  </tr>
                </thead>
                <tbody>
                  {/* ตรวจสอบว่ามีข้อมูลหรือไม่ */}
                  {order.length === 0 ? (
                    // กรณีไม่พบข้อมูล
                    <tr>
                      <td colSpan={8} className="text-center py-4 text-gray-500">
                        No order found
                      </td>
                    </tr>
                  ) : (
                    order.map(o => (
                      // กรณีมีข้อมูล: Loop แสดงผลด้วย Component AdOr
                      <AdOr
                        key={o.Or_Num}
                        id={o.Or_Num}
                        email={o.Or_AccEmail}

                        time={o.Or_Time}
                        price={o.Or_Price}
                        status={o.Or_Status}
                        address={o.Or_Address}
                      />
                    ))
                  )}
                </tbody>
              </table>
              {/* Modal Component: แสดงเมื่อ showAddModal เป็น true */}
              {showAddModal && (
                <AddOrderModal
                  onClose={() => setShowAddModal(false)}
                  onSuccess={() => { window.location.reload() }} // เสร็จแล้วรีโหลดหน้าเว็บให้ข้อมูลขึ้น
                />
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}