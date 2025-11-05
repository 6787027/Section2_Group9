interface ProductInfo {
  name: string;
  price: number;
  imageUrl: string,
  type : string,
  genre : string
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('th-TH', {
    style: 'currency',
    currency: 'THB',
    minimumFractionDigits: 2,
  }).format(amount);
};
export default function ProductInfo({ name, price, imageUrl, type, genre }: ProductInfo) {
  return (
    <main className="flex flex-col">
        <div className="mt-10 flex flex-row justify-center">
            <div className="flex">
                <div>
                    <img className="bg-white p-10 my-5 mr-2 rounded-sm"
                        src={imageUrl}
                        width={250}
                        alt={name} />
                    <img className="bg-white p-10 my-5 mr-2 rounded-sm"
                        src={imageUrl}
                        width={250}
                        alt={name} />
                </div>
                
            </div>
            <div className="">
                <img className="bg-white p-40 my-5 ml-5 rounded-sm"
                    src={imageUrl}
                    width={250}
                    alt={name} />
            </div>
            
            <div className=" justify-items-start mt-5 ml-10 flex flex-col text-left">
                <div className="text-3xl mb-8 text-white">
                    {name}
                </div>
                <div className="flex flex-row mb-20 text-[#C8C4EE]">
                    <div className="text-2xl self-end">
                        {price}
                    </div>
                    <div className="px-5 text-2xl self-end">|</div>
                    <div className="text-l self-end">
                        200 left
                    </div>
                </div>
                <div className="mb-8 text-[#E8E6FB]">
                    <div className="mb-2">Quantity</div>
                    <div className="flex justify-start items-center gap-5 h-fit">
                        <button type="button" className="border-1 border-solid border-[#E8E6FB] justify-center items-center flex w-4 h-4">
                            
                        </button>
                        <span>1</span>
                        <button type="button" className="border-1 border-solid border-[#E8E6FB] justify-center items-center flex w-4 h-4">
                        </button>
                    </div>
                </div>
                <div className="flex justify-start">
                    <button type="button" className="border-white bg-white text-[#282151] rounded-xl p-3 shadow-xl font-bold text-lg">Add to Cart</button>
                    <div className="m-4"></div>
                    <button type="button" className="border-[#E00303] bg-[#E00303] text-white rounded-xl py-3 px-6 shadow-xl font-bold text-lg">Buy Now</button>
                </div>
            </div>
            <div className="m-15"></div>
        </div>
        <div className="self-center mr-9">
            <h1 className="ml-5 text-xl text-white font-bold text-start mt-20">
                    Description
                </h1>
                <div className="max-w-163">
                    <p className="ml-5 mt-5 text-white max-w-screen text-start">
                        The legend of Stella, the Astral Witch, now in your pocket! 
                        This irresistibly cute chibi charm is designed to fill your day with magic and inspiration. 
                        Carry this piece of the cosmos on your keys or bag.
                    </p>
                </div>
        </div>
        
      </main>


  );
}