import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "PumpFun Bundler",
  description: "Advanced Solana token bundling platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased bg-gray-50`}>
        <div className="flex h-screen">
          <Sidebar />
          <main className="flex-1 overflow-hidden">
            <Header />
            <div className="h-[calc(100vh-4rem)] overflow-auto p-6">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
