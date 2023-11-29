// components/DeleteShow.js
import { postData } from '@/utilities/fetching';
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

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
        <TextField id="outlined-basic" label="Show ID" variant="outlined" onChange={(e) => setShowId(e.target.value)} />
        <br />
        <br />
        <Button variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
      </section>
    </div>
  );
}
