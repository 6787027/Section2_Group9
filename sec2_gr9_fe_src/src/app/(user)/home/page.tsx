import Link from "next/link";
import { LogOut } from 'lucide-react';

export default function Home() {
  return (
   <div className="bg-[#282151]  min-h-screen  text-center">
      <main>
        logout
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
          <div className=" font-bold text-[#282151] text-4xl pb-4">
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
                <span>Thananchanok </span>
              </div>
            </div>

            <div>
              <div>
                <div className="grid justify-items-start py-2">
                <span className=" text-sm">First name</span>
              </div>
              {/* box */}
              <div className="bg-white py-2 px-4 shadow-xl rounded-xl grid justify-items-start ">
                <span>Chuensang</span>
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
              <span>thananchanok.chu@student.mahidol.edu</span>
            </div>
          </div>

          {/* phonenumber */}
          <div>
          <div className="grid justify-items-start py-2">
            <span>PhoneNUmber</span>
          </div>

          <div className="bg-white py-2 px-4 rounded-xl  shadow-xl grid justify-items-start">
            <span>0935299979</span>
          </div>
          </div>         

          {/* edit profile  */}
          <div className="py-8">
            <div className="" >
              <Link href={""}><button className=" bg-[#C8C4EE] px-48 py-2 rounded-xl shadow-xl hover:bg-[#ACA5EC]">Edit Profile</button> </Link>
            </div>
            <div className="pt-4">
               <Link href={""}><button className=" bg-[#FFE6E6] px-48 py-2 rounded-xl shadow-xl hover:bg-[#FFB2B2]">View Order</button> </Link>
            </div>
          </div>

        </div>
        </div>
      </main>
    </div>
  );
}
