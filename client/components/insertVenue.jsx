// components/InsertVenue.js
import React, { useState } from 'react';
import { postData } from '@/utilities/fetching';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function InsertVenue() {
  // State variables to manage the input values
  const [venueId, setVenueId] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  const [location, setLocation] = useState('');
  const [venueType, setVenueType] = useState('');
  const [availability, setAvailability] = useState('');

  // Function to handle form submission
  const handleSubmit = async () => {

    try {
      const response = await postData('/admin?func=insshow', {
        vid: venueId,
        cirt: city,
        pincode: pincode,
        location: location,
        vtype: venueType,
        avail: availability
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
        <p>Venue ID:</p>
        <TextField id="outlined-basic" label="Venue ID" variant="outlined" onChange={(e) => setVenueId(e.target.value)} />
        <br />
        <br />
        <p>City:</p>
        <TextField id="outlined-basic" label="City" variant="outlined" onChange={(e) => setCity(e.target.value)} />
        <br />
        <br />
        <p>Pincode:</p>
        <TextField id="outlined-basic" label="Pincode" variant="outlined" onChange={(e) => setPincode(e.target.value)} />
        <br />
        <br />
        <p>Location:</p>
        <TextField id="outlined-basic" label="Location" variant="outlined" onChange={(e) => setLocation(e.target.value)} />
        <br />
        <br />
        <p>Venue Type:</p>
        <TextField id="outlined-basic" label="Venue Type" variant="outlined" onChange={(e) => setVenueType(e.target.value)} />
        <br />
        <br />
        <p>Availability:</p>
        <TextField id="outlined-basic" label="Availability" variant="outlined" onChange={(e) => setAvailability(e.target.value)} />
        <br />
        <br />
        <Button variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
      </section>
    </div>
  );
}
