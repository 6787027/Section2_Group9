type ProductCardProps = {
  name: string;
  price: number;
  imageUrl: string 
};
export default function ProductCard({ name, price, imageUrl }: ProductCardProps) {
  return (
    <div className="bg-white             
      rounded-lg           
      p-4                  
      flex                 
      flex-col                          
      overflow-hidden      
      hover:shadow-lg      
      transition-shadow">
      <img src={imageUrl} alt={name} className="items-center w-50 h-50" />
      <h3 className="font-bold items-start">{name}</h3>
      <p>$ {price}</p>
    </div>
  );
}