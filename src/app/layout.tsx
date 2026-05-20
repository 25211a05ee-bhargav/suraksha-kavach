import type { Metadata } from "next";
import "./globals.css";
import AuthProvider from "@/components/providers/AuthProvider";
import Navbar from "@/components/layout/Navbar";

export const metadata: Metadata = {
  title: "Suraksha Kavach | Gamified First-Responder Network",
  description: "A gamified first-responder network designed to transform students into certified virtual first responders for disaster management.",
};

import { ScoreProvider } from "@/context/ScoreContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <ScoreProvider>
            <Navbar />
            <main style={{ paddingTop: '120px', minHeight: '100vh' }}>
              {children}
            </main>
          </ScoreProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
