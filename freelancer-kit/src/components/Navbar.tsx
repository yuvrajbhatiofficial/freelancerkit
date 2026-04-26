"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Box, ArrowRight } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-100 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="bg-blue-600 text-white p-1.5 rounded-lg group-hover:scale-105 transition-transform">
              <Box className="w-5 h-5" />
            </div>
            <span className="font-bold text-xl tracking-tight text-gray-900 dark:text-gray-100">FreelanceKit</span>
          </Link>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
            
            {!pathname.startsWith('/dashboard') ? (
              <Link 
                href="/dashboard"
                className="flex items-center space-x-2 text-sm font-medium text-white bg-gray-900 dark:bg-gray-100 dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200 px-5 py-2.5 rounded-full transition-colors shadow-sm cursor-pointer"
              >
                <span>Go to App</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            ) : (
              <div className="flex items-center space-x-4">
                {pathname !== '/dashboard/settings' && (
                  <Link 
                    href="/dashboard/settings"
                    className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                  >
                    Settings
                  </Link>
                )}
                {pathname !== '/dashboard' && (
                  <Link 
                    href="/dashboard"
                    className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                  >
                    Dashboard
                  </Link>
                )}
                <Link 
                  href="/"
                  className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                >
                  Exit to Home
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
