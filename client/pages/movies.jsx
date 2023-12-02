import React, { useState, useEffect } from 'react';
import styles from 'styles/movies.module.css'; // Import the local styles
import Layout from '../components/layout';
import { fetchData } from '@/utilities/fetching';
import Link from 'next/link';
import Button from '@mui/material/Button';

function MoviesList() {
  // Placeholder movie data until fetched from the backend
  const [movies, setMovies] = useState([]);

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
        {movies && Array.isArray(movies) ? (
          movies.map(movie => (
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
          ))
        ) : (
          <p>No movies available</p>
        )}
        <br />
        <Button variant="contained" onClick={() => window.location.href = "/booking"}>
          Bookings
        </Button>
      </div>
    </Layout>
  );
}

export default MoviesList;
