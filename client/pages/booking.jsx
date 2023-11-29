import React, { useState, useEffect } from 'react';
import styles from 'styles/booking.module.css';
import Layout from '../components/layout';
import { fetchData, postData } from '@/utilities/fetching';
import { useRouter } from 'next/router';
import Navbar from '@/components/navbar';
import seats from '../components/seats';
import Seats from '../components/seats';
import { useForm, Controller } from 'react-hook-form';



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
                else{
                    console.error("User not logged in : ", err);
                    router.replace('/login');
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
        console.log(data);
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
                <section>
                    <p>Select the movie</p>
                    <select {...register('sid')}>
                        <option value="">Select a movie</option>
                        {movies.map((movie) => (
                            <option key={movie.SID} value={movie.SID}>
                                {movie.name}
                            </option>
                        ))}
                    </select>
                    <p>Select the venue:</p>
                    <select {...register('vid')}>
                        <option value="">Select a venue</option>
                        {venues.map((venue) => (
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
                            <Seats occupiedSeats={[10, 12, 14]} setSelectedSeats={setSelectedSeats} selectedSeats={selectedSeats} />
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

        </Layout>
    );
}
export default BookingForm;