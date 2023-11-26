import React, { useState } from 'react';
import 'styles/booking.css';
import Layout from '../components/layout';
import 'styles/navbar.css';
import Navbar from '@/components/navbar';

function BookingForm() {
  // Placeholder movie data until fetched from the backend
  const initialMovies = [
    {
      id: 1,
      title: 'Taylor Swift: The Eras Tour',
    },
    {
      id: 2,
      title: 'Priscilla',
    },
    {
      id: 3,
      title: 'The Marvels',
    },
    {
      id: 4,
      title: 'Oppenheimer',
    },
    {
      id: 5,
      title: 'Barbie',
    },
  ];

  const initialShowTimings = [
    {
      id: 1,
      time: '09:15',
    },
    {
      id: 2,
      time: '12:00',
    },
    {
      id: 3,
      time: '15:30',
    },
    {
      id: 4,
      time: '19:00',
    },
    {
      id: 5,
      time: '23:00',
    },
  ];

  const [selectedMovie, setSelectedMovie] = useState('');
  const [numberOfSeats, setNumberOfSeats] = useState('');
  const [selectedSeat, setSelectedSeat] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTiming, setSelectedTiming] = useState('');
  const [showTimings, setShowTimings] = useState(initialShowTimings);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const paymentMethods = ['Card', 'UPI'];
  const handlePaymentMethodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPaymentMethod(e.target.value);
  };
  

  return (
  <Layout>
      <div>
        <header>
        </header>
        <h1>Select the movie you wish to watch and select the seats</h1>
        <main>
          <section id="booking">
            <p>Select the movie</p>
            <select
              name="movie"
              value={selectedMovie}
              onChange={e => setSelectedMovie(e.target.value)}
            >
              <option value="" disabled>
                Select a movie
              </option>
              {initialMovies.map(movie => (
                <option key={movie.id} value={movie.title}>
                  {movie.title}
                </option>
              ))}
            </select>
          </section>

          <section id="booking2">
            <p>Enter the number of seats you want to book</p>
            <input
              type="text"
              placeholder="Number of seats"
              value={numberOfSeats}
              onChange={e => setNumberOfSeats(e.target.value)} />
            <br />
            <p>Enter the seat you want:</p>
            <img src="https://i0.wp.com/www.freestudentprojects.com/wp-content/uploads/2017/06/Android-based-Movie-Ticket-Booking-System.jpg?resize=405%2C340" alt="seating" />
            <br />
            <br />
            <input type="text" placeholder="Seat type" />
            <br />
            <p>Enter the date you want to watch the movie:</p>
            <input type="text" placeholder="Date" />
            <br />
            <p>Select your show timing:</p>
            <select
              name="timing"
              value={selectedTiming}
              onChange={e => setSelectedTiming(e.target.value)}
            >
              <option value="" disabled>
                Select a timing
              </option>
              {showTimings.map(timing => (
                <option key={timing.id} value={timing.time}>
                  {timing.time}
                </option>
              ))}
            </select>
            <br />
            <br />
            {/* <input type="submit" value="Submit" id="submit" /> */}
          </section>

          <section id="payment">
            <p>Please select your method of payment</p>
            <select
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
              <div>
                {selectedPaymentMethod === 'Card' && (
                  <div>
                    <label htmlFor="cardNumber">Card Number:</label>
                    <input type="text" id="cardNumber" name="cardNumber" />
                    <label htmlFor="cardHolderName">Card Holder Name:</label>
                    <input type="text" id="cardHolderName" name="cardHolderName" />
                    <label htmlFor="expirationDate">Expiration Date:</label>
                    <input type="text" id="expirationDate" name="expirationDate" placeholder="MM/YYYY" />
                    <label htmlFor="cvv">CVV:</label>
                    <input type="text" id="cvv" name="cvv" />
                    <br />
                    <br />
                    <button type="button">Submit Payment</button>
                  </div>
                )}
                {selectedPaymentMethod === 'UPI' && (
                  <div>
                    <label htmlFor="upiID">UPI ID:</label>
                    <input type="text" id="upiID" name="upiID" />
                    <br />
                    <br />
                    <button type="button">Submit Payment</button>
                  </div>
                )}
              </div>
            )}
          </section>
        </main>
      </div>
    </Layout>
  );
}

export default BookingForm;
