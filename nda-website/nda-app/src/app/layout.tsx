import type { Metadata } from "next";
import "./globals.css";
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
      </head>
      <body
        className="antialiased flex flex-col min-h-screen"
        suppressHydrationWarning={true}
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
