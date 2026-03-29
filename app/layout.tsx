import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Home | AI Civic Commons",
  description: "The shared commons for AI education and the public interest. Hundreds of nonprofits, libraries, faith communities, and universities working together.",
  openGraph: {
    title: "Home | AI Civic Commons",
    description: "The shared commons for AI education and the public interest. Hundreds of nonprofits, libraries, faith communities, and universities working together.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:shadow focus:ring-2 focus:ring-amber-600 focus:ring-offset-2"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
