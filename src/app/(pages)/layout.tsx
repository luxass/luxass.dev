import { Inter } from "@next/font/google";
import { Header } from "~/components/Header";
import "~/styles/globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head />
      <body className={`flex flex-col min-height-screen bg-gray-900 ${inter.variable} font-inter antialiased`}>
        <Header/>
        <main className="max-w-2xl mx-auto w-full h-screen flex flex-col">
          {children}
        </main>
        <footer className="sm:mt-12 py-8 border-t border-gray-800">
          <p className="text-center text-gray-200">
            &copy; {new Date().getFullYear()} Lucas Norgaard, All rights
            reserved.
          </p>
        </footer>
      </body>
    </html>
  );
}
