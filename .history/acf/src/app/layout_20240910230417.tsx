import { Metadata } from "next";
import "styles/globals.css";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://localhost:8000";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
};

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" data-mode="light">
      <body>
        {/* Increased padding for top, left, and right */}
        <main className="relative px-10 sm:px-12 md:px-16 lg:px-20 xl:px-32 py-16"> 
          {props.children}
        </main>
      </body>
    </html>
  );
}
