import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { isCompositeComponent } from 'react-dom/test-utils';
import Sidebar from '../components/Sidebar';
import { AuthContext } from '../context/auth.context';
const API_URL = "http://localhost:5005";

function MyProfilePage(props) {
    const [ me, setMe ] = useState(null);
    const { user } = useContext(AuthContext);
    

    const getUser = () => {
        const storedToken = localStorage.getItem("authToken");
    
        axios
          .get(`${API_URL}/api/users/${user.id}`, {
            headers: { Authorization: `Bearer ${storedToken}` },
          })
          .then((response) => setMe(response.data))
          .catch((error) => console.log(error));
      }
      
      useEffect(() => {
        
        getUser();
      }, []);

      

    return (
        <div className="Myprofilepage">
            <Sidebar/>
            {me && <div className="profileCard-wrapper">
            <h1 className="PageTitle">My profile details:</h1>
            <div className="profileCard">
            <p><b>Name: </b>{me.name}</p>
            <p><b>Email: </b>{me.email}</p>
            </div>
            </div>}
            
        </div>
    );
}

export default MyProfilePage;