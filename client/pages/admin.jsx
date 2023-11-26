import React, { useState } from 'react';
import 'styles/admin.css';
import 'styles/navbar.css'
import Layout from '../components/layout';
import Navbar from '../components/navbar';
import InsertVenue from '@/components/insertVenue';
import InsertShow from '@/components/insertShow';
import DeleteShow from '@/components/deleteShow';
import DeleteVenue from '@/components/deleteVenue';
import styles from '../styles/AdminPage.module.css'

function Admin() {

  const [functionType, setFunctionType] = useState('');

  return (
    <Layout>
      <div className={styles.AdminPage}>
        <h1>Welcome Admin</h1>
        <main>
          <select onChange={(e) => setFunctionType(e.target.value)}>
            <option value="">Select function</option>
            <option value="insertVenue">Insert Venue</option>
            <option value="insertShow">Insert Show</option>
            <option value="deleteVenue">Delete Venue</option>
            <option value="deleteShow">Delete Show</option>
          </select>
          {functionType === 'insertVenue' && <InsertVenue />}
          {functionType === 'insertShow' && <InsertShow />}
          {functionType === 'deleteVenue' && <DeleteVenue />}
          {functionType === 'deleteShow' && <DeleteShow />}
          <br />
          <input type="submit" value="Submit" id="submit" />
        </main>
      </div>
    </Layout>
  );
}

export default Admin;
