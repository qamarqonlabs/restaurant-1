import { Geist, Geist_Mono, Inter } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import { CartProvider } from "@/lib/cart-context"
import ClickSpark from "@/components/ClickSpark"
import { Footer2 } from "@/components/footer2"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        inter.variable
      )}
    >
      <body>
        <CartProvider>
          <ClickSpark
            sparkColor="#fff"
            sparkSize={15}
            sparkRadius={130}
            sparkCount={20}
            duration={500}
          >
            <ThemeProvider>{children}</ThemeProvider>
            <Footer2 />
          </ClickSpark>
        </CartProvider>
      </body>
    </html>
  )
}
