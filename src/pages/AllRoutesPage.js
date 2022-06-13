import axios from "axios";
import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
const API_URL = "http://localhost:5005";

function AllRoutesPage(props) {
  const [rides, setRides] = useState([]);

  const getAllRides = () => {
    const storedToken = localStorage.getItem("authToken");

    axios
      .get(`${API_URL}/api/rides`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => setRides(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllRides();
  }, []);

  return (
    <div className="Allroutespage">
      <Sidebar />
      <div className="AllRoutesCard-wrapper">
      <h1 className="PageTitle">All routes:</h1>
        {rides.map((ride) => (
          <div className="AllRoutesCard">
            <h1 className="RideDetails-header">Route details:</h1>
            <p>
              <b>Distance: </b>
              {ride.route.distance} kilometers
            </p>
            <p>
              <b>Elevation gain: </b>
              {ride.route.elevationGain} meters
            </p>
            <p>
              <b>Estimated duration: </b>
              {ride.route.estimatedRouteDuration} minutes
            </p>
            <p>
              <b>Route starts at: </b>
              {ride.route.startPlace}
            </p>
            <p>
              <b>Route ends at: </b>
              {ride.route.endPlace}
            </p>
            <p>
              <b>Route is for: </b>
              {ride.route.bicycleType} bicycle
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllRoutesPage;
