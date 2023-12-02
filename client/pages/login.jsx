// Login.jsx
import React, { useState } from 'react';
import styles from 'styles/login.module.css'; // Import the local styles
import Layout from '../components/layout';
import Link from 'next/link';
import Navbar from '@/components/navbar';
import { postData } from '@/utilities/fetching';
import { useRouter } from 'next/router';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useForm, Controller } from 'react-hook-form';

function Login() {
    // State to manage the input values
    const router = useRouter();
    const { handleSubmit, control } = useForm();
    
    const onSubmit = async (data) => {
        try {
            const response = await postData('/login', data);
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('uid', response.data.uid);
                router.replace('/')
            }
            else {
                alert(response.data)
            }
        }
        catch (err) {
            console.error("Error Logging in : ", err);
            alert(err);
        }
    };

    const handleAdmin = () => {
        var password = prompt("Enter Admin Password : ");
        if (password == 'beans123'){
            router.push('/admin');
        }
        else{
            alert("Incorrect password");
        }
    }


    return (
        <Layout>
            <div className={styles.container}>
                <h1>Enter login details</h1>
                <main className={styles.main}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <p>Enter your username:</p>
                        <Controller
                            name="uname"
                            control={control}
                            render={({ field }) => (
                                <TextField {...field} id="outlined-basic" label="Username" variant="outlined" />
                            )}
                        />
                        {/* <TextField id="outlined-basic" label="Username" variant="outlined" /> */}
                        <br />
                        <br />
                        <p>Enter your password:</p>
                        <Controller
                            name="password"
                            control={control}
                            render={({ field }) => (
                                <TextField {...field} id="outlined-basic" label="Password" variant="outlined" type='password' />
                            )}
                        />
                        {/* <TextField id="outlined-basic" label="Password" variant="outlined" /> */}
                        <br />
                        <br />
                        <Button variant="contained" type='submit'>
                            Submit
                        </Button>
                        <br />
                        <br />
                        <Button variant="contained" onClick={handleAdmin}>
                            Admin Login
                        </Button>
                    </form>
                </main>
            </div>
        </Layout>
    );
}

export default Login;
