import '../globals.css'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react';
import EventProvider from '../components/Providers/EventProvider';
import './rotate.css';
import Providers from '../components/Providers/Providers';

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
        <Providers >
          <div className="sm:flex xl:hidden lg:hidden md:hidden w-full justify-center content-center min-h-[100vh] items-center">
            <div className="flex flex-col">
              <div className="flex pl-12">
                <div className="phone">
                </div>
              </div>
              <div className="message">
                Please rotate your device!
              </div>
            </div>
          </div>
          {children}
        </Providers>
      </body>
      <Analytics />
    </html>
  )
}
