// components/DeleteVenue.js
import React, { useState } from 'react';
import { postData } from '@/utilities/fetching';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Controller } from 'react-hook-form';

export default function DeleteVenue({control}) {
  // State variable to manage the input value
  return (
    <div>
      <section id="admin-venues">
        <br />
        <p>Venue ID:</p>
        <Controller
          name="vid"
          control={control}
          render={({ field }) => (
            <TextField {...field} id="outlined-basic" label="Venue ID" variant="outlined" />
          )}
        />
        <br />
        <br />
        <Button variant="contained" type='submit'>
          Submit
        </Button>
      </section>
    </div>
  );
}
