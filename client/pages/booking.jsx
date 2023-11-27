import React, { useState, useEffect } from 'react';
import styles from 'styles/booking.module.css';
import Layout from '../components/layout';
// import 'styles/navbar.css';
import Navbar from '@/components/navbar';
import seats from '../components/seats';
import Seats from '../components/seats';


function BookingForm() {
  const initialData = [
    [
      { SID: 1, VID: 1 },
      { SID: 2, VID: 2 },
      { SID: 3, VID: 3 },
      { SID: 4, VID: 4 },
      { SID: 5, VID: 5 },
    ],
    [
      { VID: 1, location: 'Pune' },
      { VID: 2, location: 'Mumbai' },
      { VID: 3, location: 'Bangalore' },
      { VID: 4, location: 'Chennai' },
      { VID: 5, location: 'Kolkata' },
    ],
    [
      { SID: 1, name: 'Taylor Swift: The Eras Tour' },
      { SID: 2, name: 'Oppenheimer' },
      { SID: 3, name: 'Hunger Games' },
      { SID: 4, name: 'Cars' },
      { SID: 5, name: 'Donno' },
    ],
  ];

  const [selectedMovie, setSelectedMovie] = useState('');
  const [numberOfSeats, setNumberOfSeats] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTiming, setSelectedTiming] = useState('');
  const [selectedVenue, setSelectedVenue] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [movies, setMovies] = useState(initialData[2]);
  const [venues, setVenues] = useState(initialData[1]);
  const [showTimings, setShowTimings] = useState(initialData[0]);
  const paymentMethods = ['Card', 'UPI'];

  const handlePaymentMethodChange = (e) => {
    setSelectedPaymentMethod(e.target.value);
  };

  const handleVenueChange = (e) => {
    setSelectedVenue(e.target.value);
  };

  const handleMovieChange = (e) => {
    setSelectedMovie(e.target.value);
  };

  const handlePaymentSubmit = () => {
    // Log the input values to the console
    console.log('Selected Movie:', selectedMovie);
    console.log('Number of Seats:', numberOfSeats);
    console.log('Selected Date:', selectedDate);
    console.log('Selected Timing:', selectedTiming);
    console.log('Selected Venue:', selectedVenue);
    console.log('Selected Payment Method:', selectedPaymentMethod);

    if (selectedPaymentMethod === 'Card') {
      const cardNumber = document.getElementById('cardNumber').value;
      const cardHolderName = document.getElementById('cardHolderName').value;
      const expirationDate = document.getElementById('expirationDate').value;
      const cvv = document.getElementById('cvv').value;

      console.log('Card Number:', cardNumber);
      console.log('Card Holder Name:', cardHolderName);
      console.log('Expiration Date:', expirationDate);
      console.log('CVV:', cvv);
    } else if (selectedPaymentMethod === 'UPI') {
      const upiID = document.getElementById('upiID').value;
      console.log('UPI ID:', upiID);
    }

    // Additional logic for handling payment submission
  };

  useEffect(() => {
    // Additional initialization logic if needed
  }, []);

  return (
    <Layout>
      <div className={styles.container}>
        <h1>Select the movie you wish to watch and select the seats</h1>

        <section className={styles.section} id="booking">
          <p>Select the movie</p>
          <select name="movie" value={selectedMovie} onChange={handleMovieChange}>
            <option value="">Select a movie</option>
            {movies.map((movie) => (
              <option key={movie.SID} value={movie.SID}>
                {movie.name}
              </option>
            ))}
          </select>
          <br />
          <br />
          <p>Select the venue:</p>
          <select name="venue" value={selectedVenue} onChange={handleVenueChange}>
            <option value="">Select a venue</option>
            {venues.map((venue) => (
              <option key={venue.VID} value={venue.VID}>
                {venue.location}
              </option>
            ))}
          </select>
        </section>

        <section className={styles.section} id="booking2">
          <p>Enter the number of seats you want to book</p>
          <input
            type="text"
            placeholder="Number of seats"
            value={numberOfSeats}
            onChange={(e) => setNumberOfSeats(e.target.value)}
          />
          <br />
          <br />
          <p>Enter the seat you want:</p>
          <img
            className={styles.seatSelection}
            src="https://i0.wp.com/www.freestudentprojects.com/wp-content/uploads/2017/06/Android-based-Movie-Ticket-Booking-System.jpg?resize=405%2C340"
            alt="seating"
          />
          <br />
          <br />
          <input type="text" placeholder="Seat type" />
          <br />
          <br />
          <br />
          <p>Enter the date you want to watch the movie:</p>
          <input
            type="text"
            placeholder="Date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
          <br />
          <br />
          <br />
          <p>Select your show timing:</p>
          <select
            name="timing"
            value={selectedTiming}
            onChange={(e) => setSelectedTiming(e.target.value)}
          >
            <option value="" disabled>
              Select a timing
            </option>
            {showTimings.map((timing) => (
              <option key={timing.id} value={timing.time}>
                {timing.time}
              </option>
            ))}
          </select>
        </section>

        <section className={styles.section} id="payment">
          <p>Please select your method of payment</p>
          <select
            className={styles.paymentMethods}
            name="paymentMethod"
            value={selectedPaymentMethod}
            onChange={handlePaymentMethodChange}
          >
            <option value="" disabled>
              Select a payment method
            </option>
            {paymentMethods.map((method) => (
              <option key={method} value={method}>
                {method}
              </option>
            ))}
          </select>
          <br />
          <br />
          {selectedPaymentMethod && (
            <div className={styles.paymentDetails}>
              {selectedPaymentMethod === 'Card' && (
                <div>
                  <label htmlFor="cardNumber">Card Number:</label>
                  <input type="text" id="cardNumber" name="cardNumber" />
                  <label htmlFor="cardHolderName">Card Holder Name:</label>
                  <input type="text" id="cardHolderName" name="cardHolderName" />
                  <label htmlFor="expirationDate">Expiration Date:</label>
                  <input
                    type="text"
                    id="expirationDate"
                    name="expirationDate"
                    placeholder="MM/YYYY"
                  />
                  <label htmlFor="cvv">CVV:</label>
                  <input type="text" id="cvv" name="cvv" />
                  <br />
                  <br />
                  <button className={styles.submitButton} type="button" onClick={handlePaymentSubmit}>
                    Submit Payment
                  </button>
                </div>
              )}
              {selectedPaymentMethod === 'UPI' && (
                <div>
                  <label htmlFor="upiID">UPI ID:</label>
                  <input type="text" id="upiID" name="upiID" />
                  <br />
                  <br />
                  <button className={styles.submitButton} type="button" onClick={handlePaymentSubmit}>
                    Submit Payment
                  </button>
                </div>
              )}
            </div>
          )}
        </section>
      </div>
    </Layout>
  );
}

export default BookingForm;