import "@/app/globals.css";


export const metadata = { title: "CelesteCrat", description: "Next.js App" };

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
    <link href="https://fonts.googleapis.com/css2?family=Instrument+Sans:ital,wght@0,400..700;1,400..700&display=swap" rel="stylesheet" />
    </head>
      <body className="min-h-screen ">
        
        {children}

      </body>
       
    </html>
  );
}
