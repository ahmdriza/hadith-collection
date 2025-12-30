import type { Metadata } from "next";
import { Inter, Amiri } from "next/font/google"; // Or your preferred font
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import Footer from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });
const amiri = Amiri({
  subsets: ['arabic'],
  weight: ['400', '700'],
  variable: '--font-amiri',
});

export const metadata: Metadata = {
  title: "Hadith Collection",
  description: "Authentic Hadith Collection",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${amiri.variable} bg-gray-50 flex flex-col min-h-screen text-gray-900`}>
        {/* Navbar */}
        <Navbar />

        {/* Main Content Area */}
        <div className="max-w-7xl mx-auto w-full flex items-start flex-1">
          {/* Sidebar */}
          <Sidebar />

          {/* Main Feed */}
          <main className="flex-1 px-3 py-4 md:p-8 w-full min-w-0">
            {children}
          </main>
        </div>

        <Footer />
      </body>
    </html>
  );
}
