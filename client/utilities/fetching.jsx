import axios from "axios";
const ipv4 = process.env.NEXT_PUBLIC_IPv4;
const client = axios.create({ baseURL: `http://${ipv4}:5000` });

export async function fetchData(url) {
  try {
    let response = await client.get(url); // Send the GET request
    return response.data; // Update the state variable with the data
  } catch (error) {
    console.error(error); // Handle any errors
  }
}

export async function postData(url, data) {
  try {
    let response = await client.post(url, data);
    return response;
    // Send the POST request
  } catch (error) {
    console.error(error); // Handle any errors
  }
}