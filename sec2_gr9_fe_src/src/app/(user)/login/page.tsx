import Image from "next/image";
import bgsignin from "../../../assets/bgsignin2.jpg"
import { AuroraText } from "@/components/ui/aurora-text"

export default function Login() {
  return (
    <div style={{ backgroundImage: `url(${bgsignin.src})` }} className="h-svh bg-cover bg-center flex  justify-center items-center">
    <form>
      <fieldset>
        <legend className="fieldset border-base-300 rounded-box w-xs border p-4 bg-fuchsia-200">
          <div className="text-center pt-5">
            <AuroraText className="text-4xl font-bold tracking-tighter md:text-5xl lg:text-7xl  pb-8" colors={["#FFDFEF", "#EABDE6", "#D69ADE", "#AA60C8"] } speed = {2}>Login</AuroraText>
          </div>
          <label className="label">Email</label>
          <input type="email" className="input" placeholder="Your Email" required />
          <label className="label">Password</label>
          <input type="password" className="input" placeholder="Your Password" required />
          <button type="submit" className="btn  mt-4 rounded-2xl bg-fuchsia-900 text-white">Login</button>

        
        </legend>
      </fieldset>
    </form>
    </div>
  );
}
