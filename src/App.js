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

function App() {
  return (
    <div className="App" >
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<HomePage/>} />
        <Route path="/signup" element={<IsAnon><SignupPage /></IsAnon>} />
        <Route path="/login" element={<IsAnon><LoginPage /></IsAnon>} />
        <Route path="/mainpage" element={<IsPrivate><MainPage /></IsPrivate>} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
