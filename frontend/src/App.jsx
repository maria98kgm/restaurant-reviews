import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import "bootstrap-icons/font/bootstrap-icons.css";
// down is one of the ways to import bootstrap
import "./App.scss";
// import * as bootstrap from "bootstrap";
import { Routes, Route, Link, Navigate, Outlet } from "react-router-dom";
import RestaurantsList from "./components/restaurantsList";
import AddReview from "./components/addReview";
import Restaurant from "./components/restaurant";
import Login from "./components/login";

function App() {
  const [user, setUser] = useState(null);

  const login = (user = null) => {
    setUser(user);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg bg-body-tertiary navbar-dark bg-dark">
        <div className="container">
          <a className="navbar-brand" href="/restaurants">
            Restaurant Reviews
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav align-items-center">
              <li className="nav-item">
                <Link className="nav-link" to="/restaurants">
                  Restaurants
                </Link>
              </li>
              <li className="nav-item">
                {user ? (
                  <a onClick={logout} className="nav-link" style={{ cursor: "pointer" }}>
                    <button className="btn btn-primary">Logout {user.name}</button>
                  </a>
                ) : (
                  <Link className="nav-link" to="/login">
                    <button className="btn btn-primary">Login</button>
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<Navigate to="/restaurants" />} />
          <Route path="/restaurants" element={<RestaurantsList />} />
          <Route path="/restaurants/:id/review" element={<AddReview user={user} />} />
          <Route path="/restaurants/:id" element={<Restaurant user={user} />} />
          <Route path="/login" element={<Login user={user} login={login} />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
