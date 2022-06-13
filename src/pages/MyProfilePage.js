import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
const API_URL = "http://localhost:5005";

function MyProfilePage(props) {
    const [myRides, setMyRides] = useState([]);
    const [ user, setUser ] = useState(null);

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
        getUser();
      }, []);

      const getUser = () => {
        const storedToken = localStorage.getItem("authToken");
    
        axios
          .get(`${API_URL}/api/users/${myRides[0].user.id}`, {
            headers: { Authorization: `Bearer ${storedToken}` },
          })
          .then((response) => setUser(response.data))
          .catch((error) => console.log(error));
      }

    return (
        <div className="Myprofilepage">
            <Sidebar/>
        </div>
    );
}

export default MyProfilePage;