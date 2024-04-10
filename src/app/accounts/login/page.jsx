'use client'
// import Image from "next/image";
import RootLayout from "@/app/layout";
import { useRouter } from 'next/navigation';
// import { useCallback, useState } from 'react';
import { Button, Input } from "@nextui-org/react";
import Nav from "@/app/components/navbar";




const Login = () => {
    const router = useRouter();
    // const [errorMessage, setErrorMessage] = useState('');
    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const uname = formData.get('uname');
        const password = formData.get('password');
        const response = await fetch('/api/login', {
            method: 'POST',
            body: JSON.stringify({ uname, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();

        if (response.ok) {
            // Redirect to the home page
            localStorage.setItem('token', data.token);
            localStorage.setItem('uid', data.uid);
            router.replace('/');
        } else {
            // Show error message
        }
    };

    const adminLogin = () => {
        var password = prompt("Enter Admin Password : ");
        if (password == 'beans123') {
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
                <Input type="password" name="password" label="Password" placeholder="Password" isRequired />
                <div className="flex justify-between mb-2">
                    <Button className="w-full mr-2" type="submit">Login</Button>
                    <Button className="w-full ml-2">Admin Login</Button>
                </div>


            </form>
        </RootLayout>

    );
}

export default Login;
