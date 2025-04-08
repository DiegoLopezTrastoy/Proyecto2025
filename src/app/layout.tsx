"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "primereact/resources/themes/lara-dark-cyan/theme.css";
import "primeicons/primeicons.css";
import { ThemeProvider } from "./_layout/themeProvider";
import { SessionProvider } from "next-auth/react";
import Header from "./_layout/header";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/logo.svg" />
        <title>Proyecto 2025</title>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
              <motion.div
                key={pathname} // El key asegura que cada página tiene su propia animación
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
              >
                {children}
              </motion.div>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
