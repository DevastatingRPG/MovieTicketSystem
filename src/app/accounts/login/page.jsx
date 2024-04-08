'use client'
// import Image from "next/image";
import RootLayout from "@/app/layout";
import { useRouter } from 'next/navigation';
// import { useCallback, useState } from 'react';
import {Button, Input} from "@nextui-org/react";
import Nav from "@/app/components/navbar";




const Login = () => {
    const router = useRouter();
    // const [errorMessage, setErrorMessage] = useState('');
    console.log("hgelo")
    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('submitted')
        
        // router.replace('/')
        event.preventDefault();
        //
        const formData = new FormData(event.target);
        const uname = formData.get('uname');
        const password = formData.get('password');
        console.log(uname, password)
        const response = await fetch('/api/login', {
            method: 'POST',
            body: JSON.stringify({ uname, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        
        console.log(response)
        
        if (response.ok) {
            // Redirect to the home page
            console.log(data.uid);
            localStorage.setItem('token', data.token);
            localStorage.setItem('uid', data.uid);
            router.replace('/');
        } else {
            console.log("OOps")
            // Show error message
        }
    };

    
    return (
        <RootLayout>
            <Nav />
            <form onSubmit={handleSubmit} className="w-1/3 mx-auto flex flex-col space-y-4">
                <br/>
                <Input name="uname" label="Username" placeholder="Username" isRequired size="md"/>
                <Input type="password" name="password" label="Password" placeholder="Password" isRequired/>
                <Button type="submit">Login</Button>

            </form>
        </RootLayout>

    );
}

export default Login;
