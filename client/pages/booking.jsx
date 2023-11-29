import React, { useState, useEffect } from 'react';
import styles from 'styles/booking.module.css';
import Layout from '../components/layout';
import { fetchData, postData } from '@/utilities/fetching';
import { useRouter } from 'next/router';
import Navbar from '@/components/navbar';
import seats from '../components/seats';
import Seats from '../components/seats';
import { useForm, Controller } from 'react-hook-form';
import { FormControl, InputLabel, Select, MenuItem, TextField, Button } from '@mui/material';

function BookingForm() {
    const { register, handleSubmit, control, watch, setValue } = useForm();
    const selectedPaymentMethod = watch('pmeth');
    const selectedDate = watch('selectedDate');
    const selectedTime = watch('selectedTime');
    const [selectedSeats, setSelectedSeats] = useState([]);

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
            let id = localStorage.getItem('uid')
            if (id)
                setUID(localStorage.getItem('uid'));
            else {
                console.error("User not logged in : ");
                // router.replace('/login');
            }


        }
        getList()

    }, []);

    console.log(uid)
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
    const showTimings = ['10:00', '12:00', '14:00', '16:00', '18:00']
    const paymentMethods = ['Card', 'UPI'];

    const onSubmit = async (data) => {
        try {
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