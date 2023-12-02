// components/InsertShow.js
import React from 'react';
import { TextField, Select } from '@mui/material';
import Button from '@mui/material/Button';
import { Controller } from 'react-hook-form';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

export default function InsertShow({ control }) {
  // State variables to manage the input values
  // Function to handle form submission

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
        <p>Name:</p>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField {...field} id="outlined-basic" label="Name" variant="outlined" />
          )}
        />
        <br />
        <br />
        <p>Category:</p>
        <Controller
          name="stype"
          control={control}
          render={({ field }) => (
            // <TextField {...field} id="outlined-basic" label="Category" variant="outlined" />
            <FormControl sx={{ m: 1, minWidth: 200 }}>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                autoWidth
                label="ShowType"
                {...field}
              >
                <MenuItem value={"Action"}>Action</MenuItem>
                <MenuItem value={"Drama"}>Drama</MenuItem>
                <MenuItem value={"Comedy"}>Comedy</MenuItem>
                <MenuItem value={"Thriller"}>Thriller</MenuItem>
                <MenuItem value={"Other"}>Other</MenuItem>

              </Select>
            </FormControl>
          )}
        />
        <br />
        <br />
        <p>Trailer URL:</p>
        <Controller
          name="trailer"
          control={control}
          render={({ field }) => (
            <TextField {...field} id="outlined-basic" label="Trailer" variant="outlined" />
          )}
        />
        <br />
        <br />
        <p>Image URL:</p>
        <Controller
          name="image"
          control={control}
          render={({ field }) => (
            <TextField {...field} id="outlined-basic" label="Image" variant="outlined" />
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
