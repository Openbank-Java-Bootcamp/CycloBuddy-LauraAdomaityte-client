import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "antd";
import { Link, useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const API_URL = "http://localhost:5005";

function RideDetailsPage() {
  const [ride, setRide] = useState(null);
  const { rideId } = useParams();

  const getRide = () => {
    const storedToken = localStorage.getItem("authToken");

    axios
      .get(`${API_URL}/api/rides/${rideId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        const selectedRide = response.data;
        setRide(selectedRide);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getRide();
  }, []);

  return (
    <div className="RideDetails">
      <Sidebar />
      {ride && (
        <div className="RideDetails-box">
            <div className="RideDetails-box-inner"><h1 className="RideDetails-header">All ride details:</h1>
          <p>
            <b>Ride date and time: </b> {ride.rideDateAndTime}
          </p>
          <p>
            <b>Meeting location: </b>
            {ride.meetingLocation}
          </p>
          <p><b>Closest city: </b>{ride.closestCity}</p>
          <p><b>Ride description: </b>{ride.rideDescription}</p>
          <p><b>Organized by: </b>{ride.user.name}</p>
          <h1 className="RideDetails-header">Route details:</h1>
          <p><b>Distance: </b>{ride.route.distance} kilometers</p>
          <p><b>Elevation gain: </b>{ride.route.elevationGain} meters</p>
          <p><b>Estimated duration: </b>{ride.route.estimatedRouteDuration} minutes</p>
          <p><b>Route starts at: </b>{ride.route.startPlace}</p>
          <p><b>Route ends at: </b>{ride.route.endPlace}</p>
          <p><b>Route is for: </b>{ride.route.bicycleType} bicycle</p>
          <Link to="/allrides">
            <Button ghost>Back to All rides</Button>
          </Link></div>
          
        </div>
      )}
    </div>
  );
}

export default RideDetailsPage;




// private String bicycleType;
