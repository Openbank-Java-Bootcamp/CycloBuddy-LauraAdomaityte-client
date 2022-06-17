import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "antd";
import { Link, useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const API_URL = "http://localhost:5005";

function RideDetailsPage() {
  const [ride, setRide] = useState(null);
  const { rideId } = useParams();
  const [isRouteCreated, setIsRouteCreated] = useState(false);

  const getRide = () => {
    const storedToken = localStorage.getItem("authToken");

    axios
      .get(`${API_URL}/api/rides/${rideId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        const selectedRide = response.data;
        setRide(selectedRide);
        if (selectedRide.route.id != null) {
          setIsRouteCreated(true);
        }
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getRide();
  }, []);

  return (
    <div className="RideDetails">
      <Sidebar />

      {isRouteCreated && (
        <div className="RideDetails-box">
          <div className="RideDetails-box-inner">
            {ride.route.id && (
              <div>
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
            )}
            <Link to="/allrides">
              <button className="ridedetails-btn">Go to All rides</button>
            </Link>
            <Link to="/myrides">
              <button className="ridedetails-btn">Go to My rides</button>
            </Link>
          </div>
        </div>
      )}
      {!isRouteCreated && (
        <div className="RideDetails-box">
          {" "}
          <div className="RideDetails-box-inner">
            <p>Route is still not being set yet. Check later on.</p>
            <Link to="/allrides">
              <button className="ridedetails-btn">Back to All rides</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default RideDetailsPage;
