import axios from "axios";
import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { Button } from "antd";
import { Link } from "react-router-dom";
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

  const deleteRide = (rideId) => {
    const storedToken = localStorage.getItem("authToken");

    axios.delete(`${API_URL}/api/rides/${rideId}`, {
      headers: { Authorization: `Bearer ${storedToken}` },
    }).then(() => {
      getMyRides();
    }).catch((error) => console.log(error))
  }


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
              
            </div>
            <div className="MyRidesCard-button">
              {ride.route === null && <Button ghost>Add route</Button>}
              {ride.route != null && <Button ghost>See route</Button>}
              <Link to={`/allrides/edit/${ride.id}`}><Button ghost>Edit ride</Button></Link>
              <Button ghost onClick={() => deleteRide(ride.id)}>Delete ride</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyRidesPage;

