import './landing.css';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import Providers from './components/Providers/Providers';
import Script from 'next/script';

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
      <Script src="https://cdn.luckat.me/luckatme.js"></Script>
      <Script id="customscript-luckatme">
        {`
          window.onload = function() {
            initLuckatMe(
                "Hello there! My name is Antonio Gonzalez A.K.A Chilleno, creator of HabitHarbor, I hope you like this tool. If you have any questions or suggestions, please click on the link below to connect! I would be happy do add new features to the app!",
                "follow me on x!",
                "https://x.com/chill__eno",
                "https://avatars.githubusercontent.com/u/127969843?v=4",
            );
          };
        `}
      </Script>
    </html>
  )
}
