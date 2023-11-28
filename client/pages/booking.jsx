import React, { useState, useEffect } from 'react';
import styles from 'styles/booking.module.css';
import Layout from '../components/layout';
import { fetchData } from '@/utilities/fetching';
import { useRouter } from 'next/router';
import Navbar from '@/components/navbar';
import seats from '../components/seats';
import Seats from '../components/seats';
import { useForm } from 'react-hook-form';



function BookingForm() {
    const { register, handleSubmit, watch } = useForm();
    const selectedPaymentMethod = watch('paymentMethod');

    // Placeholder movie data until fetched from the backend
    const router = useRouter()
    const [list, setList] = useState(null)
    const [uid, setUID] = useState(null)

    useEffect(() => {
        // Fetch movie data from the backend server
        const getList = async () => {
            try {
                const response = await fetchData('/booking?func=list');
                setList(response)
            }
            catch (err) {
                console.error("Error fetching Movie and Venues : ", err);
            }
            try {
                setUID(localStorage.getItem('uid'));
            }
            catch (err) {
                console.error("User not logged in : ", err);
                router.replace('/login');

            }
        }



        getList()

    }, []);


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
    const [movies, setMovies] = useState(initialData[2]);
    const [venues, setVenues] = useState(initialData[1]);
    const [showTimings, setShowTimings] = useState(initialData[0]);
    const paymentMethods = ['Card', 'UPI'];

    const handlePaymentSubmit = async () => {
        // Log the input values to the console
        // try {
        //     const response = await postData('/admin?func=insshow', {
        //         uid: uid,
        //         sid: selectedMovie,
        //         pmeth: selectedPaymentMethod,
        //         amount: amount,
        //         stat: stat,
        //         timing: timing,
        //         seat: selectedSeat
        //     });
        // }
        // catch (err) {
        //     console.error("Error Inserting Show : ", err)
        // }
        // You can add additional logic here, such as sending the data to a server
    };

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <Layout>
            <form onSubmit={handleSubmit(onSubmit)}>
                <section>
                    <p>Select the movie</p>
                    <select {...register('movie')}>
                        <option value="">Select a movie</option>
                        {movies.map((movie) => (
                            <option key={movie.SID} value={movie.SID}>
                                {movie.name}
                            </option>
                        ))}
                    </select>
                    <p>Select the venue:</p>
                    <select {...register('venue')}>
                        <option value="">Select a venue</option>
                        {venues.map((venue) => (
                            <option key={venue.VID} value={venue.VID}>
                                {venue.location}
                            </option>
                        ))}
                    </select>
                </section>

                <section>
                    <p>Enter the number of seats you want to book</p>
                    <select {...register('numSeats')}>
                        <option value="">Select Number of Seats : </option>
                        {[...Array(10).keys()].map((seat) => (
                            <option key={seat+1} value={seat+1}>
                                {seat+1}
                            </option>
                        ))}
                    </select>
                    <p>Enter the seat you want:</p>
                    <Seats occupiedSeats={[10, 12, 14]} />
                    <input type="text" placeholder="Seat type" {...register('seatType')} />
                    <p>Enter the date you want to watch the movie:</p>
                    <input
                        type="date"
                        placeholder="Date"
                        {...register('selectedDate')}
                    />
                    <p>Select your show timing:</p>
                    <select {...register('timing')}>
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

                <section>
                    <p>Please select your method of payment</p>
                    <select {...register('paymentMethod')}>
                        <option value="" disabled>
                            Select a payment method
                        </option>
                        {paymentMethods.map((method) => (
                            <option key={method} value={method}>
                                {method}
                            </option>
                        ))}
                    </select>
                    {selectedPaymentMethod && (
                        <div>
                            {selectedPaymentMethod === 'Card' && (
                                <div>
                                    <label htmlFor="cardNumber">Card Number:</label>
                                    <input type="text" {...register('cardNumber')} />
                                    <label htmlFor="cardHolderName">Card Holder Name:</label>
                                    <input type="text" {...register('cardHolderName')} />
                                    <label htmlFor="expirationDate">Expiration Date:</label>
                                    <input
                                        type="text"
                                        placeholder="MM/YYYY"
                                        {...register('expirationDate')}
                                    />
                                    <label htmlFor="cvv">CVV:</label>
                                    <input type="text" {...register('cvv')} />
                                    <button type="submit">
                                        Submit Payment
                                    </button>
                                </div>
                            )}
                            {selectedPaymentMethod === 'UPI' && (
                                <div>
                                    <label htmlFor="upiID">UPI ID:</label>
                                    <input type="text" {...register('upiID')} />
                                    <button type="submit">
                                        Submit Payment
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </section>
            </form>
            {/* <div className={styles.container}>
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
                    <Seats occupiedSeats={[10, 12, 14]}/>
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
            </div> */}

        </Layout>
    );
}
export default BookingForm;