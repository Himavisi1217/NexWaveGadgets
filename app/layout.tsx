// /app/layout.tsx
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/lib/auth";
import { ProductProvider } from "@/lib/products";
import { Toaster } from "@/components/ui/toaster";
import { Suspense } from "react";
import "./globals.css";
// import { Navbar } from "@/components/navbar"; // Uncomment if you want it global


export const metadata: Metadata = {
title: "NextWave Gadgets - LED Lights & Smart Gadgets",
description: "Professional LED lights and smart gadgets store in Sri Lanka",
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
return (
<html lang="en" suppressHydrationWarning>
<body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
<Suspense fallback={null}>
<ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
<AuthProvider>
<ProductProvider>
{/* <Navbar /> */}
{children}
<Toaster />
</ProductProvider>
</AuthProvider>
</ThemeProvider>
<Analytics />
</Suspense>
</body>
</html>
);
}