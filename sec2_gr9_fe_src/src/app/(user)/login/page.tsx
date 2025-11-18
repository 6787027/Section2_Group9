'use client'
import Image from "next/image";
import bgsignin from "../../../assets/bgsignin2.jpg"
import { AuroraText } from "@/components/ui/aurora-text"
import Link from "next/link";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";


export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const auth = useAuth();
  //เรียกใช้เมื่อกดปุ่ม login
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      //ส่ง request ไป API login
      const response = await fetch('http://localhost:3001/v1/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      //เก็บ token และข้อมูลผู้ใช้งานลง context
      auth.login(data.token, data.user);

      //ตรวจสอบประเภท user
      if (data.user.type === 'Admin') {
        router.push('/ad_product'); //ถ้าเป็นadmin ไปหน้าadmin
      } else {
        router.push('/user_profile'); //ถ้าเป็นuser ไปหน้าprofile
      }

    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }


  return (
    <div style={{ backgroundImage: `url(${bgsignin.src})` }} className="h-svh bg-cover bg-center flex  justify-center items-center">
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend className="fieldset border-base-300 rounded-box w-md border p-16 bg-fuchsia-200/75 backdrop-blur-sm">
            <div className="text-center pt-5">
              <AuroraText className="text-6xl font-bold tracking-tighter md:text-5xl lg:text-7xl  pb-8" colors={["#FFA6A6", "#7469B6"]} speed={2}>Login</AuroraText>
            </div>
            <label className="label font-bold">Email</label>
            <input type="email"
              className="input rounded-2xl"
              placeholder="Your Email"
              required value={email}
              onChange={(e) => setEmail(e.target.value)} />
            <label className="label font-bold">Password</label>
            <input type="password"
              className="input rounded-2xl"
              placeholder="Your Password"
              required value={password}
              onChange={(e) => setPassword(e.target.value)} />
            {error && (
              <div className="text-center text-red-700 font-bold mt-3">
                {error}
              </div>
            )}
            <button type="submit"
              className="btn shadow-none border-0 mt-4 rounded-2xl bg-fuchsia-900 text-white"
              disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
            {/*ลิงค์ไปหน้า signup*/}
            <div className="flex justify-around">
              <span className="text-sm pl-6 text-white">Don’t have acccount ?</span>
              <Link href="/signup" className="text-sm font-normal text-[#A599ED] link link-hover hover:text-white pr-12">Sign up</Link>
            </div>


          </legend>
        </fieldset>
      </form>
    </div>
  );
}
