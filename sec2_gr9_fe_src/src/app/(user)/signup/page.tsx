'use client'
import { useState } from "react";
import Image from "next/image";
import bgsignin from "../../../assets/bgsignin2.jpg"
import { AuroraText } from "@/components/ui/aurora-text"
export default function Signup() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); 
  const [loading, setLoading] = useState(false); 
  return (
   <div style={{ backgroundImage: `url(${bgsignin.src})` }} className="h-svh bg-cover bg-center flex  justify-center items-center">
    <form>
      <fieldset>
        <legend className="fieldset border-base-300 rounded-box w-md border p-4 bg-fuchsia-200/75 backdrop-blur-sm ">
          <div className="text-center pt-5">
            <AuroraText className="text-4xl tracking-tighter md:text-5xl lg:text-7xl  pb-8 font-bold" colors={["#FFDFEF", "#EABDE6", "#D69ADE", "#AA60C8"] } speed = {2}>SIGN UP</AuroraText>
          </div>
          <label className="label font-bold ml-5">First Name</label>
          <input type="text" className="input rounded-2xl w-auto mx-5" value={firstName} onChange={(e)=>setFirstName(e.target.value)} placeholder="Your First Name" required />
          <label className="label font-bold ml-5">Last Name</label>
          <input type="text" className="input rounded-2xl w-auto mx-5"value={lastName} onChange={(e)=>setLastName(e.target.value)} placeholder="Your Last Name" required />
          <label className="label font-bold ml-5">Email</label>
          <input type="email" className="input rounded-2xl w-auto mx-5" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Your Email" required />
          <label className="label font-bold ml-5">Phone Number</label>
          <input type="tel" className="input rounded-2xl w-auto mx-5" value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder="Your Phone Number" required />
          <label className="label font-bold ml-5">Password</label>
          <input type="password" className="input rounded-2xl w-auto mx-5" value={password} onChange={(e) =>setPassword(e.target.value)} placeholder="Your Password" required />
          <button type="submit" className="h-10 mt-4 mx-5 rounded-2xl bg-fuchsia-900 text-white">Sign Up</button>
          

        
        </legend>
      </fieldset>
    </form>
    </div>


  );
}
