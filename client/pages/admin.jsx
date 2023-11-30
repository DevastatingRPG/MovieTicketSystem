// Admin.jsx
import React, { useState } from 'react';
import styles from 'styles/admin.module.css'; // Import the local styles
import Layout from '../components/layout';
import InsertVenue from '@/components/insertVenue';
import InsertShow from '@/components/insertShow';
import DeleteShow from '@/components/deleteShow';
import DeleteVenue from '@/components/deleteVenue';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { InputLabel, FormControl } from '@mui/material';
import { useForm, Controller, useFormContext, FormProvider } from 'react-hook-form';
import { postData } from '@/utilities/fetching';

function Admin() {
    // const { handleSubmit, control, watch } = useForm();
    const methods = useForm()
    const functionType = methods.watch('function')

    const onSubmit = async (data) => {
        try {
            let response
            switch (data.function) {
                case 'insertShow':
                    response = await postData('/admin?func=insshow', data);
                    break;

                case 'insertVenue':
                    response = await postData('/admin?func=insvenue', data);
                    break;

                case 'deleteShow':
                    response = await postData('/admin?func=delshow', data);
                    break;

                case 'deleteVenue':
                    response = await postData('/admin?func=delvenue', data);
                    break;
            }
            console.log(data.function)
            // const response = await postData('/register', data);
            // if (response.data == "OK") {
            //     router.replace('/login');
            // }
            // else {
            //     alert(response.data);
            // }
        }
        catch (err) {
            console.error("Error fetching Movie and Venues : ", err);
            alert(err);
        }
    };

    return (
        <Layout>
            <div className={styles.AdminPage}>
                <h1>Welcome Admin</h1>
                <main>
                    <FormProvider {...methods}>
                        <form onSubmit={methods.handleSubmit(onSubmit)}>
                            <FormControl sx={{ m: 1, minWidth: 200 }}>
                                <InputLabel id="demo-simple-select-autowidth-label">Select function</InputLabel>
                                <Controller
                                    name="function"
                                    control={methods.control}
                                    render={({ field }) => (
                                        <Select
                                            labelId="demo-simple-select-autowidth-label"
                                            id="demo-simple-select-autowidth"
                                            autoWidth
                                            label="Function"
                                            {...field}
                                        >
                                            <MenuItem value={"insertVenue"}>Insert Venue</MenuItem>
                                            <MenuItem value={"insertShow"}>Insert Show</MenuItem>
                                            <MenuItem value={"deleteVenue"}>Delete Venue</MenuItem>
                                            <MenuItem value={"deleteShow"}>Delete Show</MenuItem>
                                        </Select>
                                    )} />
                            </FormControl>
                            {functionType === 'insertVenue' && <InsertVenue control={methods.control} />}
                            {functionType === 'insertShow' && <InsertShow control={methods.control} />}
                            {functionType === 'deleteVenue' && <DeleteVenue control={methods.control} />}
                            {functionType === 'deleteShow' && <DeleteShow control={methods.control} />}
                            <br />
                        </form>
                    </FormProvider>
                </main>
            </div>
        </Layout>
    );
}

export default Admin;
