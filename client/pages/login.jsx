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

function Login() {
  // State to manage the input values
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  // Function to handle form submission
  const handleSubmit = async () => {
    // Log the input values to the console
    try {
      const response = await postData('/login', {
        uid: username,
        password: password
      });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('uid', username);
        router.replace('/')
      }
      else {
        alert(response.data)
      }
      console.log(response.data)
    }
    catch (err) {
      console.error(err);
      alert(err);
    }
    // You can add additional logic here, such as sending the data to a server
  };

  return (
    <Layout>
      <div className={styles.container}>
        <h1>Enter login details</h1>
        <main className={styles.main}>
          <p>Enter your username:</p>
          <TextField id="outlined-basic" label="Username" variant="outlined" />
          <br />
          <br />
          <p>Enter your password:</p>
          <TextField id="outlined-basic" label="Password" variant="outlined" />
          <br />
          <br />
          <Button variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
          <br />
          <br />
          <Button variant="contained" onClick={() => window.location.href = "/admin"}>
            Admin Login
          </Button>
        </main>
      </div>
    </Layout>
  );
}

export default Login;
