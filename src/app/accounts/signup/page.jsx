"use client"

import Image from "next/image";
import RootLayout from "@/app/layout";
import { Button, ButtonGroup, Input, Select, SelectItem } from "@nextui-org/react";
import Nav from "@/app/components/navbar";

const Signup = () => {

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('submitted')

        // router.replace('/')
        event.preventDefault();
        //
        const formData = new FormData(event.target);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            age: formData.get('age'),
            gender: formData.get('gender'),
            mobile: formData.get('mobile'),
            uname: formData.get('uname'),
            password: formData.get('password'),
        };
        const response = await fetch('/api/register', {
            method: 'POST',
            body: JSON.stringify(data),
            // body: "Helo",
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
    };

    const genders = [
        { label: "Male", value: "M" },
        { label: "Female", value: "F" }
    ]

    return (
        <RootLayout>
            <Nav />
            <form onSubmit={handleSubmit} className="w-1/3 mx-auto flex flex-col space-y-4">
                <br />
                <Input isRequired name="name" label="Name" />
                <Input isRequired name="email" label="Email" />
                <Input isRequired name="uname" label="Username" />
                <Input isRequired name="password" label="Password" type="password" />
                <Input isRequired name="mobile" label="Number" type="number" />
                <Input isRequired name="age" label="Age" />
                <Select isRequired name="gender" label="Gender" items={genders}>
                    {(gender) => <SelectItem key={gender.value}>{gender.label}</SelectItem>}
                </Select>

                <Button type="submit">Signup</Button>

            </form>
        </RootLayout>
    );
}

export default Signup;
