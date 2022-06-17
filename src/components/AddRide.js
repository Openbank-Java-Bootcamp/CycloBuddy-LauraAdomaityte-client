import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
const API_URL = "http://localhost:5005";

function AddRide(props) {
  const [rideDateAndTime, setRideDateAndTime] = useState(null);
  const [meetingLocation, setMeetingLocation] = useState("");
  const [closestCity, setClosestCity] = useState("");
  const [rideDescription, setRideDescription] = useState("");
  const [picture, setPicture] = useState("");

  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

  const onFormChange = (e) => {
    let file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = _handleReaderLoaded.bind(this);

      reader.readAsBinaryString(file);
    }
  };

  const _handleReaderLoaded = (readerEvt) => {
    let binaryString = readerEvt.target.result;
    setPicture(btoa(binaryString));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const userId = user.id;
    const requestBody = {
      rideDateAndTime,
      meetingLocation,
      closestCity,
      rideDescription,
      userId,
      picture
    };
    const storedToken = localStorage.getItem("authToken");

    axios
      .post(`${API_URL}/api/rides`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => {
        setRideDateAndTime(null);
        setMeetingLocation("");
        setClosestCity("");
        setRideDescription("");
        props.refreshRides();
        navigate("/myrides");
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    document.getElementById("input_btn")
    .addEventListener('click',function(){
      document.getElementById("file").click();
    },false);
  }, [])

  return (
    <div>
      <form 
        onSubmit={handleSubmit}
        className="addRide-form"
        onChange={(e) => onFormChange(e)}
      >
        <label className="addride-label">Ride date and time:</label>
        <input
         className="addride-input"
          type="datetime-local"
          name="rideDateAndTime"
          value={rideDateAndTime}
          onChange={(event) => setRideDateAndTime(event.target.value)}
        />
        <label className="addride-label">Meeting location: </label>
        <input
        className="addride-input"
          type="text"
          name="meetingLocation"
          placeholder="type here..."
          value={meetingLocation}
          onChange={(event) => setMeetingLocation(event.target.value)}
        />
        <label className="addride-label">Closest city: </label>
        <input
         className="addride-input"
          type="text"
          name="closestCity"
          placeholder="type here..."
          value={closestCity}
          onChange={(event) => setClosestCity(event.target.value)}
        />
        <label className="addride-label">Ride description: </label>
        <input
         className="addride-input"
          type="text"
          name="rideDescription"
          placeholder="type here..."
          value={rideDescription}
          onChange={(event) => setRideDescription(event.target.value)}
        />
        <label className="addride-label">Image: </label>
        <input type="file" name="image" id="file" accept=".jpeg, .png, .jpg" className='input-file'/>
        <button type="button" className="addimage-button" id="input_btn">Browse image</button>
        <button  htmlType="submit" id="login-btn">
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddRide;
