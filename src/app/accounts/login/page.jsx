'use client'
// import Image from "next/image";
import React, {useState} from "react";
import RootLayout from "@/app/layout";
import { useRouter } from 'next/navigation';
// import { useCallback, useState } from 'react';
import { Button, Input } from "@nextui-org/react";
import Nav from "@/app/components/navbar";
import { EyeFilledIcon } from "@/app/components/EyeFilledIcon";
import { EyeSlashFilledIcon } from "@/app/components/EyeSlashFilledIcon";

const Login = () => {
    const router = useRouter();
    const [isVisible, setIsVisible] = useState(false);
    // const [errorMessage, setErrorMessage] = useState('');
    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());
        const response = await fetch('/api/login', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const responseData = await response.json();

        if (response.ok) {
            // Redirect to the home page
            localStorage.setItem('token', responseData.token);
            localStorage.setItem('uid', responseData.uid);
            router.replace('/');
        } else {
            // Show error message
        }
    };

    const toggleVisibility = () => setIsVisible(!isVisible);

    const adminLogin = () => {
        var password = prompt("Enter Admin Password : ");
        if (password == 'beans123') {
            localStorage.setItem('admin', true);
            router.push('/admin');
        }
        else {
            alert("Incorrect password");
        }
    }


    return (
        <RootLayout>
            <Nav />
            <form onSubmit={handleSubmit} className="w-1/3 mx-auto flex flex-col space-y-4">
                <br />
                <Input name="uname" label="Username" placeholder="Username" isRequired size="md" />
                <Input name="password" label="Password" placeholder="Password" isRequired
                    type={isVisible ? "text" : "password"}
                    endContent={
                        <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                            {isVisible ? (
                                <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                            ) : (
                                <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                            )}
                        </button>
                    } />
                <div className="flex justify-between mb-2">
                    <Button className="w-full mr-2" type="submit">Login</Button>
                    <Button className="w-full ml-2" onClick={adminLogin}>Admin Login</Button>
                </div>


            </form>
        </RootLayout>

    );
}

export default Login;
