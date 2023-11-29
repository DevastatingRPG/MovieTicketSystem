import React from 'react';

// Define a Footer component
const Footer = () => {
  return (
    <footer>
      <h3>Please contact: ticketbooking@gmail.com or 020-8867589 for any further queries or assistance.</h3>
      <style jsx>{`
        footer {
          bottom: 0;
          width: 100%;
          background-color: black;
          color: white;
          padding: 3px;
          font-family: Arial, sans-serif;
          font-size: 15px;
        }

        h3 {
          text-align: center;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
