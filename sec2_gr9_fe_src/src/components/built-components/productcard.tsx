interface ProductCardProps {
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
export default function ProductCard({ name, price, imageUrl, type, genre }: ProductCardProps) {
  return (
    <div className="card bg-base-100  shadow-sm">
      <figure>
        <img
          src={imageUrl}
          width={250}
          alt={name} />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-[#282151] font-bold">
          {name}
        </h2>
        <h2 className="text-[#7469B6] font-semibold">{formatCurrency(price)}</h2>
        <div className="card-actions justify-end">
          <div className="badge badge-outline bg-pink-200 px-4">{type}</div>
          <div className="badge badge-outline bg-purple-200 px-3">{genre}</div>
        </div>
      </div>
    </div>


  );
}