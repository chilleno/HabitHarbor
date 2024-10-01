import '../globals.css'
import { Analytics } from '@vercel/analytics/react';
import './rotate.css';
import Providers from '../components/Providers/Providers';

export default function Layout({
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
