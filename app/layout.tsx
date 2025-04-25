import type { Metadata } from "next";
import "./globals.css";
import { poppins } from "./components/Fonts/Fonts";
import QueryProvider from "./providers/QueryProvider";
import PageTransition from "./components/PageTransition/PageTransition";
// import { AuthProvider } from "./context/authContext";

export const metadata: Metadata = {
  title: "Fincarts",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased ${poppins.className}`}
      >
        <QueryProvider>
          {/* <AuthProvider> */}
            <PageTransition>
              {children}
            </PageTransition>
          {/* </AuthProvider> */}
        </QueryProvider>
      </body>
    </html>
  );
}
