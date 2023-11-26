// components/InsertShow.js
import React, { useState } from 'react';

export default function InsertShow() {
  // State variables to manage the input values
  const [showId, setShowId] = useState('');
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [timing, setTiming] = useState('');
  const [trailerUrl, setTrailerUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  // Function to handle form submission
  const handleSubmit = () => {
    // Log the input values to the console
    console.log('Show ID:', showId);
    console.log('Name:', name);
    console.log('Category:', category);
    console.log('Timing:', timing);
    console.log('Trailer URL:', trailerUrl);
    console.log('Image URL:', imageUrl);

    // You can add additional logic here, such as sending the data to a server
  };

  return (
    <div>
      <section id="admin-venues">
        <br />
        <p>Show ID:</p>
        <input
          type="text"
          placeholder="Add Venue"
          value={showId}
          onChange={(e) => setShowId(e.target.value)}
        />
        <br />
        <p>Name:</p>
        <input
          type="text"
          placeholder="Add Venue"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <p>Category:</p>
        <input
          type="text"
          placeholder="Add Venue"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <br />
        <p>Timing:</p>
        <input
          type="text"
          placeholder="Add Venue"
          value={timing}
          onChange={(e) => setTiming(e.target.value)}
        />
        <br />
        <p>Trailer URL:</p>
        <input
          type="text"
          placeholder="Add Venue"
          value={trailerUrl}
          onChange={(e) => setTrailerUrl(e.target.value)}
        />
        <br />
        <p>Image URL:</p>
        <input
          type="text"
          placeholder="Add Venue"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <br />
        <br />
        <input type="submit" value="Submit" onClick={handleSubmit} />
      </section>
    </div>
  );
}
