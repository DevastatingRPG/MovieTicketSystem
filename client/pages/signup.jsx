import React, { useState } from 'react';
import styles from 'styles/signup.module.css'; // Import the local styles
import Layout from '../components/layout';
import { postData } from '@/utilities/fetching';
import { useRouter } from 'next/router';

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
      if (response.data == "OK"){
        router.replace('/login');
      }
      else{
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
              <input
                type="text"
                placeholder="Enter Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              <br />
              <br />
              <p>Enter your email:</p>
              <input
                type="text"
                placeholder="Enter Email"
                name="email"
                value={formData.email}
                onChange={handleChange} />
              <br />
              <br />
              <p>Enter username:</p>
              <input
                type="text"
                placeholder="Enter Username"
                name="uname"
                value={formData.uname}
                onChange={handleChange} />
              <br />
              <br />
              <p>Enter a password:</p>
              <input
                type="password"
                placeholder="Enter Password"
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
                placeholder="Enter contact number"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange} />
              <br />
              <br />
              <p>Select your gender:</p>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="">Select gender</option>
                <option value="M">Male</option>
                <option value="F">Female</option>
                <option value="O">Others</option>
              </select>
              <br />
              <br />
              <input type="submit" value="Submit" id="submit" />
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
