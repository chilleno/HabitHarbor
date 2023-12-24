import './landing.css';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import Providers from './components/Providers/Providers';

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
    <html>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
      <Analytics />
    </html>
  )
}
