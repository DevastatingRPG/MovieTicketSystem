import React, { ReactNode } from 'react';
import Head from 'next/head';
import Navbar from './navbar';
import Footer from './footer';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
    <Navbar/>
        <title>Movie Ticket Booking</title>
        <meta name="description" content="Mini Project" />
      {/* Use children prop to render the main content of the page */}
      <main>
        {children}
      </main>
      <Footer/>
    </div>
  );
};

export default Layout;
