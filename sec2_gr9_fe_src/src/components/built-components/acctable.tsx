import { useState } from "react";
import EditModal from "./EditAccountModal";

// Interface สำหรับกำหนดโครงสร้างข้อมูลของ Account (Props ที่รับเข้ามา)
interface Account {
    email: string;
    fname: string;
    lname: string;
    phonenum: string;
    pass: string;
    type: string;
};

export default function Acctable({ email, fname, lname, phonenum, pass, type }: Account) {
    // State สำหรับควบคุมการแสดง Modal แก้ไขข้อมูล (Edit Modal)
    const [showEdit, setShowEdit] = useState(false);
    // State สำหรับควบคุมการแสดง Modal ยืนยันการลบ (Delete Confirmation Modal)
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    // รวมข้อมูล Account เป็น Object เพื่อส่งไปให้ EditModal
    const accData = { email, fname, lname, phonenum, pass, type };

    // ฟังก์ชันสำหรับลบบัญชี (Delete Account)
    const handleDelete = async () => {
        try {
            // ส่ง Request Method DELETE ไปยัง API โดยระบุ email
            const res = await fetch(`http://localhost:3001/ad_account/${email}`, {
                method: "DELETE",
            });

            // ตรวจสอบผลลัพธ์
            if (res.ok) {
                alert("Account deleted successfully!"); // แจ้งเตือนเมื่อสำเร็จ
                window.location.reload(); // รีโหลดหน้าเว็บเพื่ออัปเดตข้อมูล
            } else {
                alert("Failed to delete account"); // แจ้งเตือนเมื่อล้มเหลว
            }
        } catch (err) {
            console.error("Error deleting account:", err);
            alert("Error deleting account");
        }
    };

    // ส่วนการแสดงผล (Render) เป็นแถวในตาราง (<tr>)
    return (
        <tr>
            {/* แสดงข้อมูลในแต่ละคอลัมน์ */}
            <td>{email}</td>
            <td>{type}</td>
            <td>{fname}</td>
            <td>{lname}</td>
            <td>{phonenum}</td>

            {/* คอลัมน์สำหรับปุ่ม Action (Edit / Delete) */}
            <td className="items-center">
                <div className=" flex flex-nowrap">

                    {/* ปุ่ม Edit: เมื่อกดจะตั้งค่า showEdit เป็น true เพื่อเปิด Modal */}
                    <button id="edit" onClick={() => setShowEdit(true)}>
                        <svg className="w-[24px] h-[24px] text-black dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z" />
                        </svg>
                    </button>

                    <div id="delete" className="mx-5"></div>

                    {/* ปุ่ม Delete: เมื่อกดจะตั้งค่า showDeleteConfirm เป็น true เพื่อเปิด Modal ยืนยัน */}
                    <button onClick={() => setShowDeleteConfirm(true)}>
                        <svg className="w-[24px] h-[24px] text-[#E00303] dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z" />
                        </svg>
                    </button>
                </div>

                {/* แสดง Modal แก้ไขข้อมูลเมื่อ showEdit เป็น true */}
                {showEdit && (
                    <EditModal
                        key={email}
                        acc={accData}
                        onClose={() => setShowEdit(false)} // ปิด Modal
                        onSave={() => window.location.reload()} // รีโหลดหน้าเมื่อบันทึกเสร็จ
                    />
                )}

                {/* แสดง Modal ยืนยันการลบเมื่อ showDeleteConfirm เป็น true */}
                {showDeleteConfirm && (
                    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
                        <div className="bg-white rounded-xl shadow-2xl w-[400px] p-6">
                            <h3 className="text-xl font-bold mb-4 text-center">
                                Delete this account?
                            </h3>
                            <p className="text-gray-600 text-center mb-6">
                                Are you sure you want to delete <span className="font-semibold">{email}</span>?
                                Account type: <span className="font-semibold">{type}</span>?
                            </p>
                            <div className="flex justify-center gap-6">
                                {/* ปุ่มยืนยันการลบ: เรียกฟังก์ชัน handleDelete */}
                                <button
                                    onClick={handleDelete}
                                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                                >
                                    Delete
                                </button>
                                {/* ปุ่มยกเลิก: ปิด Modal */}
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