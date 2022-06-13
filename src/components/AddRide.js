import axios from 'axios';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/auth.context';
const API_URL = "http://localhost:5005";

function AddRide(props) {
    const [ rideDateAndTime, setRideDateAndTime] = useState("2002-06-13 12:00");
    const [ meetingLocation, setMeetingLocation ] = useState("");
    const [ closestCity, setClosestCity ] = useState("");
    const [ description, setDescription ] = useState("");
    const [ distance, setDistance ] = useState(0);
    const [ elevationGain, setElevationGain ] = useState(0);
    const [ estimatedDuration, setEstimatedDuration] = useState(0);
    const [ startPlace, setStartPlace ] = useState("");
    const [ endPlace, setEndPlace ] = useState("");
    const [ bicycleType, setBicycleType ] = useState("");
    const { user } = useContext(AuthContext);

    const handleSubmit = (event) => {
        event.preventDefault();
        const userId = user.id;
        const routeDetails = {distance, elevationGain, estimatedDuration, startPlace, endPlace, bicycleType}
        const requestBody = { rideDateAndTime, meetingLocation, closestCity, description, userId,  routeDetails}
        const storedToken = localStorage.getItem("authToken");
        
        axios
      .post(`${API_URL}/api/rides`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        // Reset the state
        setRideDateAndTime("2002-06-13 12:00");
        setMeetingLocation("");
        setClosestCity("");
        setDescription("");
        setDistance(0);
        setElevationGain(0);
        setEstimatedDuration(0);
        setStartPlace("");
        setEndPlace("");
        setBicycleType("");
        props.refreshRides();
      })
      .catch((error) => console.log(error));
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className="addRide-form">
                <label>Ride date and time:</label>
                <input  type="datetime-local" name="rideDateAndTime" value={rideDateAndTime} onChange={(event) => setRideDateAndTime(event.target.value)} />
                <label>Meeting location: </label>
                <input type="text" name="meetingLocation" value={meetingLocation} onChange={(event) => setMeetingLocation(event.target.value)}/>
                <label>Closest city: </label>
                <input  type="text" name="closestCity" value={closestCity} onChange={(event) => setClosestCity(event.target.value)} />
                <label>Description: </label>
                <input type="text" name="description" value={description} onChange={(event) => setDescription(event.target.value)}/>
                <label>Distance: </label>
                <input type="number" name="distance" value={distance} onChange={(event) => setDistance(event.target.value)} />
                <label>Elevation gain (in meters):</label>
                <input type="number" name="elevationGain" value={elevationGain} onChange={(event) => setElevationGain(event.target.value)} />
                <label>Estimated duration (in minutes):</label>
                <input type="number" name="estimatedDuration" value={estimatedDuration} onChange={(event) => setEstimatedDuration(event.target.value)} />
                <label>Route starts at:</label>
                <input type="text" name="startPlace" value={startPlace} onChange={(event) => setStartPlace(event.target.value)} />
                <label>Route ends at:</label>
                <input type="text" name="endPlace" value={endPlace} onChange={(event) => setEndPlace(event.target.value)} />
                <label>Route is perfect for bicycle type:</label>
                <input type="text" name="bicycleType" value={bicycleType} onChange={(event) => setBicycleType(event.target.value)} />
                <button type="submit" className="addRide-button">Submit</button>
            </form>
            
        </div>
    );
}

export default AddRide;

