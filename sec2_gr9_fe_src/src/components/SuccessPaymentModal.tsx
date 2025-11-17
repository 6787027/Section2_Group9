import { LucideCheckCircle, LucideCheckCircle2 } from "lucide-react"
import { Dispatch, SetStateAction } from "react"

interface Props {
    setModalShown: Dispatch<SetStateAction<boolean>>
}

export const SuccessPaymentModal = ({ setModalShown }: Props) => {
    return (
        <div className="absolute top-0 left-0 w-full h-full bg-black/70 backdrop-blur-sm flex items-center justify-center">
            <div className="bg-white p-4 px-20 rounded-2xl relative">
                <div className="flex flex-col items-center justify-center">
                    <span className="absolute top-4 right-8 cursor-pointer p-2" onClick={() => setModalShown(false)}>x</span>
                    <LucideCheckCircle2 color="green" size={84} className="mt-8 mb-8" />
                    <h3 className="text-xl font-bold">PAYMENT SUCCESSFUL</h3><br />
                    <span>We have received your payment</span>
                    <span>Thank you</span><br />
                </div>
            </div>
        </div>
    )
}