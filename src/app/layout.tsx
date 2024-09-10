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
        {/* Significantly increased padding */}
        <main className="relative px-16 sm:px-24 md:px-32 lg:px-40 xl:px-48 py-24"> 
          {props.children}
        </main>
      </body>
    </html>
  );
}
