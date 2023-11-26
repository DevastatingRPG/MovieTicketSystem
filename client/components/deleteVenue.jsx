// components/DeleteVenue.js
import React, { useState } from 'react';
import { postData } from '@/utilities/fetching';

export default function DeleteVenue() {
  // State variable to manage the input value
  const [venueId, setVenueId] = useState('');

  // Function to handle form submission
  const handleSubmit = async () => {
    // Log the input value to the console
    try {
      const response = await postData('/admin?func=delvenue', { vid: venueId });
    }
    catch (err) {
      console.error("Error Deleting Venue : ", err)
    }
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
        <input type="submit" value="Submit" onClick={handleSubmit} />
      </section>
    </div>
  );
}
