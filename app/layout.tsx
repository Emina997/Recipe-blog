"use client";

import { ReactNode } from 'react';
import { RecoilRoot } from 'recoil';
import "./globals.css";
import Navbar from './components/Navbar';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <RecoilRoot>
          <Navbar />
          <main>{children}</main>
        </RecoilRoot>
      </body>
    </html>
  );
}
