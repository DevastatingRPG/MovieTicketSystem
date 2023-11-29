// components/InsertShow.js
import React, { useState } from 'react';
import { postData } from '@/utilities/fetching';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function InsertShow() {
  // State variables to manage the input values
  const [showId, setShowId] = useState('');
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [timing, setTiming] = useState('');
  const [trailerUrl, setTrailerUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  // Function to handle form submission
  const handleSubmit = async () => {
    // Log the input values to the console

    try {
      const response = await postData('/admin?func=insshow', { 
        sid: showId,
        name: name,
        trailer: trailerUrl,
        stype: category,
        timing: timing,
        image: imageUrl 
      });
    }
    catch (err) {
      console.error("Error Inserting Show : ", err)
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
        <p>Name:</p>
        <TextField id="outlined-basic" label="Name" variant="outlined" onChange={(e) => setName(e.target.value)} />
        <br />
        <br />
        <p>Category:</p>
        <TextField id="outlined-basic" label="Category" variant="outlined" onChange={(e) => setCategory(e.target.value)} />
        <br />
        <br />
        <p>Timing:</p>
        <TextField id="outlined-basic" label="Timing" variant="outlined" onChange={(e) => setTiming(e.target.value)} />
        <br />
        <br />
        <p>Trailer URL:</p>
        <TextField id="outlined-basic" label="Trailer URL" variant="outlined" onChange={(e) => setTrailerUrl(e.target.value)} />
        <br />
        <br />
        <p>Image URL:</p>
        <TextField id="outlined-basic" label="Image URL" variant="outlined" onChange={(e) => setImageUrl(e.target.value)} />
        <br />
        <br />
        <Button variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
      </section>
    </div>
  );
}
