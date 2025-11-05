

export default function Ad_order() {
  return (
    <div className="bg-[#F1F0F4] min-h-screen min-w-screen flex flex-row">
        <div className="bg-white min-w-65 shadow-xl ">
            <header>
                <div className="my-16 ml-8 justify-items-start">
                    <h1 className="text-[#282151] font-bold text-xl">Admin name</h1>
                </div>
            </header>
            <div className="mx-3 border-b-1 border-[#D9D9D9]"></div>
            <nav>
                <div className="my-10 ml-8 text-xl justify-items-start">
                    <div className="mb-7 text-[#282151] font-bold">Tools</div>
                    <h2 className="mb-7 text-xl"><a href="/ad_product">Product</a><br></br></h2>
                    <h2 className="mb-7 text-xl"><a href="/ad_account">Account</a><br></br></h2>
                    <h2 className="text-xl font-bold"><a href="/ad_order">Order</a><br></br></h2>
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
                        </svg> Add Order
                    </button>
                </div>
            </div>
            <div className="border-1 border-white rounded-t-2xl shadow-xl bg-white w-250 h-fit">
                <div className="mt-3 ml-5 mb-2">
                    <label className="text-[#7469B6] mr-2">Order Status</label>
                    <select id="or_select" defaultValue="Select" className="select pl-3 text-grey-200 bg-white border-solid border-1 border-white rounded-xl shadow-xl">
                        <option disabled={true}>Select</option>
                        <option>Paid</option>
                        <option>Sent</option>
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
                                    <th>Time</th>
                                    <th>Price</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* row 1 */}
                                <tr >
                                    <td>OR0001</td>
                                    <td>2025/09/15 00:15:12</td>
                                    <td>1690</td>
                                    <td>
                                        <div id="statusborder">
                                            <div id="paid"></div>
                                            <div>Paid</div>
                                        </div>
                                    </td>
                                    <td className="flex flex-nowrap">
                                        <button type="button" id="or_edit">
                                            <svg className="w-[24px] h-[24px] text-black dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"/>
                                            </svg>
                                        </button>
                                        <div className="mx-5"></div>
                                        <button type="button" id="or_del">
                                            <svg className="w-[24px] h-[24px] text-[#E00303] dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                                {/* row 2 */}
                                <tr className="hover:bg-base-300">
                                    <td>OR0002</td>
                                    <td>2025/09/16 00:15:12</td>
                                    <td>590</td>
                                    <td>
                                        <div id="statusborder">
                                            <div id="sent"></div>
                                            <div>Sent</div>
                                        </div>
                                    </td>
                                    <td className="flex flex-nowrap">
                                        <button type="button" id="or_edit">
                                            <svg className="w-[24px] h-[24px] text-black dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"/>
                                            </svg>
                                        </button>
                                        <div className="mx-5"></div>
                                        <button type="button" id="or_del">
                                            <svg className="w-[24px] h-[24px] text-[#E00303] dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </main>
    </div>
  );
}
