import React, { useState } from 'react';
import 'styles/signup.css';
import Layout from '../components/layout';
import Navbar from '../components/navbar';

function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    age: '',
    contact: '',
    gender: 'Male', // Set a default value
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    // Add your logic for submitting the form data to the server if needed
  };

  return (
    <Layout>
      <div>
        <h1>Enter your details to create an account</h1>
        <main>
          <section id="signin">
            <form onSubmit={handleSubmit}>
              <p>Enter your name:</p>
              <input
                type="text"
                placeholder="Enter Name"
                name="name"
                value={formData.name}
                onChange={handleChange} />
              <br />
              <br />
              <p>Enter your email:</p>
              <input
                type="text"
                placeholder="Enter email"
                name="email"
                value={formData.email}
                onChange={handleChange} />
              <br />
              <br />
              <p>Enter username:</p>
              <input
                type="text"
                placeholder="Enter Username"
                name="username"
                value={formData.username}
                onChange={handleChange} />
              <br />
              <br />
              <p>Enter a password:</p>
              <input
                type="password"
                placeholder="Enter password"
                name="password"
                value={formData.password}
                onChange={handleChange} />
              <br />
              <br />
              <p>Enter your age:</p>
              <input
                type="text"
                placeholder="Enter Age"
                name="age"
                value={formData.age}
                onChange={handleChange} />
              <br />
              <br />
              <p>Enter your contact number:</p>
              <input
                type="text"
                placeholder="Enter contact"
                name="contact"
                value={formData.contact}
                onChange={handleChange} />
              <br />
              <br />
              <p>Select your gender:</p>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Others">Others</option>
              </select>
              <br />
              <br />
              <input type="submit" value="Submit" id="submit" />
            </form>
          </section>
          <br />
          <section id="login">
            <p>
              Already have an account? Click the link below to log in.{' '}
            </p>
            <a href="login">Login</a>
          </section>
        </main>
        <br />
      </div>
    </Layout>
  );
}

export default SignUp;
