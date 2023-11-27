import React, { useState, useEffect } from 'react';
import styles from 'styles/movies.module.css'; // Import the local styles
import Layout from '../components/layout';

function MoviesList() {
  // Placeholder movie data until fetched from the backend
  const initialMovies = [
    {
      id: 1,
      title: 'Taylor Swift: The Eras Tour',
      trailerLink: 'https://www.youtube.com/watch?v=GKzpB3tcEJE',
      imageUrl: 'https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:oi-discovery-catalog@@icons@@like_202006280402.png,ox-24,oy-617,ow-29:q-80/et00372543-tdmrwcdjpv-portrait.jpg',
    },
    {
      id: 2,
      title: 'Priscilla',
      trailerLink: 'https://www.youtube.com/watch?v=kjTrPXP7S6Y',
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxt2fhoIG9ZQ6kR_892cJs7oA0oehS0R4vxw&usqp=CAU',
    },
    // Add more placeholder data as needed
  ];

  const [movies, setMovies] = useState(initialMovies);

  useEffect(() => {
    // Fetch movie data from the backend server
    fetch('your_backend_api_endpoint') // Replace 'your_backend_api_endpoint' with the actual endpoint
      .then(response => response.json())
      .then(data => setMovies(data))
      .catch(error => console.error('Error fetching movies:', error));
  }, []); // The empty dependency array ensures that this effect runs once after the initial render

  return (
    <Layout>
      <div className={styles.container}>
        <h1>Currently available movies:</h1>
        {movies.map(movie => (
          <div key={movie.id} className={styles.movie}>
            <p>
              <b>{movie.title}</b>
            </p>
            <p>Click on the picture to view the trailer:</p>
            <br />
            <a href={movie.trailerLink} target="_main">
              <img src={movie.imageUrl} height="300px" alt={movie.title} />
            </a>
            <br />
          </div>
        ))}
        <div className={styles.bookingLink}>
          <p>Click here to proceed with booking</p>
          <br />
          <a href="booking">Bookings</a>
        </div>
      </div>
    </Layout>
  );
}

export default MoviesList;
