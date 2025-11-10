"use client"

import Link from "next/link";
import { LogOut } from "lucide-react";
import { useState } from "react";
import EditProfileModal from "@/components/built-components/EditProfileModal";

export default function User_profile() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="bg-[#282151]  min-h-screen  text-center">
      <main>
        <div className="  justify-items-end items-baseline-last  px-4">
          <div>

          </div>
          <div className="flex flex-row">
            <Link href={""}><button className=" bg-white  px-4 py-2 rounded-lg shadow-xl hover:bg-[#948AD2] flex flex-row " ><LogOut className="mr-2"></LogOut> logout</button> </Link>
          </div>
        </div>

        <div className=" flex flex-col items-center justify-center pt-12">
          <div className="bg-linear-to-t from-[#948AD2]  to-[#FFE6E6] rounded-lg p-10">

            {/* header */}
            <div className=" ">
              <h1> Your Profile</h1>
            </div>
            {/* f-l name */}
            <div className=" grid grid-cols-2 gap-4 justify-between ">
              <div>
                {/* first name  */}
                <div className="grid justify-items-start py-2">
                  <span className=" text-sm">First name</span>
                </div>
                {/* box */}
                <div className="bg-white py-2 px-4  shadow-xl rounded-xl grid justify-items-start">
                  <span id="fname">Thananchanok </span>
                </div>
              </div>

              <div>
                <div>
                  <div className="grid justify-items-start py-2">
                    <span className=" text-sm">Last name</span>
                  </div>
                  {/* box */}
                  <div className="bg-white py-2 px-4 shadow-xl rounded-xl grid justify-items-start ">
                    <span id="lname">Chuensang</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Email  */}
            <div>
              <div className="grid justify-items-start py-2">
                <span className=" text-sm">Email</span>
              </div>

              <div className="bg-white py-2 px-4 rounded-xl  shadow-xl grid justify-items-start">
                <span id="email">thananchanok.chu@student.mahidol.edu</span>
              </div>
            </div>

            {/* phonenumber */}
            <div>
              <div className="grid justify-items-start py-2">
                <span>Phone Number</span>
              </div>

              <div className="bg-white py-2 px-4 rounded-xl mb-5  shadow-xl grid justify-items-start">
                <span id="phone">0935299979</span>
              </div>
            </div>

            {/* edit profile  */}
            <button onClick={() => setOpenModal(true)} className="bg-[#C8C4EE] px-48 py-2 rounded-xl shadow-xl hover:bg-[#ACA5EC]">
              Edit Profile
            </button>
            <div className="pt-4">
              <Link href={"/myorder"}>
               <button className=" bg-[#FFE6E6] px-48 py-2 rounded-xl shadow-xl hover:bg-[#FFB2B2]">View Order</button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      {/* Modal */}
      <EditProfileModal open={openModal} onClose={() => setOpenModal(false)} />
    </div>
  );
}