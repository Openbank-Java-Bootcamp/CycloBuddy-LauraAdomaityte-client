import axios from "axios";
import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { Button } from "antd";
import { Divider, Input } from "antd";
import { Link } from "react-router-dom";
import AddRide from "../components/AddRide";

const API_URL = "http://localhost:5005";

//page where all the rides are being shown
function AllRidesPage() {
  const [rides, setRides] = useState([]);
  const [ridesDB, setRidesDB] = useState(rides);
  const [showAddRide, setShowAddRide] = useState(false);
  const [searchField, setSearchField] = useState("");

  //function to get all rides from database
  const getAllRides = () => {
    const storedToken = localStorage.getItem("authToken");

    axios
      .get(`${API_URL}/api/rides`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setRides(response.data);
        setRidesDB(response.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllRides();
  }, []);

  //function for search bar
  const filterRidesList = (str) => {
    let filteredRides;

    if (str === "") {
      filteredRides = rides;
    } else {
      filteredRides = ridesDB.filter((ride) => {
        return ride.closestCity.toLowerCase().includes(str.toLowerCase());
      });
    }
    setRidesDB(filteredRides);
  };

  const handleChange = (event) => {
    setSearchField(event.target.value);

    filterRidesList(event.target.value);
  };

  //function to handle show/not show the add form
  const toggleShowAddRide = () => {
    setShowAddRide(!showAddRide);
  };

  return (
    <div className="Allridespage">
      <Sidebar />

      <div className="AllRidesCard-wrapper">
        <h1 className="PageTitle">All rides:</h1>
        {showAddRide && <AddRide refreshRides={getAllRides} />}
        <button className="addride-btn" onClick={toggleShowAddRide}>
          {showAddRide ? "Hide form" : "Add ride"}
        </button>

        <div>
          <Divider className="Search-divider">
            <p className="search-name">Search for a ride by closest city</p>
          </Divider>
          <input
            value={searchField}
            type="search"
            placeholder="Type city..."
            name="insertedText"
            onChange={handleChange}
            className="search-input"
          />
        </div>

        {ridesDB.map((ride) => (
          <div className="AllRidesCard" key={ride.id}>
            <div className="AllRideCard-pic-text">
              {ride.picture.length > 500 && (
                <div>
                  <img
                    src={`data:image/png;base64,${ride.picture}`}
                    width={250}
                    className="RidePicture"
                  />
                </div>
              )}

              {ride.picture.length < 500 && (
                <div>
                  <img
                    src={`${ride.picture}`}
                    width={250}
                    className="RidePicture"
                  />
                </div>
              )}
              <div className="AllRideCard-text">
                <p>
                  <b>Meeting location: </b>
                  {ride.meetingLocation}
                </p>
                <p>
                  <b>Meeting day and time: </b>
                  {ride.rideDateAndTime}
                </p>
                <p>
                  <b>Description: </b>
                  {ride.rideDescription}
                </p>
                <p>
                  <b>Closest city: </b>
                  {ride.closestCity}
                </p>
                <p>
                  <b>Organized by: </b>
                  {ride.user.name}
                </p>
              </div>
            </div>
            <div className="AllRidesCard-button">
              <Link to={`/allrides/${ride.id}`}>
                <button className="ridedetails-btn">route description</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllRidesPage;
