import Sidebar from "../components/Sidebar";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const API_URL = "http://localhost:5005";

//page where the user is directed if he/she wants to edit a ride
function EditRidePage() {
  const [rideDateAndTime, setRideDateAndTime] = useState(null);
  const [meetingLocation, setMeetingLocation] = useState("");
  const [closestCity, setClosestCity] = useState("");
  const [rideDescription, setRideDescription] = useState("");

  //a ride to edit is got by using useParams
  const { rideId } = useParams();

  //navigate is used to redirect the user to the all rides page when edditing is finished
  const navigate = useNavigate();

  //useEffect is being used to get the ride data which one was already set
  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .get(`${API_URL}/api/rides/${rideId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        const chosenRide = response.data;
        setRideDateAndTime(chosenRide.rideDateAndTime);
        setMeetingLocation(chosenRide.meetingLocation);
        setClosestCity(chosenRide.closestCity);
        setRideDescription(chosenRide.rideDescription);
      })
      .catch((error) => console.log(error));
  }, [rideId]);

  //sending the edit form information to the back-end
  const handleSubmit = (event) => {
    event.preventDefault();
    const storedToken = localStorage.getItem("authToken");
    const requestBody = {
      rideDateAndTime,
      meetingLocation,
      closestCity,
      rideDescription,
    };
    axios
      .put(`${API_URL}/api/rides/${rideId}`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => {
        navigate("/myrides");
      });
  };

  return (
    <div className="Editpage">
      <Sidebar />
      <div className="EditRideCard-wrapper">
        <div className="EditRideCard">
          <form onSubmit={handleSubmit} className="addRide-form">
            <label className="addride-label">Ride date and time:</label>
            <input
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
              value={meetingLocation}
              onChange={(event) => setMeetingLocation(event.target.value)}
            />
            <label className="addride-label">Closest city: </label>
            <input
              className="addride-input"
              type="text"
              name="closestCity"
              value={closestCity}
              onChange={(event) => setClosestCity(event.target.value)}
            />
            <label className="addride-label">Description: </label>
            <input
              className="addride-input"
              type="text"
              name="rideDescription"
              value={rideDescription}
              onChange={(event) => setRideDescription(event.target.value)}
            />
            <button type="submit" className="addimage-button">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditRidePage;
