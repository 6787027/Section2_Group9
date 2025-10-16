import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "@/components/footer";

export const metadata = { title: "CelesteCrat", description: "Next.js App" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <Navbar />
        {children}

        <Footer/>

      </body>
       
    </html>
  );
}
