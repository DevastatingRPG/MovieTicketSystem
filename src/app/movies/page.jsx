'use client'
// import Image from "next/image";
import RootLayout from "@/app/layout";
import { useRouter } from 'next/navigation';
// import { useCallback, useState } from 'react';
import { Button, Input, Image, Card, CardHeader, CardBody } from "@nextui-org/react";
// import 
import Nav from "@/app/components/navbar";
import { useState, useEffect } from "react";


const MovieList = () => {
    const router = useRouter();
    const [movies, setMovies] = useState([]);

    const getMovies = async () => {
        const response = await fetch('/api/movies');
        const data = await response.json();
        if (data) {
            setMovies(data.data)
        }
        console.log(response);
        console.log(data.data);
        console.log(Array.isArray(data[0]))
    }

    useEffect(() => {
        getMovies();
    }, [])


    return (
        <RootLayout>
            <Nav />
            <div>
                {movies && Array.isArray(movies) ? (
                    movies.map(movie => (
                        <Card key={movie.sid} className="w-full max-w-3xl mx-auto mt-10">
                            <CardHeader className="p-4 flex flex-col items-center">
                                <h4 className="text-center mt-4">
                                    <a href={movie.trailer} target="_blank" rel="noreferrer">
                                        {movie.name}
                                    </a>
                                </h4>
                            </CardHeader>
                            <CardBody className="flex justify-center items-center">
                                <Image src={movie.image} alt={movie.name} objectFit='cover' />
                            </CardBody>
                        </Card>
                    ))
                ) : (
                    <Card className="w-full max-w-3xl mx-auto mt-10">
                        <CardHeader className="p-4 flex flex-col items-center">
                            No movies Available
                        </CardHeader>
                    </Card>
                )}
                <br />
            </div>
        </RootLayout>

    );
}

export default MovieList;