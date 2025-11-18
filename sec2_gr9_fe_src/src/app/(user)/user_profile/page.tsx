"use client";

import Link from "next/link";
import { LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import EditProfileModal from "@/components/built-components/EditProfileModal";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";

//สำหรับเก็ยข้อมูล User หลังจากไป Fetch มาจาก Backend
interface UserProfile {
  Acc_Email: string;
  Acc_FName: string;
  Acc_LName: string;
  Acc_PhoneNum: string;
}

//FieldProps จะจับคู่ key:value ของ UserProfile เอาไว้เพื่อแสดงข้อมูลตามแบบของ ProfileField
interface FieldProps {
  label: string;
  value: string | undefined;
}

//สร้างกล่องสำหรับ display ข้อมูลจาก FieldProps
const ProfileField = ({ label, value }: FieldProps) => (
  <div className="mb-4">
    <div className="grid justify-items-start py-2">
      <span className="text-sm">{label}</span>
    </div>
    <div className="bg-white py-2 px-4 h-10 shadow-xl rounded-xl grid justify-items-start">
      <span>{value ?? "-"}</span>
    </div>
  </div>
);

export default function User_profile() {

  const [openModal, setOpenModal] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const auth = useAuth();

  useEffect(() => {
    //ถ้าระบบ Auth ยังโหลดข้อมูลจาก localStorage ไม่เสร็จ ให้รอก่อน
    if (auth.isLoading) {
      return; // ยังไม่ต้องทำอะไร
    }

    //ถ้าโหลด Auth เสร็จแล้ว (isLoading = false) แต่ ไม่มีการ Login ของ user
    if (!auth.user) {
      router.push("/login");
      return;
    }

    //พอถึงตรงนี้ auth.user.id จะมีค่าแน่นอน
    fetch(`http://localhost:3001/user_profile/${auth.user.id}`)
      .then((res) => res.json())
      .then((data) => setProfile(data))
      .catch((err) => console.error("Error fetching profile:", err))
      .finally(() => setLoading(false)); // fetch profile เสร็จแล้ว

    // เปลี่ยน dependencies ให้รอ state จาก auth
  }, [auth.isLoading, auth.user, router]);

  const handleLogout = () => {
    auth.logout();
    router.push("/login");
  };

  // เพิ่ม: แสดง Loading... ถ้า Auth ยังไม่พร้อม หรือ Profile ยังไม่มา
  if (auth.isLoading || (loading && auth.user)) {
    return (
      <div className="bg-[#282151] min-h-screen text-center flex justify-center items-center">
        <h1 className="text-white text-2xl">Loading User Data...</h1>
      </div>
    );
  }


  return (
    <div className="bg-[#282151] min-h-screen text-center">
      <main>
        <div className="flex justify-end p-4">
          {/* ปุ่ม LogOut */}
          <button
            onClick={handleLogout}
            className="bg-white px-4 py-2 rounded-lg shadow-xl hover:bg-[#948AD2] flex items-center gap-2"
          >
            <LogOut /> Logout
          </button>
        </div>

        <div className="flex flex-col items-center justify-center pt-12">
          <div className="bg-gradient-to-t from-[#948AD2] to-[#FFE6E6] rounded-lg p-10 w-[500px]">
            <h1 className="text-2xl mb-6 text-[#282151] font-bold">Your Profile</h1>

            {/* Display data ของ User */}
            {loading ? (
              <p className="text-white">Loading...</p>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <ProfileField label="First Name" value={profile?.Acc_FName} />
                  <ProfileField label="Last Name" value={profile?.Acc_LName} />
                </div>
                <ProfileField label="Email" value={profile?.Acc_Email} />
                <ProfileField label="Phone Number" value={profile?.Acc_PhoneNum} />
              </>
            )}

            <button
              onClick={() => setOpenModal(true)}
              className="w-full bg-[#C8C4EE] py-2 rounded-xl shadow-xl hover:bg-[#ACA5EC] mt-4"
            >
              Edit Profile
            </button>

            <Link href="/myorder">
              <button className="w-full bg-[#FFE6E6] py-2 rounded-xl shadow-xl hover:bg-[#FFB2B2] mt-2">
                View Order
              </button>
            </Link>
          </div>
        </div>
      </main>

      {/* เมื่อกดที่ Edit Profile จะทำการเรียกใช้ component EditProfileModal แล้วเมื่อมีการแก้ไข Profile เสร็จแล้วจะเรียกใช้ Update ใน Backend*/}
      <EditProfileModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        // ส่งข้อมูลไป Display ให้เห็นก่อนการเปลี่ยนแปลงด้วย
        profile={profile}
        refreshProfile={() =>
          fetch(`http://localhost:3001/user_profile/${auth.user?.id}`)
            .then((res) => res.json())
            .then((data) => setProfile(data))
        }
      />
    </div>
  );
}
