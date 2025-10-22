import QrPayment from "@/assets/QrPayment.png"
import Image from "next/image"
import { useEffect, useState } from "react"
export default function QRModal() {
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
        <div className="flex flex-col items-center justify-center">
            <span className="font-bold text-4xl p-4 text-[#282151]">PAYMENT</span>
            <Image src={QrPayment} alt="QR" />
            <span className="mt-2">{time}</span>
        </div>
    )
}