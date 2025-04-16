import type { Metadata } from "next";
import "./globals.css";
import { poppins } from "./components/Fonts/Fonts";
import PageTransition from "./components/PageTransition/PageTransition";

export const metadata: Metadata = {
  title: "Fincart",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased ${poppins.className}`}>
        <PageTransition>
          {children}
        </PageTransition>
      </body>
    </html>
  );
}