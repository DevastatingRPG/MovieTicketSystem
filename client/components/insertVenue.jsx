// components/InsertVenue.js
import React, { useState } from 'react';
import { postData } from '@/utilities/fetching';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Controller } from 'react-hook-form';

export default function InsertVenue({ control }) {
    // State variables to manage the input values
    const [venueId, setVenueId] = useState('');
    const [city, setCity] = useState('');
    const [pincode, setPincode] = useState('');
    const [location, setLocation] = useState('');
    const [venueType, setVenueType] = useState('');
    const [availability, setAvailability] = useState('');

    // Function to handle form submission

    return (
        <div>
            <section id="admin-venues">
                <br />
                <p>Venue ID:</p>
                <Controller
                    name="vid"
                    control={control}
                    render={({ field }) => (
                        <TextField {...field} id="outlined-basic" label="Venue ID" variant="outlined" />
                    )}
                />
                <br />
                <br />
                <p>City:</p>
                <Controller
                    name="city"
                    control={control}
                    render={({ field }) => (
                        <TextField {...field} id="outlined-basic" label="City" variant="outlined" />
                    )}
                />
                <br />
                <br />
                <p>Pincode:</p>
                <Controller
                    name="pincode"
                    control={control}
                    render={({ field }) => (
                        <TextField {...field} id="outlined-basic" label="Pincode" variant="outlined" />
                    )}
                />
                <br />
                <br />
                <p>Location:</p>
                <Controller
                    name="location"
                    control={control}
                    render={({ field }) => (
                        <TextField {...field} id="outlined-basic" label="Location" variant="outlined" />
                    )}
                />
                <br />
                <br />
                <p>Availability:</p>
                <Controller
                    name="avail"
                    control={control}
                    render={({ field }) => (
                        <TextField {...field} id="outlined-basic" label="Availability" variant="outlined" />
                    )}
                />
                <br />
                <br />
                <Button variant="contained" type='submit'>
                    Submit
                </Button>
            </section>
        </div>
    );
}
