import "./App.css";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import SignupPage from "./pages/SigninPage";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import IsPrivate from "./components/IsPrivate";
import IsAnon from "./components/IsAnon";
import MyRidesPage from "./pages/MyRidesPage";
import MyProfilePage from "./pages/MyProfilePage";
import MyRoutesPage from "./pages/MyRoutesPage";
import AllRidesPage from "./pages/AllRidesPage";
import AllRoutesPage from "./pages/AllRoutesPage";
import RideDetailsPage from "./pages/RideDetailsPage";
import EditRidePage from "./pages/EditRidePage";
import AddRoutePage from "./components/AddRoute";


function App() {
  return (
    <div className="App" >
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<HomePage/>} />
        <Route path="/signup" element={<IsAnon><SignupPage /></IsAnon>} />
        <Route path="/login" element={<IsAnon><LoginPage /></IsAnon>} />
        
        <Route path="/profile" element={<IsPrivate><MyProfilePage/></IsPrivate>} />
        <Route path="/myrides" element={<IsPrivate><MyRidesPage/></IsPrivate>} />
        <Route path="/myroutes" element={<IsPrivate><MyRoutesPage/></IsPrivate>} />
        <Route path="/allrides" element={<IsPrivate><AllRidesPage/></IsPrivate>} />
        <Route path="/allroutes" element={<IsPrivate><AllRoutesPage/></IsPrivate>} />
        <Route path="/allrides/:rideId" element={<IsPrivate><RideDetailsPage/></IsPrivate>}/>
        <Route path="/allrides/edit/:rideId" element={<IsPrivate><EditRidePage/></IsPrivate>} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
