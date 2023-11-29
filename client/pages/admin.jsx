// Admin.jsx
import React, { useState } from 'react';
import styles from 'styles/admin.module.css'; // Import the local styles
import Layout from '../components/layout';
import InsertVenue from '@/components/insertVenue';
import InsertShow from '@/components/insertShow';
import DeleteShow from '@/components/deleteShow';
import DeleteVenue from '@/components/deleteVenue';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { InputLabel, FormControl } from '@mui/material';

function Admin() {
  const [functionType, setFunctionType] = useState('');

  return (
    <Layout>
      <div className={styles.AdminPage}>
        <h1>Welcome Admin</h1>
        <main>
          <FormControl sx={{ m: 1, minWidth: 200 }}>
            <InputLabel id="demo-simple-select-autowidth-label">Select function</InputLabel>
            <Select
              autoWidth
              onChange={(e) => setFunctionType(e.target.value)}>
              <MenuItem value="insertVenue">Insert Venue</MenuItem>
              <MenuItem value="insertShow">Insert Show</MenuItem>
              <MenuItem value="deleteVenue">Delete Venue</MenuItem>
              <MenuItem value="deleteShow">Delete Show</MenuItem>
            </Select>
          </FormControl>
          {functionType === 'insertVenue' && <InsertVenue />}
          {functionType === 'insertShow' && <InsertShow />}
          {functionType === 'deleteVenue' && <DeleteVenue />}
          {functionType === 'deleteShow' && <DeleteShow />}
          <br />
        </main>
      </div>
    </Layout>
  );
}

export default Admin;
