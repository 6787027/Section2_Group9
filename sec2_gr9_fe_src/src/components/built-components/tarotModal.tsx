// component แสดงดวง จาก external web service
'use client';
import { TarotCard } from '@/app/(user)/home/page';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  card: TarotCard | null;
};


export default function TarotModal({ isOpen, onClose, card }: ModalProps) {
  if (!isOpen || !card) return null;


  return (
    <div
      className="fixed inset-0 bg-[rgba(0,0,0,0.7)] backdrop-blur-md z-50 flex justify-center items-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl p-6 max-w-2xl w-full h- text-black text-left relative shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-gray-800 text-3xl font-bold"
        >
          &times;
        </button>

        <div className="mt-4">
          <h3 className="text-2xl font-bold text-center text-[#282151]">
            {card.name}
          </h3>
          <p className="text-md text-gray-700 mt-2 text-center">
            <strong>Meaning:</strong> {card.meaning_up}
          </p>
          <p className="text-sm text-gray-500 mt-4">
            {card.desc}
          </p>
        </div>
      </div>
    </div>
  );
}