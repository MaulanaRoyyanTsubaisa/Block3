import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/contexts/language-context"
import { ToastContextProvider } from "@/components/ui/toast-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "BLOCK3 - Blockchain Technology & Development",
  description:
    "Leading blockchain technology and development company dedicated to creating innovative solutions that drive business growth and digital transformation.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Prevent ethereum object conflicts */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
            // Prevent ethereum object conflicts
            if (typeof window !== 'undefined') {
              const originalDefineProperty = Object.defineProperty;
              
              Object.defineProperty = function(obj, prop, descriptor) {
                // Skip redefining ethereum property if it already exists
                if (obj === window && prop === 'ethereum' && window.hasOwnProperty('ethereum')) {
                  console.warn('Attempted to redefine ethereum property, skipping');
                  return obj;
                }
                return originalDefineProperty(obj, prop, descriptor);
              };
            }
          `,
          }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem={true} storageKey="block3-theme">
          <LanguageProvider>
            <ToastContextProvider>{children}</ToastContextProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'