import './globals.css'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Habit Harbor',
  description: 'App inspired by Atomic Habits book',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="sm:inline xl:hidden lg:hidden md:inline">
            <h1 className="text-center">This webapp only works on mobile screens, please try on a bigger screen</h1>
        </div>
        {children}
      </body>
      <Analytics />
    </html>
  )
}
