import React, { useState } from 'react';
import styles from 'styles/signup.module.css'; // Import the local styles
import Layout from '../components/layout';
import { postData } from '@/utilities/fetching';
import { useRouter } from 'next/router';
import Button from '@mui/material/Button';
import { TextField, Select } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { Form } from 'react-hook-form';
import InputLabel from '@mui/material/InputLabel';
import { useForm, Controller } from 'react-hook-form';

function SignUp() {
    const router = useRouter();
    const { handleSubmit, control } = useForm();

    const onSubmit = async (data) => {
        try {
            const response = await postData('/register', data);
            if (response.data == "OK") {
                router.replace('/login');
            }
            else {
                alert(response.data);
            }
        }
        catch (err) {
            console.error("Error fetching Movie and Venues : ", err);
            alert(err);
        }
    };

    return (
        <Layout>
            <div className={styles.container}>
                <h1>Enter your details to create an account</h1>
                <main>
                    <section className={styles.form} id="signin">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <p>Enter your name:</p>
                            <Controller
                                name="name"
                                control={control}
                                render={({ field }) => (
                                    <TextField {...field} id="outlined-basic" label="Name" variant="outlined" />
                                )}
                            />
                            <br />
                            <br />
                            <p>Enter your email:</p>
                            <Controller
                                name="email"
                                control={control}
                                render={({ field }) => (
                                    <TextField {...field} id="outlined-basic" label="Email" variant="outlined" />
                                )}
                            />
                            <br />
                            <br />
                            <p>Enter username:</p>
                            <Controller
                                name="uname"
                                control={control}
                                render={({ field }) => (
                                    <TextField {...field} id="outlined-basic" label="Username" variant="outlined" />
                                )}
                            />
                            <br />
                            <br />
                            <p>Enter a password:</p>
                            <Controller
                                name="password"
                                control={control}
                                render={({ field }) => (
                                    <TextField {...field} id="outlined-basic" label="Password" variant="outlined" type='password' />
                                )}
                            />
                            <br />
                            <br />
                            <p>Enter your age:</p>
                            <Controller
                                name="age"
                                control={control}
                                render={({ field }) => (
                                    <TextField {...field} id="outlined-basic" label="Age" variant="outlined" />
                                )}
                            />
                            <br />
                            <br />
                            <p>Enter your contact number:</p>
                            <Controller
                                name="mobile"
                                control={control}
                                render={({ field }) => (
                                    <TextField {...field} id="outlined-basic" label="Mobile" variant="outlined" />
                                )}
                            />
                            <br />
                            <br />
                            <p>Select your gender:</p>
                            <Controller
                                name="gender"
                                control={control}
                                render={({ field }) => (
                                    <FormControl sx={{ m: 1, minWidth: 100 }}>
                                        <Select
                                            labelId="demo-simple-select-autowidth-label"
                                            id="demo-simple-select-autowidth"
                                            autoWidth
                                            label="Gender"
                                            {...field}
                                        >
                                            <MenuItem value={"M"}>Male</MenuItem>
                                            <MenuItem value={"F"}>Female</MenuItem>
                                            <MenuItem value={"O"}>Others</MenuItem>
                                        </Select>
                                    </FormControl>
                                )}
                            />
                            <br />
                            <br />
                            <Button variant="contained" type="submit">
                                Submit
                            </Button>
                        </form>
                    </section>
                    <section className={styles.login_section} id="login">
                        <p>Already have an account? Click here to <a href="login">login</a></p>
                    </section>
                </main>
                <br />
            </div>
        </Layout>
    );
}

export default SignUp;
