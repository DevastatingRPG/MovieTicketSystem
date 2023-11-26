import React, { useState } from 'react';
import 'styles/login.css';
import Layout from '../components/layout';
import Link from 'next/link';
import 'styles/navbar.css';
import Navbar from '@/components/navbar';
import { postData } from '@/utilities/fetching';
import { useRouter } from 'next/router';

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
      if (response.data.token){
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('uid', username);
        router.replace('/')
      }
      else{
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
      <div>
        <h1>Enter your login details</h1>
        <main>
          <p>Enter your username:</p>
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
          <br />
          <p>Enter your password:</p>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <br />
          <br />
          <input type="submit" value="Submit" id="submit" onClick={handleSubmit} />
        </main>
        <li className="admin-login-btn">
          <Link href="admin">Admin Login</Link>
        </li>
      </div>
    </Layout>
  );
}

export default Login;
