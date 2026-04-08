import Header from "./components/Header";
import "./globals.css";
import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-be-vietnam-pro",
});

export const metadata: Metadata = {
  title: "HGPT Steel Culture Board",
  description: "Bảng tin Văn hóa Nội bộ HGPT Steel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${beVietnamPro.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className={`${beVietnamPro.className} min-h-full flex flex-col`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
