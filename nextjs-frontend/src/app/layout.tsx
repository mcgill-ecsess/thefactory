import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./Providers";
import ClientLayout from "./layout-client";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
//IF YOU ARE WONDERING, THIS IS THE IMAGE ON THE TAB AND LIKE THE NAME ON THE TAB :)
export const metadata: Metadata = {
  title: "The Factory",
  description:
    "The Factory is a student-run organization at McGill University that provides a space for students to learn and grow. It is a place where students can come to learn about technology and entrepreneurship.",
  icons: {
    icon: [
      { url: "/factory_logo.ico", type: "image/x-icon" },
      { url: "/factory_logo_32x32.png", type: "image/png", sizes: "32x32" },
    ],
    apple: [{ url: "/factory_logo_192x192.png", sizes: "192x192" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable}`}
        suppressHydrationWarning
      >
        <Providers>
          <ClientLayout>{children}</ClientLayout>
        </Providers>
      </body>
    </html>
  );
}

