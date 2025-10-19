import { AuroraText } from "@/components/ui/aurora-text"
import Image from "next/image";
import Member27 from "../../../assets/aboutus-photomember-6787027.svg"
import Member34 from "../../../assets/aboutus-photomember-6787034.svg"
import Member42 from "../../../assets/aboutus-photomember-6787042.svg"
import Member62 from "../../../assets/aboutus-photomember-6787062.svg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faPinterest } from '@fortawesome/free-brands-svg-icons'
import Link from "next/link";
import { SparklesText } from "@/components/ui/sparkles-text"

export default function AboutUs() {
  return (
    <div className="bg-[#282151] flex flex-col min-h-screen p-8  ">
      <main>
        <div className="text-center ">
          <AuroraText className="text-4xl font-bold tracking-tighter md:text-5xl lg:text-7xl  pb-8" colors={["#FFDFEF", "#EABDE6", "#D69ADE", "#AA60C8"] } speed = {2}>ABOUT US</AuroraText>
        </div>

        <div className=" grid grid-cols-2  gap-12">
        {/* 6787027 */}
        <div className="bg-[#FFF7F7] flex  px-4 py-4 rounded-lg ">
          <div >
            <Image alt="logo" src={Member27} width='240' className="rounded-lg"/>
          </div>
          <div className="flex flex-col  px-4   ">
            <SparklesText>Nattanon Ngamkham</SparklesText>
            <span>Student ID : 6787027</span>
            <Link href="https://www.instagram.com/pr3merp" className="hover:text-[#A599ED] active:text-black" > <FontAwesomeIcon icon={faInstagram} size="xl" /> pr3merp </Link>
          </div>
        </div>

        {/* 6787034 */}
        <div className="bg-[#FFF7F7] flex  px-4 py-4 rounded-lg  ">
          <div >
            <Image alt="logo" src={Member34} width='240' className="rounded-lg"/>
          </div>
          <div className="flex flex-col px-4 ">
            <SparklesText>Thita</SparklesText>
            <span>Name : Thita</span>
            <span>Student ID : 6787034</span>
            <Link href="https://www.instagram.com/a.atiht" className="hover:text-[#A599ED] active:text-black" > <FontAwesomeIcon icon={faInstagram} size="xl" /> a.atiht </Link>
          </div>
        </div>
        {/* 6787042*/}
        <div className="bg-[#FFF7F7] flex  px-4 py-4 rounded-lg ">
          <div >
            <Image alt="logo" src={Member27} width='240' className="rounded-lg"/>
          </div>
          <div className="flex flex-col  px-4   ">
            <SparklesText >Thananchanok Chuensang</SparklesText>
            <span>Student ID : 6787027</span>
            <Link href="https://www.instagram.com/pr3merp" className="hover:text-[#A599ED] active:text-black" > <FontAwesomeIcon icon={faInstagram} size="xl" /> pr3merp </Link>
          </div>
        </div>

        {/* 6787062 */}
        <div className="bg-[#FFF7F7] flex  px-4 py-4 rounded-lg  ">
          <div >
            <Image alt="logo" src={Member62} width='240' className="rounded-lg"/>
          </div>
          <div className="flex flex-col px-4 ">
            <SparklesText>Pimthida Butsra</SparklesText>
            <span>Name : Thita</span>
            <span>Student ID : 6787034</span>
            <Link href="https://www.instagram.com/a.atiht" className="hover:text-[#A599ED] active:text-black" > <FontAwesomeIcon icon={faInstagram} size="xl" /> a.atiht </Link>
          </div>
        </div>
        

        </div>

      </main>
    </div>
  );
}
