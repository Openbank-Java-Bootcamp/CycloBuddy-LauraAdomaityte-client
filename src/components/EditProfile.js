import React from 'react';
import { useState, useEffect } from "react";
import axios from "axios";
const API_URL = "http://localhost:5005";

function EditProfile(props) {
    const [ city, setCity ] = useState("");
    const [ bicycleType, setBicycleType ] = useState("");
    const [ averageSpeed, setAverageSpeed ] = useState(0);
    const [ averageKmPerMonth, setAverageKmPerMonth ] = useState(0);
    
    

    useEffect(() => {
        const storedToken = localStorage.getItem("authToken");
        axios.get(`${API_URL}/api/users/${props.userId}`, {
            headers: { Authorization: `Bearer ${storedToken}`}
        }).then((response) => {
            const chosenUser = response.data;
            setCity(chosenUser.city);
            setBicycleType(chosenUser.bicycleType);
            setAverageSpeed(chosenUser.averageSpeed);
            setAverageKmPerMonth(chosenUser.averageKmPerMonth);
        }).catch((error) => console.log(error))
    }, [props.userId])

    const handleSubmit = (event) => {
        event.preventDefault();
        const storedToken = localStorage.getItem("authToken");
        const requestBody = { city, bicycleType, averageSpeed, averageKmPerMonth }
        axios.put(`${API_URL}/api/users/${props.userId}`, requestBody, {
            headers: { Authorization: `Bearer ${storedToken}`}
        }).then(() => {
            props.refreshProfile();
            props.notShowForm();
        })
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className="EditProfile-box">
                <label>City: </label>
                <input type="text" name="city" value={city} onChange={(event) => setCity(event.target.value)}/>
                <label>My bicycle type: </label>
                <input type="text" name="bicycleType" value={bicycleType} onChange={(event) => setBicycleType(event.target.value)} />
                <label>My average speed</label>
                <input type="number" name="averageSpeed" value={averageSpeed} onChange={(event) => setAverageSpeed(event.target.value)}/>
                <label>My average kilometers per month</label>
                <input type="number" name="averageKmPerMonth" value={averageKmPerMonth} onChange={(event) => setAverageKmPerMonth(event.target.value)} />
                <button type="submit" className="Edit-button">Submit</button>
            </form>
        </div>
    );
}

export default EditProfile;