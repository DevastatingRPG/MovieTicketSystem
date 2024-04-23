"use client"
// import Image from "next/image";
import RootLayout from "./layout";
import { Button, ButtonGroup } from "@nextui-org/react";
import { Card, CardHeader, CardBody, Container, Grid, Image, Text } from '@nextui-org/react';
import Nav from "./components/navbar";

const Home = () => {
    function handle(event) {
        event.preventDefault();
    }
    return (
        <RootLayout>
            <Nav />
            <Card className="w-full max-w-3xl mx-auto mt-10">
                <CardHeader className="p-4 flex flex-col items-center">
                    {/* <Text> */}
                    <p className="text-center  mt-4">MOVIE TICKET BOOKING SYSTEM</p>
                    <br/>
                    <p className="text-center  mt-4">
                        Welcome to the next frontier in cinematic convenience – our online movie ticket booking system!
                    </p>
                    <br/>
                    <p className="text-center  mt-4">
                        Elevate your movie-going experience with seamless access to the latest blockbusters, hottest releases, and timeless classics right from the comfort of your fingertips.
                    </p>
                </CardHeader>
                <CardBody>
                    <Image src="https://wallpaperaccess.com/full/3659750.jpg" width={888} height={500} alt="Movie Poster" />
                </CardBody>
            </Card>
        </RootLayout>


    );
}

export default Home;
