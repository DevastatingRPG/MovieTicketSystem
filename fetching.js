import { useState, useEffect } from "react";
import axios from 'axios'
import { AsyncLocalStorage } from "async_hooks";

const baseUrl = 'http://192.168.1.10:5000'
const client = axios.create({ baseURL: baseUrl })

async function fetchData(url) {
    try {
        response = await client.get(url); // Send the GET request                   
        return response.data // Update the state variable with the data

    } catch (error) {
        console.error(error); // Handle any errors
    }
}

async function postData(url, requestOptions) {
    try {
        let response = await client.get('?page=forms&func=save', requestOptions);
        return response;
        // Send the POST request      
    } catch (error) {
        console.error(error); // Handle any errors
    }
}

export const login = (props) => {
    const { id, password, type } = props;
    const data = {
        id: id,
        password: password, 
        type: type,
    }
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }
    if (postData('/login', requestOptions)){
        const userDetails = {
            uid: id,
            type: type
        }
        localStorage.setItem('UserDetails', JSON.stringify(userDetails));
        return 1;
    }

}