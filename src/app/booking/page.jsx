'use client'
import RootLayout from "@/app/layout";
import { useRouter } from 'next/navigation';
import { Button, Input, Image, Card, CardHeader, Divider, CardBody, Select, SelectItem, DatePicker } from "@nextui-org/react";
import { getLocalTimeZone, parseDate, today } from "@internationalized/date";
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
        router.reload();
    }

    const showSeats = async () => {
        try {
            if (selectedMovie && selectedVenue && selectedDate && selectedTime) {
                const response = await fetch(`/api/booking?func=occupied&sid=${selectedMovie}&vid=${selectedVenue}`);
                const data = await response.json();
                console.log(data);
                const bookedSeats = data.data[1][0]["@occupied"];
                let intArray;
                if (bookedSeats) {
                    const stringArray = bookedSeats.split(',');
                    intArray = stringArray.map(numString => Number(numString));
                }
                else {
                    intArray = [];
                }
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
        let data = Object.fromEntries(formData.entries());
        data.uid = localStorage.getItem('uid');
        data.seats = selectedSeats;
        data.timing = `${data.date} ${data.timing}:00`;
        data.amount = `${selectedSeats.length * 300}`;
        const response = await fetch('/api/booking', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            // Redirect to the home page
            setShowDetails(false);
            router.reload();

        } else {
            console.log("Oops")
            // Show error message
        }
    }


    return (
        <RootLayout>
            <Nav />
            {filteredMovies && filteredVenues ? (
                <Card className="w-full max-w-3xl mx-auto mt-10 mb-10">
                    <form onSubmit={handleSubmit}>
                        <CardBody>
                            <Select isRequired
                                ref={movieSelectRef}
                                name="sid"
                                label="Movie"
                                items={filteredMovies}
                                value={selectedMovie}
                                onChange={handleMovieChange}
                                placeholder="Select a Movie"
                                className="mb-4"
                            >
                                {(movie) => (
                                    <SelectItem key={movie.SID} value={movie.SID}>
                                        {movie.name}
                                    </SelectItem>
                                )}
                            </Select>

                            <Select isRequired
                                ref={venueSelectRef}
                                name="vid"
                                label="Venue"
                                items={filteredVenues}
                                value={selectedVenue}
                                onChange={handleVenueChange}
                                placeholder="Select a Venue"
                                className="mb-4"
                            >
                                {(venue) => (
                                    <SelectItem key={venue.VID} value={venue.VID}>
                                        {venue.location}
                                    </SelectItem>
                                )}
                            </Select>
                            <div className="flex justify-between mb-4">
                                <DatePicker
                                    isRequired
                                    label="Date"
                                    name="date"
                                    className="w-full mr-2"
                                    value={selectedDate}
                                    onChange={setSelectedDate}
                                    minValue={today(getLocalTimeZone()).add({ days: 1 })}
                                    maxValue={today(getLocalTimeZone()).add({ days: 8 })}
                                    defaultValue={today(getLocalTimeZone())}
                                />


                                <Select isRequired
                                    name="timing"
                                    label="Timing"
                                    items={showTimings}
                                    value={selectedTime}
                                    onChange={(event) => setSelectedTime(event.target.value)}
                                    placeholder="Select a Timing"
                                    className="w-full ml-2"
                                >
                                    {(timing) => (
                                        <SelectItem key={timing.value} value={timing.value}>
                                            {timing.label}
                                        </SelectItem>
                                    )}
                                </Select>
                            </div>
                            <div className="flex justify-between mb-2">
                                <Button onClick={reset} className="w-full mr-2">Reset</Button>
                                <Button onClick={showSeats} className="w-full ml-2">Show</Button>
                            </div>

                        </CardBody>
                        {showDetails && (
                            <CardBody>
                                <Divider className="mb-2" />
                                <Seats
                                    occupiedSeats={booked}
                                    setSelectedSeats={setSelectedSeats}
                                    selectedSeats={selectedSeats}
                                    className="mb-4"
                                />
                                <Select isRequired
                                    name="pmeth"
                                    label="Payment Method"
                                    items={paymentMethods}
                                    value={selectedPaymentMethod}
                                    placeholder="Select a Method"
                                    onChange={(event) => setSelectedPaymentMethod(event.target.value)}
                                    className="mb-2"
                                >
                                    {(method) => (
                                        <SelectItem key={method.value} value={method.value}>
                                            {method.label}
                                        </SelectItem>
                                    )}
                                </Select>
                            </CardBody>)
                        }

                        {selectedPaymentMethod && showDetails && (
                            <CardBody>
                                <Divider className="mb-2" />
                                {selectedPaymentMethod === 'card' && (
                                    <div>
                                        <Input label="Card Number" className="mb-4"></Input>
                                        <Input label="Card Holder Name" className="mb-4"></Input>
                                        <Input label="Expiration Date" placeholder="MM/YYYY" className="mb-4"></Input>
                                        <Input label="CVV" className="mb-4" />
                                    </div>
                                )}
                                {selectedPaymentMethod === 'upi' && (
                                    <div>
                                        <Input label="UPI ID" className="mb-4"></Input>
                                    </div>
                                )}
                                <Button type="submit">
                                    Submit Payment
                                </Button>
                            </CardBody>
                        )}
                    </form>
                </Card>
            ) : (
                <p>loading</p>
            )}

        </RootLayout>

    );
}

export default MovieList;
