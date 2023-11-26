import React from 'react';
import 'styles/login.css';
import Layout from '../components/layout'
import Link from 'next/link';
import 'styles/navbar.css';
import Navbar from '@/components/navbar';

function Login() {
  return (
    <Layout>
      <div>
        <h1>Enter your login details</h1>
        <main>
          <p>Enter your phone number:</p>
          <input type="text" placeholder="Enter contact" />
          <br />
          <br />
          <p>Enter your password:</p>
          <input type="password" placeholder="Enter password" />
          <br />
          <br />
          <input type="submit" value="Submit" id="submit" />
        </main>
        <li className="admin-login-btn">
          <Link href="admin">Admin Login</Link>
        </li>
      </div>
    </Layout>
  );
}

export default Login;
