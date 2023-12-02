import React, { useState, useEffect } from 'react';
import styles from 'styles/booking.module.css';
import Layout from '../components/layout';
import { fetchData, postData } from '@/utilities/fetching';
import { useRouter } from 'next/router';
import Seats from '../components/seats';
import { useForm, Controller } from 'react-hook-form';
import { FormControl, InputLabel, Select, MenuItem, TextField, Button } from '@mui/material';

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
            <form onSubmit={handleSubmit(onSubmit)}>
                <section className={styles.booking}>
                    <p>Select the movie</p>
                    <FormControl sx={{ m: 1, minWidth: 300 }}>
                        <InputLabel>Select a movie</InputLabel>
                        <Controller
                            name="sid"
                            control={control}
                            render={({ field }) => (
                                <Select {...field}>
                                    <MenuItem value="">
                                        Select a movie
                                    </MenuItem>
                                    {movies.map((movie) => (
                                        <MenuItem key={movie.SID} value={movie.SID}>
                                            {movie.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            )}
                        />
                    </FormControl>

                    <p>Select the venue:</p>
                    <FormControl sx={{ m: 1, minWidth: 300 }}>
                        <InputLabel>Select a venue</InputLabel>
                        <Controller
                            name="vid"
                            control={control}
                            render={({ field }) => (
                                <Select {...field}>
                                    <MenuItem value="">
                                        Select a venue
                                    </MenuItem>
                                    {venues.map((venue) => (
                                        <MenuItem key={venue.VID} value={venue.VID}>
                                            {venue.location}
                                        </MenuItem>
                                    ))}
                                </Select>
                            )}
                        />
                    </FormControl>

                    <p>Select the seat you want:</p>
                    <Controller
                        name="seats"
                        control={control}
                        render={({ field }) => (
                            <Seats
                                occupiedSeats={[10, 12, 14]}
                                setSelectedSeats={setSelectedSeats}
                                selectedSeats={selectedSeats}
                            />
                        )}
                    />

                    <p>Enter the date you want to watch the movie:</p>
                    <TextField
                        type="date"
                        placeholder="Date"
                        {...register('selectedDate')}
                    />

                    <p>Select your show timing:</p>
                    <FormControl sx={{ m: 1, minWidth: 300 }}>
                        <InputLabel>Select a timing</InputLabel>
                        <Controller
                            name="selectedTime"
                            control={control}
                            render={({ field }) => (
                                <Select {...field}>
                                    <MenuItem value="">
                                        Select a timing
                                    </MenuItem>
                                    {showTimings.map((timing) => (
                                        <MenuItem key={timing} value={timing}>
                                            {timing}
                                        </MenuItem>
                                    ))}
                                </Select>
                            )}
                        />
                    </FormControl>

                    <p>Please select your method of payment</p>
                    <FormControl sx={{ m: 1, minWidth: 300 }}>
                        <InputLabel>Select a payment method</InputLabel>
                        <Controller
                            name="pmeth"
                            control={control}
                            render={({ field }) => (
                                <Select {...field}>
                                    <MenuItem value="">
                                        Select a payment method
                                    </MenuItem>
                                    {paymentMethods.map((method) => (
                                        <MenuItem key={method} value={method}>
                                            {method}
                                        </MenuItem>
                                    ))}
                                </Select>
                            )}
                        />
                    </FormControl>

                    {selectedPaymentMethod && (
                        <div>
                            {selectedPaymentMethod === 'Card' && (
                                <div>
                                    <br/>
                                    <FormControl sx={{ m: 1, minWidth: 300 }}>
                                    <TextField label="Card Number" {...register('cardNumber')} />
                                    <br />
                                    <br/>
                                    <TextField
                                        label="Card Holder Name"
                                        {...register('cardHolderName')}
                                    />
                                    <br/>
                                    <br/>
                                    <TextField
                                        label="Expiration Date"
                                        placeholder="MM/YYYY"
                                        {...register('expirationDate')}
                                    />
                                    <br/>
                                    <br/>
                                    <TextField label="CVV" {...register('cvv')} />
                                    </FormControl>
                                    <br/>
                                    <br/>
                                    <Button type="submit" variant="contained" color="primary">
                                        Submit Payment
                                    </Button>
                                </div>
                            )}
                            {selectedPaymentMethod === 'UPI' && (
                                <div>
                                    <br/>
                                    <FormControl sx={{ m: 1, minWidth: 300 }}>
                                    <TextField label="UPI ID" {...register('upiID')} />
                                    </FormControl>
                                    <br/>
                                    <br/>
                                    <Button type="submit" variant="contained" color="primary">
                                        Submit Payment
                                    </Button>
                                </div>
                            )}
                        </div>
                    )}
                </section>
            </form>
        </Layout>
    );
}
export default BookingForm;