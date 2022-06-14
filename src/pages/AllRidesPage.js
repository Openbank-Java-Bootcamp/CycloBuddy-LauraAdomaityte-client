import axios from "axios";
import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { Button } from "antd";
import { Link } from "react-router-dom";
import AddRide from "../components/AddRide";
const API_URL = "http://localhost:5005";

function AllRidesPage() {
  const [rides, setRides] = useState([]);
  const [showAddRide, setShowAddRide] = useState(false);

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

  const toggleShowAddRide = () => {
    setShowAddRide(!showAddRide)
  }

  return (
    <div className="Allridespage">
      <Sidebar />
      <div className="AllRidesCard-wrapper">
      <h1 className="PageTitle">All rides:</h1>
      {showAddRide && <AddRide refreshRides={getAllRides} />}
      <Button ghost onClick={toggleShowAddRide}>{showAddRide ? "Hide form" : "Add new ride"}</Button>
        {rides.map((ride) => (
          <div className="AllRidesCard" key={ride.id}>
            <div>
              <p>
                <b>Meeting location: </b>
                {ride.meetingLocation}
              </p>
              <p>
                <b>Meeting day and time: </b>
                {ride.rideDateAndTime}
              </p>
              <p>
                <b>Ride description: </b>
                {ride.rideDescription}
              </p>
              <p>
                <b>Organized by: </b>
                {ride.user.name}
              </p>
            </div>
            <div className="AllRidesCard-button">
              <Link to={`/allrides/${ride.id}`}><Button ghost>See route description</Button></Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllRidesPage;
