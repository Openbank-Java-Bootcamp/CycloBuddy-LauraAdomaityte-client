import axios from "axios";
import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { Button } from "antd";
const API_URL = "http://localhost:5005";

function MyRidesPage() {
  const [myRides, setMyRides] = useState([]);

  const getMyRides = () => {
    const storedToken = localStorage.getItem("authToken");

    axios
      .get(`${API_URL}/api/rides/user`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => setMyRides(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getMyRides();
  }, []);

  return (
    <div className="Myridespage">
      <Sidebar />
      <div className="MyRidesCard-wrapper">
      <h1 className="PageTitle">My rides:</h1>
        {myRides.map((ride) => (
          <div className="MyRidesCard">
            <div className="MyRidesCard-inner">
              <h1 className="RideDetails-header">Ride details:</h1>
              <p>
                <b>Ride date and time: </b> {ride.rideDateAndTime}
              </p>
              <p>
                <b>Meeting location: </b>
                {ride.meetingLocation}
              </p>
              <p>
                <b>Closest city: </b>
                {ride.closestCity}
              </p>
              <p>
                <b>Ride description: </b>
                {ride.rideDescription}
              </p>
              <p>
                <b>Organized by: </b>
                {ride.user.name}
              </p>
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
            <div className="MyRidesCard-button">
              <Button ghost>Edit ride</Button>
              <Button ghost>Delete ride</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyRidesPage;
