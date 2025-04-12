import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import { LayoutDashboard, Brain, Zap } from 'lucide-react';
import ChatComponent from './ai/page';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SmartGridAI',
  description: 'Intelligent power grid management and simulation',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          {/* Top Navigation */}
          <nav className="bg-gray-900 text-white">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between h-16">
                {/* Logo */}
                <Link href="/" className="flex items-center">
                  <h1 className="text-2xl font-bold">SmartGridAI</h1>
                </Link>

                {/* Navigation Links */}
                <div className="flex items-center space-x-4">
                  <Link 
                    href="/dashboard" 
                    className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-800 transition-all"
                  >
                    <LayoutDashboard size={20} />
                    <span>Dashboard</span>
                  </Link>
                  <Link 
                    href="/lida" 
                    className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-800 transition-all"
                  >
                    <Brain size={20} />
                    <span>Analysis Point (LIDA)</span>
                  </Link>
                  <Link 
                    href="/simulator" 
                    className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-800 transition-all"
                  >
                    <Zap size={20} />
                    <span>Simulator</span>
                  </Link>
                </div>
              </div>
            </div>
          </nav>
          
          {/* Main Content */}
          <div className="flex-1 bg-gray-50">
            {children}
            <ChatComponent/>
          </div>
        </div>
      </body>
    </html>
  );
}