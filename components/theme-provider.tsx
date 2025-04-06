"use client"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  // Hapus state mounted karena tidak diperlukan di sini dan bisa menyebabkan masalah
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}

