import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/components/AuthProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: {
    default: "Campus Connect | New Journey Starts Here",
    template: "%s | Campus Connect",
  },
  description:
    "Discover a world of opportunities at Campus Connect. Connect with peers, join clubs, and shape your college experience.",
  keywords: [
    "college",
    "university",
    "education",
    "student life",
    "campus",
    "academics",
  ],
  authors: [{ name: "Karan Aggarwal" }],
  creator: "Karan Aggarwal",
  publisher: "Karan Aggarwal",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://campus-connect-karan.vercel.app",
    siteName: "Campus Connect",
    title: "Campus Connect | New Journey Starts Here",
    description:
      "Discover a world of opportunities at Campus Connect. Connect with peers, join clubs, and shape your college experience.",
    images: [
      {
        url: "https://campus-connect-karan.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Campus Connect",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <AuthProvider>
        <html lang="en">
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
            <Toaster />
          </body>
        </html>
      </AuthProvider>
    </ClerkProvider>
  );
}
