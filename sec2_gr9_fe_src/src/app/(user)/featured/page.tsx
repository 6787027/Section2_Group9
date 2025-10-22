import { AuroraText } from "@/components/ui/aurora-text"
import Image from "next/image";
import image1 from "@/assets/FeaturedPage.svg"
import image2 from "@/assets/ImageFeature2.svg"
import Link from "next/link";

export default function Featured() {
  return (
    <div className="bg-[#282151] flex flex-col  min-h-screen  text-center">
      <main>
        <div>
          <div className="pt-8">
            <AuroraText className="text-6xl font-bold" colors={["#FFDFEF", "#EABDE6", "#D69ADE", "#AA60C8"]}>FEATURED</AuroraText>
          </div>
          {/* image1 */}
          <div className="min-h-screen w-screen mt-8 content-end" style={{ backgroundImage: `url(${image1.src})` }}>
            <div className="pb-20">
              <Link href={"/product"}><button className="btn hover:bg-[#A599ED] active:bg-black rounded-xl border-0">Show now</button> </Link>
            </div>
          </div>

          {/* image2 */}
          <div className="min-h-screen w-screen flex justify-items-start items-end " style={{ backgroundImage: `url(${image2.src})` }}>
            <div className="p-40">
              <Link href={"/product"}><button className="btn hover:bg-[#A599ED] active:bg-black rounded-xl border-0">Show now</button> </Link>
            </div>
          </div>
        </div>

      </main>

    </div>
  );
}
