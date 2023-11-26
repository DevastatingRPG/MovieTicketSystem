import React from 'react';
import 'styles/admin.css';
import 'styles/navbar.css'
import Layout from '../components/layout';
import Navbar from '../components/navbar';

function Admin() {
  return (
    <Layout>
      <div>
        <h1>Welcome Admin</h1>
        <main>
          <section id="admin-movies">
            <p>Please enter the movies you want to delete:</p>
            <input type="text" placeholder=" Delete Movies" />
            <br />
            <br />
            <p>Please enter the movies you want to add:</p>
            <input type="text" placeholder="Add Movies" />
            <br />
          </section>
          <section id="admin-venues">
            <br />
            <p>Please enter the venue you want to delete:</p>
            <input type="text" placeholder=" Delete Venue" />
            <br />
            <br />
            <p>Please enter the venue you want to add:</p>
            <input type="text" placeholder="Add Venue" />
            <br />
          </section>
          <br />
          <input type="submit" value="Submit" id="admin-submit" />
        </main>
      </div>
    </Layout>
  );
}

export default Admin;
