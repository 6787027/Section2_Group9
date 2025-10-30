

export default function Ad_product() {
  return (
    <div className="bg-[#F1F0F4] flex flex-row">
        <div className="bg-[#F5F5F5] h-dvh w-65 shadow-xl ">
            <header className="border-b-4 border-black-200">
                <div className="my-12 ml-8 justify-items-start">
                    <h1 className="text-[#282151] font-bold text-xl">Admin name</h1>
                </div>
            </header>
            <nav>
                <div className="my-10 ml-8 text-xl justify-items-start">
                    <h2 className="mb-7 text-[#282151] font-bold">Tools</h2>
                    <h2 className="mb-7 text-[#7469B6] text-xl"><a href="/ad_product">Product</a><br></br></h2>
                    <h2 className="mb-7 text-[#7469B6] text-xl"><a href="/ad_account">Account</a><br></br></h2>
                    <h2 className="text-[#7469B6] text-xl"><a href="/ad_order">Order</a><br></br></h2>
                </div>
            </nav>
        </div>

        <main className="flex flex-col m-15">
            <div className="mb-10 ">
                <div className="w-full bg-white ">
                    <div>
                        <input type="text" id="search" className="border-solid border-1 border-black rounded-xl"></input>
                        <button type="button"></button>
                    </div>
                </div>
            </div>
            <div>
                table
            </div>
        </main>
    </div>
  );
}
