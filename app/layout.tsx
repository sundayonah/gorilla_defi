
import type { Metadata } from "next";
import "./globals.css";
import WalletContextProvider from "@/contexts/ContextProvider";
import { Toaster } from "react-hot-toast";



export const metadata: Metadata = {
  title: "Defi Gorilla",
  description: "Defi Gorilla MEME Token",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

        <WalletContextProvider> 
        <html lang="en">
        <body>
          <Toaster position="top-right" />
          {children}
        </body>
        </html>
      </WalletContextProvider>
         
  );
}