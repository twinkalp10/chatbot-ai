import "@/styles/globals.css"
import { Metadata } from "next"
import { Analytics } from "@vercel/analytics/react"

import { siteConfig } from "@/config/site"
import { fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { AuthWrapper } from "@/hooks/context/Auth"
import { SWRConfigHOC } from "@/hooks/context/SwrConfig"
import { Toaster } from "@/components/ui/toaster"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={cn(
            "bg-background  flex min-h-screen flex-col items-center justify-center font-sans antialiased",
            fontSans.variable
          )}
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="h-full w-full">
              <div className="relative flex min-h-screen flex-col">
                <div className="flex-1">
                  <AuthWrapper>
                    <SWRConfigHOC>{children}</SWRConfigHOC>
                  </AuthWrapper>
                </div>
              </div>
              <TailwindIndicator />
            </div>
          </ThemeProvider>
          <Analytics />
          <Toaster />
        </body>
      </html>
    </>
  )
}
