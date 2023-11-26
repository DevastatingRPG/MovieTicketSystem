// components/InsertVenue.js
import React, { useState } from 'react';

export default function InsertVenue() {
  // State variables to manage the input values
  const [venueId, setVenueId] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  const [location, setLocation] = useState('');
  const [venueType, setVenueType] = useState('');
  const [availability, setAvailability] = useState('');

  // Function to handle form submission
  const handleSubmit = () => {
    // Log the input values to the console
    console.log('Venue ID:', venueId);
    console.log('City:', city);
    console.log('Pincode:', pincode);
    console.log('Location:', location);
    console.log('Venue Type:', venueType);
    console.log('Availability:', availability);

    // You can add additional logic here, such as sending the data to a server
  };

  return (
    <div>
      <section id="admin-venues">
        <br />
        <p>Venue ID:</p>
        <input
          type="text"
          placeholder="Add Venue"
          value={venueId}
          onChange={(e) => setVenueId(e.target.value)}
        />
        <br />
        <p>City:</p>
        <input
          type="text"
          placeholder="Add Venue"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <br />
        <p>Pincode:</p>
        <input
          type="text"
          placeholder="Add Venue"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
        />
        <br />
        <p>Location:</p>
        <input
          type="text"
          placeholder="Add Venue"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <br />
        <p>Venue Type:</p>
        <input
          type="text"
          placeholder="Add Venue"
          value={venueType}
          onChange={(e) => setVenueType(e.target.value)}
        />
        <br />
        <p>Availability:</p>
        <input
          type="text"
          placeholder="Add Venue"
          value={availability}
          onChange={(e) => setAvailability(e.target.value)}
        />
        <br />
        <br />
        {/* <input type="submit" value="Submit" onClick={handleSubmit} /> */}
      </section>
    </div>
  );
}
