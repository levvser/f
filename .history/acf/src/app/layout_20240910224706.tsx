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
        {/* Further increasing the padding on the left and right */}
        <main className="relative px-20 py-8 lg:px-40 lg:py-12">
          {props.children}
        </main>
      </body>
    </html>
  );
}
