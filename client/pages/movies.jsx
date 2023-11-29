import React, { useState, useEffect } from 'react';
import styles from 'styles/movies.module.css'; // Import the local styles
import Layout from '../components/layout';
import Navbar from '@/components/navbar';
import { fetchData } from '@/utilities/fetching';

function MoviesList() {
  // Placeholder movie data until fetched from the backend
  const initialMovies = [
    {
      sid: 1,
      name: 'Taylor Swift: The Eras Tour',
      trailer: 'https://www.youtube.com/watch?v=GKzpB3tcEJE',
      image: 'https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:oi-discovery-catalog@@icons@@like_202006280402.png,ox-24,oy-617,ow-29:q-80/et00372543-tdmrwcdjpv-portrait.jpg',
    },
    {
      sid: 2,
      name: 'Priscilla',
      trailer: 'https://www.youtube.com/watch?v=kjTrPXP7S6Y',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxt2fhoIG9ZQ6kR_892cJs7oA0oehS0R4vxw&usqp=CAU',
    },
    // Add more placeholder data as needed
  ];

  const [movies, setMovies] = useState(initialMovies);

  useEffect(() => {
    // Fetch movie data from the backend server
    const getMovies = async () => {
      const response = await fetchData('/movies');
      if (response)
        setMovies(response)
      console.log(response);
    }

    getMovies()

  }, []); // The empty dependency array ensures that this effect runs once after the initial render

  return (
    <Layout>
      <div className={styles.container}>
        <h1>Currently available movies:</h1>
        {movies.map(movie => (
          <div key={movie.sid} className={styles.movie}>
            <p>
              <b>{movie.name}</b>
            </p>
            <p>Click on the picture to view the trailer:</p>
            <br />
            <a href={movie.trailer} target="_main">
              <img src={movie.image} height="300px" alt={movie.name} />
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
