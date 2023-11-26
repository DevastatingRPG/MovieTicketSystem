// Import React components
import React from 'react';

// Define a Footer component
const Footer = () => {
  return (
    <footer>
      <h3>Please contact: ticketbooking@gmail.com or 020-8867589 for any further queries or assistance.</h3>
      <style jsx>{`
        footer {
          background-color: white; /* Set background color to white */
          padding: 10px; /* Adjust padding as needed */
        }

        h3 {
          font-size: 18px; /* Set the desired font size */
          margin: 0; /* Remove default margin to reduce space */
        }
      `}</style>
    </footer>
  );
};

// Export the Footer component as default
export default Footer;
