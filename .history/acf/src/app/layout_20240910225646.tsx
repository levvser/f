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
        {/* Matching padding behavior similar to IKEA */}
        <main className="relative px-6 sm:px-8 md:px-12 lg:px-16 xl:px-24 py-8">
          {props.children}
        </main>
      </body>
    </html>
  );
}
