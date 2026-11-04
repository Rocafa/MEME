import { Inter_Tight, JetBrains_Mono } from "next/font/google"

export const sans = Inter_Tight({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
})

export const mono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})
