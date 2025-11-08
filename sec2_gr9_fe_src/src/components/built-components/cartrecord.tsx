
import { Minus, Plus } from 'lucide-react'; 
import Image, { StaticImageData } from "next/image";

type CartItem = {
  id: number;
  name: string;
  price: number;
  collection: string;
  type: string;
  character: string;
  imageSrc: StaticImageData | string; 
  selectedItem: number;
  check: boolean;
};


type CartItemRowProps = {
  item: CartItem; 
  onUpdateSelect: (id: number, newSelectedItem: number) => void
  onToggleItem: (id: number) => void; // 
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('th-TH', {
    style: 'currency',
    currency: 'THB',
    minimumFractionDigits: 2,
  }).format(amount);
};

export default function CartItemRow({item, onUpdateSelect, onToggleItem}: CartItemRowProps) {
  const subtotal = item.price * item.selectedItem;

  return (
    <tr className="text-[#7469B6] align-middle border-b"> 
      <td className="py-4">
        <div className="flex items-center gap-4 ">
          <Image 
            src={item.imageSrc} 
            alt={item.name}     
            width={80}          
            height={80}         
            className="rounded-lg object-cover" 
          />
          <p className="font-medium ">{item.name}</p> 
        </div>
      </td>

      <td className="py-4 text-center text-[#7469B6]">
        <p>{formatCurrency(item.price)}</p> 
      </td>

      <td className="py-4 text-[#7469B6]">
        <div className="flex text-center items-center gap-3">
          <button
            className="text-[#7469B6] pl-10"
            onClick={() => onUpdateSelect(item.id, item.selectedItem - 1)}
            disabled={item.selectedItem <= 1} 
          >
            <Minus size={16} />
          </button>
          
          <span className="text-[#7469B6] w-8 text-center">{item.selectedItem}</span> 

          <button
            className="text-[#7469B6] "
            onClick={() => onUpdateSelect(item.id, item.selectedItem + 1)}
          >
            <Plus size={16} />
          </button>
        </div>
      </td>

      <td className="py-4">
        <div className="flex items-center justify-between  text-[#7469B6] pl-15"> 
          <p className="font-medium">{formatCurrency(subtotal)}</p> 
          <input
            type="checkbox"
            checked={item.check} 
            onChange={() => onToggleItem(item.id)}
            className="form-checkbox h-5 w-5 rounded text-[#775AC4] focus:ring-[#775AC4]"
          />
        </div>
      </td>
    </tr>
  );
}