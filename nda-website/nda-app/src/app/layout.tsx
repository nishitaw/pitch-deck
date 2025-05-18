import type { Metadata } from "next";
import "./globals.css";
import "../styles/critical.css";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DecorativeElements from '@/components/DecorativeElements';

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
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="color-scheme" content="light" />
      </head>
      <body
        className="antialiased flex flex-col min-h-screen overflow-x-hidden"
        suppressHydrationWarning={true}
      >
        {/* Decorative elements */}
        <DecorativeElements count={6} />

        <Header />
        <main className="flex-grow flex items-center justify-center container mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10 w-full max-w-full">
          <div className="w-full max-w-7xl mx-auto">
            {children}
          </div>
        </main>
        <Footer />
      </body>
    </html>
  );
}
