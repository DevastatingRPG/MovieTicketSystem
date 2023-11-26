import React, { useEffect, useState } from 'react';
import 'styles/index.css';
import 'styles/navbar.css';
import Layout from '@/components/layout';
import Navbar from '@/components/navbar';
import { fetchData } from '../utilities/fetching'

function MovieTicketBookingSystem() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const test = async () => {
      try {
        let response = await fetchData('/booking?func=list');
        setData(response);
        console.log(data);
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
        <h1>
          <u>MOVIE TICKET BOOKING SYSTEM</u>
        </h1>
        <main>
          <section id="intro">
            <p>
              Welcome to the next frontier in cinematic convenience – our online movie ticket booking system!
            </p>
            <p>
              Elevate your movie-going experience with seamless access to the latest blockbusters, hottest releases, and timeless classics right from the comfort of your fingertips.
            </p>
          </section>
          <br />
          <section id="img">
            <img src="" height="500px" alt="Movie Poster" />
          </section>
          <br />
        </main>
      </div>
    </Layout>
  );
}

export default MovieTicketBookingSystem;