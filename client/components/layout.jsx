import React from 'react';
import Head from 'next/head';
import Navbar from './navbar';
import Footer from './footer';

const Layout = ({ children }) => {
 return (
   <>
     <Navbar />
     <div>
       <Head>
         <title>Movie Ticket Booking</title>
         <meta name="description" content="Mini Project" />
       </Head>
       {/* Use children prop to render the main content of the page  */}
       <main>
         {children}
       </main>
       <Footer />
     </div>
   </>
 );
};

export default Layout;