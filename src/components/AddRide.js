import axios from 'axios';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/auth.context';
import { useNavigate } from "react-router-dom";
const API_URL = "http://localhost:5005";

function AddRide(props) {
    const [ rideDateAndTime, setRideDateAndTime] = useState(null);
    const [ meetingLocation, setMeetingLocation ] = useState("");
    const [ closestCity, setClosestCity ] = useState("");
    const [ rideDescription, setRideDescription ] = useState("");

    const navigate = useNavigate();
    
    
    const { user } = useContext(AuthContext);

    const handleSubmit = (event) => {
        event.preventDefault();
        const userId = user.id;
        const requestBody = { rideDateAndTime, meetingLocation, closestCity, rideDescription, userId}
        const storedToken = localStorage.getItem("authToken");
        
        axios
      .post(`${API_URL}/api/rides`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        // Reset the state
        setRideDateAndTime(null);
        setMeetingLocation("");
        setClosestCity("");
        setRideDescription("");
        props.refreshRides();
        navigate("/myrides")
      })
      .catch((error) => console.log(error));
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className="addRide-form">
                <label>Ride date and time:</label>
                <input  type="datetime-local" name="rideDateAndTime" value={rideDateAndTime} onChange={(event) => setRideDateAndTime(event.target.value)} />
                <label>Meeting location: </label>
                <input type="text" name="meetingLocation" placeholder="type here..." value={meetingLocation} onChange={(event) => setMeetingLocation(event.target.value)}/>
                <label>Closest city: </label>
                <input  type="text" name="closestCity" placeholder="type here..." value={closestCity} onChange={(event) => setClosestCity(event.target.value)} />
                <label>Ride description: </label>
                <input type="text" name="rideDescription" placeholder="type here..." value={rideDescription} onChange={(event) => setRideDescription(event.target.value)}/>
                <button type="submit" className="addRide-button">Submit</button>
            </form>
            
        </div>
    );
}

export default AddRide;

