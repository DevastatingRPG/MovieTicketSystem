// components/InsertShow.js
import React, { useState } from 'react';
import { postData } from '@/utilities/fetching';

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
        <input
          type="text"
          placeholder="Add Venue"
          value={showId}
          onChange={(e) => setShowId(e.target.value)}
        />
        <br />
        <br />
        <p>Name:</p>
        <input
          type="text"
          placeholder="Add Venue"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <br />
        <p>Category:</p>
        <input
          type="text"
          placeholder="Add Venue"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <br />
        <br />
        <p>Timing:</p>
        <input
          type="text"
          placeholder="Add Venue"
          value={timing}
          onChange={(e) => setTiming(e.target.value)}
        />
        <br />
        <br />
        <p>Trailer URL:</p>
        <input
          type="text"
          placeholder="Add Venue"
          value={trailerUrl}
          onChange={(e) => setTrailerUrl(e.target.value)}
        />
        <br />
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
