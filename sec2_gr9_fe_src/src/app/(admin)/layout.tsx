import "@/app/globals.css";
import React from 'react'
import "./ad.css";

export const metadata = { title: "CelesteCraft", description: "Next.js App" };

const internalCss = `
  min-height: 100vh;
  width: 100vw;
        `;

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Instrument+Sans:ital,wght@0,400..700;1,400..700&display=swap" rel="stylesheet" />
        <style dangerouslySetInnerHTML={{ __html: internalCss }} />

      </head>
      <body className="min-h-screen ">

        {children}

      </body>

    </html>
  );
}
