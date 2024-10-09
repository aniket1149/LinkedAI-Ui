import localFont from "next/font/local";
import "./globals.css";

import { Open_Sans } from 'next/font/google';

// Import Open Sans with desired configurations
const openSans = Open_Sans({
  subsets: ['latin'], // Include the required subsets
  weight: ['400', '600', '700'], // Specify the font weights you intend to use
  display: 'swap', // Improve loading performance
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${openSans.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
