import axios from "axios";
import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { Col, Card, Row, Button } from "antd";
const API_URL = "http://localhost:5005";

function AllRidesPage(props) {
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
    <div className="Allridespage">
      <Sidebar />
      <div className="AllRidesCard-wrapper">
        {rides.map((ride) => (
          <div className="AllRidesCard">
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
                <b>Organized by: </b>
                {ride.user.name}
              </p>
            </div>
            <div className="AllRidesCard-buttons">
              <Button ghost>Full ride description</Button>
              <Button ghost>Organizer profile</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllRidesPage;
