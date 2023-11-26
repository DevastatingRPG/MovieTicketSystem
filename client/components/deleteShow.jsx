// components/DeleteShow.js
import React, { useState } from 'react';

export default function DeleteShow() {
  // State to manage the input value
  const [showId, setShowId] = useState('');

  // Function to handle form submission
  const handleSubmit = () => {
    // Log the input value to the console
    console.log('Show ID:', showId);

    // You can add additional logic here, such as sending the data to a server
  };

  return (
    <div>
      <section id="admin-venues">
        <br />
        <p>Show ID:</p>
        <input
          type="text"
          placeholder="Delete Venue"
          value={showId}
          onChange={(e) => setShowId(e.target.value)}
        />
        <br />
        <br />
        {/* <input type="submit" value="Submit" onClick={handleSubmit} /> */}
      </section>
    </div>
  );
}
