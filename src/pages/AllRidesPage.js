import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
const API_URL = "http://localhost:5005";

function AllRidesPage(props) {
    const [rides, setRides ] = useState([]);

    const getAllRides = () => {
        const storedToken = localStorage.getItem("authToken");

        axios.get(`${API_URL}/api/rides`, {
            headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => setRides(response.data))
        .catch((error) => console.log(error));
    }

    useEffect(() => {
        getAllRides();
    }, [])

    return (
        <div className="Allridespage">
            <Sidebar />
            <div>
                {rides.map((ride) => (
                    <p>{ride.meetingLocation}</p>
                ))}
            </div>
        </div>
    );
}

export default AllRidesPage;