

export default function Ad_product() {
  return (
    <div className="bg-[#F1F0F4] flex flex-row">
        <div className="bg-white h-screen min-w-65 shadow-xl ">
            <header>
                <div className="my-16 ml-8 justify-items-start">
                    <h1 className="text-[#282151] font-bold text-xl">Admin name</h1>
                </div>
            </header>
            <div className="mx-3 border-b-1 border-[#D9D9D9]"></div>
            <nav>
                <div className="my-10 ml-8 text-xl justify-items-start">
                    <h2 className="mb-7 text-[#282151] font-bold">Tools</h2>
                    <h2 className="mb-7 text-[#7469B6] text-xl"><a href="/ad_product">Product</a><br></br></h2>
                    <h2 className="mb-7 text-[#7469B6] text-xl"><a href="/ad_account">Account</a><br></br></h2>
                    <h2 className="text-[#7469B6] text-xl"><a href="/ad_order">Order</a><br></br></h2>
                </div>
            </nav>
        </div>

        <main className="flex flex-col m-15 mt-10">
            <div className="flex justify-between bg-white w-250 py-3 mb-10 items-center border-solid border-1 border-white rounded-2xl shadow-xl">
                <div className="ml-5">
                    <div className="flex flex-nowrap border-solid border-1 border-black rounded-3xl pl-3 pr-3 ">
                        <input type="text" id="search" placeholder="Search" className="placeholder-[#D0D0D0] input-m ml-2 mr-2 my-1 pr-20 bg-white"></input>
                        <button type="button" >
                            <svg className="w-4 h-4 text-black dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/>
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="mr-5 ">
                    <button type="button" className="flex flex-nowrap font-bold text-[#282151] bg-[#E8E6FB] p-2 border-solid border-1 border-[#E8E6FB] rounded-2xl">
                        <svg className="mr-2 w-6 h-6 text-[#282151] dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7 7V5"/>
                        </svg> Add product
                    </button>
                </div>
            </div>
            <div className="border-1 border-white rounded-2xl shadow-xl bg-white w-250 h-105">
                <div className="mt-3 ml-5 mb-2">
                    <label className="text-[#7469B6] mr-2">Order Status</label>
                    <select id="or_select" defaultValue="Select" className="select pl-3 text-grey-200 bg-white border-solid border-1 border-white rounded-xl shadow-xl">
                        <option disabled={true}>Select</option>
                        <option>Paid</option>
                        <option>Pending</option>
                        <option>Sent</option>
                    </select>
                </div>
                <div className="border-b-1 border-[#D9D9D9]"></div>
                <div>
                    table
                </div>
            </div>
        </main>
    </div>
  );
}
