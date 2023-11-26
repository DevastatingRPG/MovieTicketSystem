// components/DeleteVenue.js
import React, { useState } from 'react';

export default function DeleteVenue() {
  // State variable to manage the input value
  const [venueId, setVenueId] = useState('');

  // Function to handle form submission
  const handleSubmit = () => {
    // Log the input value to the console
    console.log('Venue ID:', venueId);

    // You can add additional logic here, such as sending the data to a server
  };

  return (
    <div>
      <section id="admin-venues">
        <br />
        <p>Venue ID:</p>
        <input
          type="text"
          placeholder="Delete Venue"
          value={venueId}
          onChange={(e) => setVenueId(e.target.value)}
        />
        <br />
        {/* <input type="submit" value="Submit" onClick={handleSubmit} /> */}
      </section>
    </div>
  );
}
