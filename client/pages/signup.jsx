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

function SignUp() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    uname: '',
    email: '',
    password: '',
    age: '',
    mobile: '',
    gender: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    try {
      const response = await postData('/register', formData);
      if (response.data == "OK") {
        router.replace('/login');
      }
      else {
        alert(response.data);
      }
    }
    catch (err) {
      console.error(err);
      alert(err);
    }
    // Add your logic for submitting the form data to the server if needed
  };

  return (
    <Layout>
      <div className={styles.container}>
        <h1>Enter your details to create an account</h1>
        <main>
          <section className={styles.form} id="signin">
            <form onSubmit={handleSubmit}>
              <p>Enter your name:</p>
              <TextField id="outlined-basic" label="Name" variant="outlined" />
              <br />
              <br />
              <p>Enter your email:</p>
              <TextField id="outlined-basic" label="Email" variant="outlined" />
              <br />
              <br />
              <p>Enter username:</p>
              <TextField id="outlined-basic" label="Username" variant="outlined" />
              <br />
              <br />
              <p>Enter a password:</p>
              <TextField id="outlined-basic" label="Password" variant="outlined" />
              <br />
              <br />
              <p>Enter your age:</p>
              <TextField id="outlined-basic" label="Age" variant="outlined" />
              <br />
              <br />
              <p>Enter your contact number:</p>
              <TextField id="outlined-basic" label="Contact Number" variant="outlined" />
              <br />
              <br />
              <p>Select your gender:</p>
              <FormControl sx={{ m: 1, minWidth: 100 }}>
                <InputLabel id="demo-simple-select-autowidth-label">Gender</InputLabel>
                <Select
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  autoWidth
                  label="Gender"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <MenuItem value={"Male"}>Male</MenuItem>
                  <MenuItem value={"Female"}>Female</MenuItem>
                  <MenuItem value={"Others"}>Others</MenuItem>
                </Select>
              </FormControl>
              <br />
              <br />
              <Button variant="contained" onClick={handleSubmit}>
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
