import React, { useState } from "react";
import LoginForm from "./components/LoginForm";
import './MyStyle.css';
import Footer from "./components/Footer";
import Header from "./components/Header";
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import MainBody from "./components/MainBody";
import Profile from "./components/Profile";
import { ImUser } from "react-icons/im";


function App() {
  const adminUser = {
    email: "admin@admin.com",
    password: "123",
  };

  const [user, setUser] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const Login = (details) => {
    console.log(details);

    if (details.email == adminUser.email &&
      details.password == adminUser.password) {
    console.log(localStorage.getItem('isLoggedIn'));
    // if (localStorage.getItem('isLoggedIn') === "true") {
      setError("");
      console.log("Logged in");
      setUser({
        email: details.email,
        password: details.password
      })
      // localStorage.setItem('userDetails', JSON.stringify(details));
      console.log(localStorage.getItem('userDetails'));


      console.log("retriving " + (JSON.parse(localStorage.getItem('userDetails'))).email);
    } else {
      console.log("Details do not match");
      setError("Details do not match");
    }
  }

  const Logout = () => {
    setUser({ name: "", email: "" });
    localStorage.setItem('isLoggedIn', false);

    localStorage.clear();
  };


  const openProfileModal = () => {
    console.log("Create Clicked");
    console.log(isProfileOpen);
    setIsProfileOpen(true);
    console.log(isProfileOpen);
  };
  const closeProfileModal = () => {
    setIsProfileOpen(false);
  };

  return (
    <>

      {/* {user.email != "" ? ( */}
      {(localStorage.getItem('isLoggedIn') === "true") ? (
        <>
          <div className="containerBody">
            <div className="header">
              <img
                className="logo-container-header"
                src="uxbd_logo.png"
                alt="UX-BD"
              />

              <div >

                <div className="text-right col-12" >
                  <h6>

                    Welcome, <span>{(JSON.parse(localStorage.getItem('userDetails'))).EmployeeEmail}</span>{" "}

                    <Profile show={isProfileOpen} onHide={closeProfileModal} />
                    <ImUser className=" ml-4" onClick={openProfileModal} />
                    {/* <button className="buttonClose mx-4" onClick={openProfileModal} >Profile</button> */}

                    <button className="buttonClose mx-4" onClick={Logout} >Logout</button>
                  </h6>
                </div>

              </div>

              {/* <div align="right">
                <h6>
                  Welcome, <span>{(JSON.parse(localStorage.getItem('userDetails'))).EmployeeEmail}</span>{" "}
                  <button className="logoutButton" onClick={Logout} >Logout</button>
                </h6></div> */}
              <Header />
            </div>
            <div className="mainBody">
              <MainBody />
            </div>
            <div className="footer">
              <Footer />
            </div>
          </div>
        </>
      ) : (
        <LoginForm Login={Login} error={error} />
      )}
    </>
  );
};


export default App;
