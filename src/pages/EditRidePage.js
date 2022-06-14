
import Sidebar from "../components/Sidebar";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const API_URL = "http://localhost:5005";

function EditRidePage() {
  const [rideDateAndTime, setRideDateAndTime] = useState(null);
  const [meetingLocation, setMeetingLocation] = useState("");
  const [closestCity, setClosestCity] = useState("");
  const [rideDescription, setRideDescription] = useState("");

  const { rideId } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    axios.get(`${API_URL}/api/rides/${rideId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
    }).then((response) => {
        const chosenRide = response.data;
        setRideDateAndTime(chosenRide.rideDateAndTime);
        setMeetingLocation(chosenRide.meetingLocation);
        setClosestCity(chosenRide.closestCity);
        setRideDescription(chosenRide.rideDescription);
    }).catch((error) => console.log(error))
}, [rideId])
 
const handleSubmit = (event) => {
    event.preventDefault();
    const storedToken = localStorage.getItem("authToken");
    const requestBody = { rideDateAndTime, meetingLocation, closestCity, rideDescription }
    axios.put(`${API_URL}/api/rides/${rideId}`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}`}
    }).then(() => {
        navigate("/myrides")
    })

}

  return (
    <div className="Editpage">
      <Sidebar />
      <div className="EditRideCard-wrapper">
        <div className="EditRideCard">
          <form onSubmit={handleSubmit} className="addRide-form">
            <label>Ride date and time:</label>
            <input
              type="datetime-local"
              name="rideDateAndTime"
              value={rideDateAndTime}
              onChange={(event) => setRideDateAndTime(event.target.value)}
            />
            <label>Meeting location: </label>
            <input
              type="text"
              name="meetingLocation"
              value={meetingLocation}
              onChange={(event) => setMeetingLocation(event.target.value)}
            />
            <label>Closest city: </label>
            <input
              type="text"
              name="closestCity"
              value={closestCity}
              onChange={(event) => setClosestCity(event.target.value)}
            />
            <label>Description: </label>
            <input
              type="text"
              name="rideDescription"
              value={rideDescription}
              onChange={(event) => setRideDescription(event.target.value)}
            />
            <button type="submit" className="Edit-button">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditRidePage;
