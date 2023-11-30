// components/DeleteShow.js
import { postData } from '@/utilities/fetching';
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Controller } from 'react-hook-form';

export default function DeleteShow({ control }) {
  // State to manage the input value

  return (
    <div>
      <section id="admin-venues">
        <br />
        <p>Show ID:</p>
        <Controller
          name="sid"
          control={control}
          render={({ field }) => (
            <TextField {...field} id="outlined-basic" label="Show ID" variant="outlined" />
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
