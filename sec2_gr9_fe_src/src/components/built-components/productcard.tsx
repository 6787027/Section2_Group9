type ProductCardProps = {
  name: string;
  price: number;
  imageUrl: string,
  type : string,
  genre : string
};
export default function ProductCard({ name, price, imageUrl, type, genre }: ProductCardProps) {
  return (
    <div className="card bg-base-100  shadow-sm">
      <figure>
        <img
          src={imageUrl}
          alt={name} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {name}
        </h2>
        <p>{price}</p>
        <div className="card-actions justify-end">
          <div className="badge badge-outline">{type}</div>
          <div className="badge badge-outline">{genre}</div>
        </div>
      </div>
    </div>


  );
}