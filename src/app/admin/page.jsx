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

    const [selectedFunc, setSelectedFunc] = useState(null);
    const router = useRouter()

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());
        const response = await fetch(`/api/admin?func=${data.func}`, {
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
        { label: "Insert Venue", value: "insvenue" },
        { label: "Insert Show", value: "insshow" },
        { label: "Delete Venue", value: "delvenue" },
        { label: "Delete Show", value: "delshow" },
    ]

    const categories = [
        { label: "Action", value: "Action" },
        { label: "Drama", value: "Drama" },
        { label: "Comedy", value: "Comedy" },
        { label: "Thriller", value: "Thriller" },
        { label: "Other", value: "Other" },
    ]

    return (
        <RootLayout>
            <Nav />
            <form onSubmit={handleSubmit}>
                <Select isRequired
                    items={adminFuncs}
                    label="Operation"
                    name="func"
                    onChange={(value) => setSelectedFunc(value.target.value)}
                >
                    {(op) => <SelectItem key={op.value}>{op.label}</SelectItem>}
                </Select>
                {selectedFunc == 'insvenue' && (
                    <div>
                        <Input isRequired name='vid' type="number" label='Venue ID' />
                        <Input isRequired name='city' label='City' />
                        <Input isRequired name='pincode' type="number" label='Pincode' />
                        <Input isRequired name='location' label='Location' />
                        <Input isRequired name='avail' label='Availability' />
                    </div>

                )}
                {selectedFunc == 'insshow' && (
                    <div>
                        <Input isRequired name='sid' type="number" label='Show ID' />
                        <Input isRequired name='name' label='Show Name' />
                        <Select
                            isRequired
                            items={categories}
                            name="stype"
                            label='Category'>
                            {(category) => (<SelectItem key='category.value'>{category.label}</SelectItem>)}
                        </Select>
                        <Input isRequired name='trailer' label='Trailer URL' />
                        <Input isRequired name='image' label='Image URL' />
                    </div>
                )}
                {selectedFunc == 'delvenue' && (
                    <div>
                        <Input isRequired name='vid' type="number" label='Venue ID' />
                    </div>
                )}
                {selectedFunc == 'delshow' && (
                    <div>
                        <Input isRequired name='sid' type="number" label='Show ID' />
                    </div>
                )}
                <Button type="submit">Proceed</Button>
            </form>


        </RootLayout>

    );
}

export default MovieList;
