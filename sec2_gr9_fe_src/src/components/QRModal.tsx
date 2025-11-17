import QrPayment from "@/assets/QrPayment.png"
import Image from "next/image"
import { Dispatch, SetStateAction, useEffect, useState } from "react"

interface Props {
    setModalShown: Dispatch<SetStateAction<'qr' | 'visa' | null>>
    setSuccess: Dispatch<SetStateAction<boolean>>
}

export default function QRModal({ setModalShown, setSuccess }: Props) {
    const [time, setTime] = useState('03:00')

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(prevTime => {
                const [minutes, seconds] = prevTime.split(':').map(Number);
                const totalSeconds = minutes * 60 + seconds;

                if (totalSeconds <= 1) {
                    clearInterval(interval);
                    return '00:00';
                }

                const newTotal = totalSeconds - 1;
                const newMinutes = String(Math.floor(newTotal / 60)).padStart(2, '0');
                const newSeconds = String(newTotal % 60).padStart(2, '0');

                return `${newMinutes}:${newSeconds}`;
            });
        }, 1000);

        return () => clearInterval(interval); // Cleanup on unmount
    }, []);

    return (
        <div className="absolute top-0 left-0 w-full h-full bg-black/70 backdrop-blur-sm flex items-center justify-center">
            <div className="bg-white p-4 px-20 rounded-2xl relative">
                <div className="flex flex-col items-center justify-center">
                    <span className="absolute top-4 right-8 cursor-pointer p-2" onClick={() => setModalShown(null)}>x</span>
                    <span className="font-bold text-4xl p-4 text-[#282151]">PAYMENT</span>
                    <Image src={QrPayment} alt="QR" />
                    <span className="mt-2">{time}</span>
                    <input type="button" onClick={() => setSuccess(true)} value="Success" className='bg-green-300 p-2 rounded-md mt-4 cursor-pointer border border-black' />
                </div>
            </div>
        </div>
    )
}