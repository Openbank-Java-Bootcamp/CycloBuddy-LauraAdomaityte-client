import axios from "axios";
import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
const API_URL = "http://localhost:5005";

function AllRoutesPage() {
  const [ridesWithRoute, setRidesWithRoute] = useState([]);

  const getAllRoutes = () => {
    const storedToken = localStorage.getItem("authToken");

    axios
      .get(`${API_URL}/api/rides`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        const allRides = response.data;
        const filteredRides = allRides.filter((ride) => {
          return ride.route != null;
        });
        setRidesWithRoute(filteredRides);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllRoutes();
  }, []);

  return (
    <div className="Allroutespage">
      <Sidebar />
      <div className="AllRoutesCard-wrapper">
        <h1 className="PageTitle">All routes:</h1>
        {ridesWithRoute.map((ride) => (
          <div className="AllRoutesCard" key={ride.id}>
            
            <div><h1 className="RideDetails-header">Route details:</h1>
            
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
            </p></div>
            <div>
            {ride.picture.length > 500 && (
                <div>
                  <img
                    src={`data:image/png;base64,${ride.picture}`}
                    width={420}
                    className="RidePicture"
                  />
                </div>
              )}
              
              {ride.picture.length < 500 && (
                <div>
                  <img
                    src={`${ride.picture}`}
                    width={420}
                    className="RidePicture"
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllRoutesPage;
