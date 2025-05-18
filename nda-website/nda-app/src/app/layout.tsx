import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DecorativeElements from '@/components/DecorativeElements';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NDA Document Portal",
  description: "Access documents after signing an NDA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        {/* Decorative elements */}
        <DecorativeElements count={6} />

        <Header />
        <main className="flex-grow flex items-center justify-center container mx-auto px-4 py-8 relative z-10">
          <div className="w-full">
            {children}
          </div>
        </main>
        <Footer />
      </body>
    </html>
  );
}
