

export default function Home() {
  return (
   <div className="bg-[#282151] flex flex-col items-center justify-center min-h-screen p-8 text-center">
      <main>
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
              <div className="bg-white py-2 px-4 rounded-xl grid justify-items-start">
                <span>Thananchanok </span>
              </div>
            </div>

            <div>
              <div>
                <div className="grid justify-items-start py-2">
                <span className=" text-sm">First name</span>
              </div>
              {/* box */}
              <div className="bg-white py-2 px-4 rounded-xl grid justify-items-start ">
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

            <div className="bg-white py-2 px-4 rounded-xl  grid justify-items-start">
              <span>thananchanok.chu@student.mahidol.edu</span>
            </div>
          </div>



        </div>
      </main>
    </div>
  );
}
