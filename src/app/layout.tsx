"use client";
import "../styles/globals.css";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from "react";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// export const metadata = {
//   title: "PokeDex",
//   description: "PokeDex is a simple PokeDex app built with Next.js",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const [queryClient] = useState(() => new QueryClient());

  return (
    <html lang="en">
      <body
        // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
                <QueryClientProvider client={queryClient}>

        {children}
        </QueryClientProvider>
      </body>
    </html>
  );
}
