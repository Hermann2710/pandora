import type { Metadata } from "next";
import { Montserrat, Poppins } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["300", "400", "500", "600", "700"],
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "E-commerce App",
  description: "Boutique moderne Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${montserrat.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className={`${montserrat.className} min-h-full flex flex-col`}>
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}