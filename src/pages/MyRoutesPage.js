import axios from "axios";
import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
const API_URL = "http://localhost:5005";

//the page where my routes are being shown
function MyRoutesPage() {
  const [myRidesWithRoutes, setMyRidesWithRoute] = useState([]);

  const getMyRides = () => {
    const storedToken = localStorage.getItem("authToken");

    axios
      .get(`${API_URL}/api/rides/user`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        const myRidesWithRoute = response.data.filter((ride) => {
          return ride.route != null;
        });
        setMyRidesWithRoute(myRidesWithRoute);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getMyRides();
  }, []);

  return (
    <div className="Myridespage">
      <Sidebar />
      <div className="MyRidesCard-wrapper">
        <h1 className="PageTitle">My routes:</h1>
        {myRidesWithRoutes.map((ride) => (
          <div className="AllRoutesCard" key={ride.id}>
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

export default MyRoutesPage;
