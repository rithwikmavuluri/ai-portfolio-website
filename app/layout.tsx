import type { Metadata } from "next";
import "./globals.css";
import AnalyticsProvider from "@/components/AnalyticsProvider";

export const metadata: Metadata = {
  title: "Rithwik Mavuluri - AI Product Manager",
  description: "AI Product Manager building AI-native products. 5.5 years experience shipping AI agents, computer vision, and mobile apps. Ask me anything about my work.",
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    viewportFit: 'cover',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <AnalyticsProvider>
          {children}
        </AnalyticsProvider>
      </body>
    </html>
  );
}
