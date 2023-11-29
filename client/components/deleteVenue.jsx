// components/DeleteVenue.js
import React, { useState } from 'react';
import { postData } from '@/utilities/fetching';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

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
        <TextField id="outlined-basic" label="Venue ID" variant="outlined" onChange={(e) => setVenueId(e.target.value)} />
        <br />
        <br />
        <Button variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
      </section>
    </div>
  );
}
