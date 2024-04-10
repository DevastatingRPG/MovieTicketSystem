'use client'
// import Image from "next/image";
import RootLayout from "@/app/layout";
import { useRouter } from 'next/navigation';
// import { useCallback, useState } from 'react';
import { Button, Input, Image, Card, CardHeader, Divider, CardBody, Select, SelectItem } from "@nextui-org/react";
// import 
import Nav from "@/app/components/navbar";
import { useState, useEffect, useRef } from "react";
import Seats from "../components/seats";


const MovieList = () => {

    const router = useRouter()
    const [uid, setUID] = useState(null)
    const [movies, setMovies] = useState(null);
    const [venues, setVenues] = useState(null);
    const [rels, setRels] = useState(null);
    const [booked, setBooked] = useState([]);

    const [showDetails, setShowDetails] = useState(false);

    const [filteredMovies, setFilteredMovies] = useState(movies);
    const [filteredVenues, setFilteredVenues] = useState(venues);

    const movieSelectRef = useRef(null);
    const venueSelectRef = useRef(null);

    const getList = async () => {
        try {
            const response = await fetch('/api/booking?func=list');
            const data = await response.json();

            setMovies(data.data[2]);
            setFilteredMovies(data.data[2]);

            setVenues(data.data[1]);
            setFilteredVenues(data.data[1]);

            setRels(data.data[0]);
        }
        catch (err) {
            console.error("Error fetching Movie and Venues : ", err);
        }
        let id = localStorage.getItem('uid');
        if (id) {
            setUID(localStorage.getItem('uid'));
        }
        else {
            console.error("User not logged in : ");
            router.replace('/accounts/login');
        }
    }

    useEffect(() => {
        // Fetch movie data from the backend server
        getList();
    }, []);

    const [selectedSeats, setSelectedSeats] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState('');
    const [selectedVenue, setSelectedVenue] = useState('');
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);

    const handleVenueChange = (sv) => {
        const venueID = sv.target.value;
        setSelectedVenue(venueID);
        if (venueID) {
            setFilteredMovies((prevMovies) =>
                movies.filter((movie) => rels.find((rel) => rel.VID === parseInt(venueID) && rel.SID === movie.SID))
            );
        } else {
            setSelectedVenue('');
            setFilteredMovies(movies);
        }
    };

    const handleMovieChange = (sm) => {
        const movieID = sm.target.value;
        setSelectedMovie(movieID);
        if (movieID) {
            setFilteredVenues((prevVenues) =>
                venues.filter((venue) => rels.find((rel) => rel.SID === parseInt(movieID) && rel.VID === venue.VID))
            );
        } else {
            setSelectedMovie('');
            setFilteredVenues(venues);
        }
    }

    const reset = () => {
        setSelectedMovie('');
        setFilteredMovies(movies);
        setSelectedVenue(null);
        setFilteredVenues(venues);
        setShowDetails(false);
        setSelectedPaymentMethod(null);
    }

    const showSeats = async () => {
        try {
            if (selectedMovie && selectedVenue) {
                const response = await fetch(`/api/booking?func=occupied&sid=${selectedMovie}&vid=${selectedVenue}`);
                const data = await response.json();
                const stringArray = data.data[1][0]["@occupied"].split(',');
                const intArray = stringArray.map(numString => Number(numString));
                setBooked(intArray);
                setShowDetails(true);
            }
            else {
                setBooked([]);
            }

        }
        catch (err) {
            console.error("Error getting seats : ", err);
        }
    }

    const showTimings = [
        { label: '10:00', value: '10:00' },
        { label: '12:00', value: '12:00' },
        { label: '14:00', value: '14:00' },
        { label: '16:00', value: '16:00' },
        { label: '18:00', value: '18:00' }
    ]

    const paymentMethods = [
        { label: 'Card', value: 'card' },
        { label: 'UPI', value: 'upi' },
    ]

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = {
            uid: uid,
            vid: selectedVenue,
            sid: selectedMovie,
            pmeth: selectedPaymentMethod,
            seats: selectedSeats,
            timing: `${formData.get('date')} ${formData.get('timing')}:00`,
            amount: selectedSeats.length * 300,
        };
        const response = await fetch('/api/booking', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            // Redirect to the home page
            console.log('nice');

        } else {
            console.log("OOps")
            // Show error message
        }
    }

    const adminFuncs = [
        {label: "Insert Venue", value: "insvenue"},
        {label: "Insert Show", value: "insshow"},
        {label: "Delete Venue", value: "delvenue"},
        {label: "Delete Show", value: "delshow"},
    ]

    return (
        <RootLayout>
            <Nav />
            <Select isRequired
                items={adminFuncs}
                label="Operation"
                name="func"
            >
                {(op) => <SelectItem key={op.value}>{op.label}</SelectItem>}
            </Select>

        </RootLayout>

    );
}

export default MovieList;
