import type { Metadata } from "next";
import localFont from "next/font/local";
// import { Toaster } from "@/components/ui/toaster";
import { Toaster } from "react-hot-toast";
import Header from "../components/header";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Sergio's Dashboard",
  description: "Dashboard for beauty App",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen w-full bg-white`}
        >
          <div className="mx-auto max-w-screen-xl h-screen flex flex-col">
            <div className="flex-grow">
              <Header />
              {children}
            </div>
          </div>
          <Toaster />
        </body>
      </html>
    </SessionProvider>
  );
}
