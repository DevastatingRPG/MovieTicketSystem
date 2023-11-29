// MovieTicketBookingSystem.jsx
import React, { useEffect, useState } from 'react';
import styles from 'styles/index.module.css'; // Import the local styles
import Layout from '@/components/layout';
import { fetchData } from '../utilities/fetching'
import Image from 'next/image';

function MovieTicketBookingSystem() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const test = async () => {
      try {
        let response = await fetchData('/booking?func=list');
        setData(response);
      }
      catch (err) {
        console.error(err);
      }
    }

    test()
    
  }, [])

  console.log(data)

  return (
    <Layout>
      <div>
        <h1 className={styles.title}>
          <u>MOVIE TICKET BOOKING SYSTEM</u>
        </h1>
        <br />
        <main>
          <section id={styles.intro} className={styles.section}>
            <p>
              Welcome to the next frontier in cinematic convenience – our online movie ticket booking system!
            </p>
            <p>
              Elevate your movie-going experience with seamless access to the latest blockbusters, hottest releases, and timeless classics right from the comfort of your fingertips.
            </p>
          </section>
          <br />
          <section id="img">
            <Image src="https://wallpaperaccess.com/full/3659750.jpg" width={888} height={500} alt="Movie Poster" className={styles.img}/>
          </section>
          <br />
        </main>
      </div>
    </Layout>
  );
}

export default MovieTicketBookingSystem;
