export default function User_profile() {
  return (
   <div className="bg-[#282151] min-h-screen  flex justify-center items-center">
    <main>
        <div className="bg-white  py-5">
            <div>
                <h1 className="text-center font-bold text-3xl">Your Profile</h1>
            </div>
            <div className="flex justify-around m-5 bg-pink-500">
                {/* <div className="flex justify-around bg-blue-500"> */}
                    <div className="pr-20">
                        <h3>First name</h3>
                        <div className="bg-black border-solid border-2 w-">Pimthida</div>
                    </div>
                    <div>
                        <h3>Last name</h3>
                        <div className="bg-black border-solid border-2 px-10">yay</div>
                    </div>
                {/* </div> */}
                

            </div>
        </div>





    </main>
   </div>
  );
}