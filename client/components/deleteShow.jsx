// components/DeleteShow.js
import { postData } from '@/utilities/fetching';
import React, { useState } from 'react';

export default function DeleteShow() {
  // State to manage the input value
  const [showId, setShowId] = useState('');

  // Function to handle form submission
  const handleSubmit = async () => {
    // Log the input value to the console
    try {
      const response = await postData('/admin?func=delshow', { sid: showId });
    }
    catch (err) {
      console.error("Error Deleting Show : ", err)
    }
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
        <input type="submit" value="Submit" onClick={handleSubmit} />
      </section>
    </div>
  );
}
