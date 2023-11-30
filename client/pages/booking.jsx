import React, { useState, useEffect } from 'react';
import styles from 'styles/booking.module.css';
import Layout from '../components/layout';
import { fetchData, postData } from '@/utilities/fetching';
import { useRouter } from 'next/router';
import Seats from '../components/seats';
import { useForm, Controller } from 'react-hook-form';



function BookingForm() {
    const { register, handleSubmit, control, watch, setValue } = useForm();
    const selectedPaymentMethod = watch('pmeth');
    const selectedDate = watch('selectedDate');
    const selectedTime = watch('selectedTime');
    const selectedMovie = watch('sid');
    const selectedVenue = watch('vid');
    const [selectedSeats, setSelectedSeats] = useState([]);


    // Placeholder movie data until fetched from the backend
    const router = useRouter()
    const [uid, setUID] = useState(null)
    const [movies, setMovies] = useState(null);
    const [venues, setVenues] = useState(null);
    const [rels, setRels] = useState(null);
    const [booked, setBooked] = useState([]);

    useEffect(() => {
        // Fetch movie data from the backend server
        const getList = async () => {
            try {
                const response = await fetchData('/booking?func=list');
                setMovies(response[2]);
                setVenues(response[1]);
                setRels(response[0]);
            }
            catch (err) {
                console.error("Error fetching Movie and Venues : ", err);
            }
            let id = localStorage.getItem('uid')
            if (id)
                setUID(localStorage.getItem('uid'));
            else {
                console.error("User not logged in : ", err);
                router.replace('/login');
            }


        }

        getList();

    }, []);

    useEffect(() => {
        const getSeats = async () => {
            try {
                if (selectedMovie && selectedVenue) {
                    const response = await fetchData(`/booking?func=occupied&sid=${selectedMovie}&vid=${selectedVenue}`);
                    setBooked(response);
                }
                else{
                    setBooked([]);
                }

            }
            catch (err) {
                console.error("Error getting seats : ", err);
            }
        }
        getSeats();
    }, [selectedMovie, selectedVenue])
    const [filteredMovies, setFilteredMovies] = useState(movies);
    const [filteredVenues, setFilteredVenues] = useState(venues);
    
    useEffect(() => {
        // Update filteredMovies when venue changes
        if (selectedVenue) {
            const moviesForVenue = rels.filter(rel => rel.VID === parseInt(selectedVenue));
            setFilteredMovies(moviesForVenue.map(rel => movies.find(movie => movie.SID === rel.SID)));
        } else {
            setFilteredMovies(movies);
        }
    }, [selectedVenue, rels, movies]);

    useEffect(() => {
        // Update filteredVenues when movie changes
        if (selectedMovie) {
            const venuesForMovie = rels.filter(rel => rel.SID === parseInt(selectedMovie));
            setFilteredVenues(venuesForMovie.map(rel => venues.find(venue => venue.VID === rel.VID)));
        } else {
            setFilteredVenues(venues);
        }
    }, [selectedMovie, rels, venues]);

    const showTimings = ['10:00', '12:00', '14:00', '16:00', '18:00']
    const paymentMethods = ['Card', 'UPI'];

    const onSubmit = async (data) => {

        try {
            data['uid'] = uid;
            const response = await postData('/booking?func=insert', data);
        }
        catch (err) {
            console.error("Error fetching Movie and Venues : ", err);
        }
    };

    useEffect(() => {
        // Add a check for selectedSeats before triggering form submission
        setValue('seats', selectedSeats);
        setValue('amount', selectedSeats.length * 300)

    }, [selectedSeats]);

    useEffect(() => {
        setValue('timing', `${selectedDate} ${selectedTime}:00`)
    }, [selectedDate, selectedTime])

    return (
        <Layout>
            {filteredMovies ? (
                <form onSubmit={handleSubmit(onSubmit)}>
                    <section>
                        <p>Select the movie</p>
                        <select {...register('sid')}>
                            <option value="">Select a movie</option>
                            {filteredMovies.map((movie) => (
                                <option key={movie.SID} value={movie.SID}>
                                    {movie.name}
                                </option>
                            ))}
                        </select>
                        <p>Select the venue:</p>
                        <select {...register('vid')}>
                            <option value="">Select a venue</option>
                            {filteredVenues.map((venue) => (
                                <option key={venue.VID} value={venue.VID}>
                                    {venue.location}
                                </option>
                            ))}
                        </select>
                    </section>

                    <section>
                        <p>Select the seat you want:</p>
                        <Controller
                            name="seats"
                            control={control}
                            defaultValue={selectedSeats}
                            render={({ field }) => (
                                <Seats occupiedSeats={booked} setSelectedSeats={setSelectedSeats} selectedSeats={selectedSeats} />
                            )}
                        />
                        <p>Enter the date you want to watch the movie:</p>
                        <input
                            type="date"
                            placeholder="Date"
                            {...register('selectedDate')}
                        />
                        <p>Select your show timing:</p>
                        <select {...register('selectedTime')}>
                            <option value="" disabled>
                                Select a timing
                            </option>
                            {showTimings.map((timing) => (
                                <option key={timing} value={timing}>
                                    {timing}
                                </option>
                            ))}
                        </select>
                    </section>

                    <section>
                        <p>Please select your method of payment</p>
                        <select {...register('pmeth')}>
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
            ) :
                (<p>Loading</p>)
            }

        </Layout>
    );
}
export default BookingForm;