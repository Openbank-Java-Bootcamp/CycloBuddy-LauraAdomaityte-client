import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5005";

function AddRoute(props) {
    const [distance, setDistance] = useState(0);
    const [ elevationGain, setElevationGain ] = useState(0);
    const [estimatedRouteDuration, setEstimatedRouteDuration ] = useState(0);
    const [ startPlace, setStartPlace ] = useState("");
    const [ endPlace, setEndPlace ] = useState("");
    const [ bicycleType, setBicycleType ] = useState("");

    const navigate = useNavigate();

    const handleSubmit = (event) => {

        event.preventDefault();

        const { rideAssigned } = props;
        const requestBody = { distance, elevationGain, estimatedRouteDuration, startPlace, endPlace, bicycleType, rideAssigned }
        const storedToken = localStorage.getItem("authToken");

        axios.post(`${API_URL}/api/routes`, requestBody, {
            headers: { Authorization: `Bearer ${storedToken}` },
        }).then(() => {
            setDistance(0);
            setElevationGain(0);
            setEstimatedRouteDuration(0);
            setStartPlace("");
            setEndPlace("");
            setBicycleType("");
            props.refreshRides();
            navigate("/myrides")
        }).catch((error) => console.log(error));
    }

    return (
        <div className="AddRoute">
            
            <h1 className="RideDetails-header">Add route details:</h1>
               
                    <form onSubmit={handleSubmit} className="addRoute-form">
                        <label>Distance:</label>
                        <input type="number" name="distance" value={distance} placeholder="in kilometers" onChange={(event) => setDistance(event.target.value)}/>
                        <label>Elevation gain: </label>
                        <input type="number" name="elevationGain" value={elevationGain} placeholder="in meters" onChange={(event) => setElevationGain(event.target.value)} />
                        <label>Estimated route duration: </label>
                        <input type="number" name="estimatedRouteDuration" value={estimatedRouteDuration} placeholder="in minutes" onChange={(event) => setEstimatedRouteDuration(event.target.value)}/>
                        <label>Route starts at:</label>
                        <input type="text" name="startPlace" value={startPlace} placeholder="type here..." onChange={(event) => setStartPlace(event.target.value)}/>
                        <label>Route ends at: </label>
                        <input type="text" name="endPlace" value={endPlace} placeholder="type here..." onChange={(event) => setEndPlace(event.target.value)}/>
                        <label>Route for:</label>
                        <input type="text" name="bicycleType" value={bicycleType} placeholder="type bicycle type" onChange={(event) => setBicycleType(event.target.value)}/>
                        <button type="submit" className="addroute-button">Submit</button> 
                    </form>
                    
                
            
          
            
        </div>
    );
}

export default AddRoute;

    
