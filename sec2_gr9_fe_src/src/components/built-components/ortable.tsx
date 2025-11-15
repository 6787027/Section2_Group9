import { useState } from "react";
import EditModal from "./EditOrderModal";

interface Order {
    id: string;
    time: string;
    price: number;
    status: string;
};

export default function Acctable({id,time,price,status}: Order) {
    const [showEdit, setShowEdit] = useState(false);
        const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    
        const orData = { id,time,price,status};

        const handleDelete = async () => {
        try {
            const res = await fetch(`http://localhost:3001/ad_account/${email}`, {
                method: "DELETE",
            });

            if (res.ok) {
                alert("Order deleted successfully!");
                window.location.reload();
            } else {
                alert("Failed to delete order");
            }
        } catch (err) {
            console.error("Error deleting order:", err);
            alert("Error deleting order");
        }
    };

    return (
        <tr>
            <td>{id}</td>
            <td>{time}</td>
            <td>{price}</td>
            <td>{status}</td>
            <td className="items-center">
                <div className=" flex flex-nowrap">
                    <button id="edit" onClick={() => setShowEdit(true)}>
                        <svg className="w-[24px] h-[24px] text-black dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z" />
                        </svg>
                    </button>

                    <div id="delete" className="mx-5"></div>
                    <button onClick={() => setShowDeleteConfirm(true)}>
                        <svg className="w-[24px] h-[24px] text-[#E00303] dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z" />
                        </svg>
                    </button>
                </div>
                {showEdit && (
                    <EditModal
                        key={id}
                        or={orData}
                        onClose={() => setShowEdit(false)}
                        onSave={() => window.location.reload()}
                    />
                )}

                {showDeleteConfirm && (
                    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
                        <div className="bg-white rounded-xl shadow-2xl w-[400px] p-6">
                            <h3 className="text-xl font-bold mb-4 text-center">
                                Delete this order?
                            </h3>
                            <p className="text-gray-600 text-center mb-6">
                                Are you sure you want to delete order number <span className="font-semibold">{id}</span>?
                            </p>
                            <div className="flex justify-center gap-6">
                                <button
                                    onClick={handleDelete}
                                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                                >
                                    Delete
                                </button>
                                <button
                                    onClick={() => setShowDeleteConfirm(false)}
                                    className="text-gray-600 px-4 py-2 hover:underline"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </td>
        </tr>

    )
}