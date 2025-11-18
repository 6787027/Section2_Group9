interface ProductCardProps {
  name: string;
  price: number;
  imageUrl: string,
  type : string,
  collection : string
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('th-TH', {
    style: 'currency',
    currency: 'THB',
    minimumFractionDigits: 2,
  }).format(amount);
};
// component product card ใน product
export default function ProductCard({ name, price, imageUrl, type, collection }: ProductCardProps) {
  return (
    <div className="card bg-base-100  shadow-sm">
      <figure>
        <div className="w-full aspect-square bg-gray-200"> 
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover object-center" 
        />
      </div>
      </figure>
      <div className="card-body">
        <h2 className="card-title text-[#282151] font-bold">
          {name}
        </h2>
        <h2 className="text-[#7469B6] font-semibold">{formatCurrency(price)}</h2>
        <div className="card-actions justify-end">
          <div className="badge badge-outline bg-pink-200 px-4">{type}</div>
          <div className="badge badge-outline bg-purple-200 px-3">{collection}</div>
        </div>
      </div>
    </div>


  );
}