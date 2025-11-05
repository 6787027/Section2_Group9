


export default function AboutUs() {
  return (
    <div className="bg-[#282151] flex flex-col min-h-screen p-8  text-center ">
      <main>
        <div className="bg-white min-h-screen m-15 rounded-2xl ">
          <div>

            <div className="py-6">
              <span className="text-5xl font-bold text-[#282151] ">MY ORDER</span>
            </div>

            <div className="w-full">
              <table className="w-full text-center">
                <thead className="text-[#7469B6] text-lg border-y">
                  <tr>
                    <th className="py-2 font-semiboldl">Order No.</th>
                    <th className="py-2 font-semibold">Time</th>
                    <th className="py-2 font-semibold">Price</th>
                    <th className="py-2 font-semibold">Status</th>
                  </tr>
                </thead>

                <tbody className="text-[#7469B6] font-normal">
                  <tr>
                    <td className="py-4">OR00001</td>
                    <td className="py-4">2025/09/15 00:15:12</td>
                    <td className="py-4">590.00</td>
                    <td className="py-4">
                      <span className="inline-flex items-center">
                        <div className=" bg-gray-100 px-2.5 rounded-2xl"> 
                          <span className=" inline-block h-3 w-3 rounded-full bg-lime-500 mr-2"></span>
                          <span className="text-sm  text-[#7469B6] ">Paid</span>
                        </div>
                      </span>
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
