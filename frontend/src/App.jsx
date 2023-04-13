import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
// down is one of the ways to import bootstrap
// import "./App.scss";
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
        <div className="container-fluid">
          <a className="navbar-brand" href="/restaurants">
            Restaurant Reviews
          </a>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/restaurants">
                Restaurants
              </Link>
            </li>
            <li className="nav-item">
              {user ? (
                <a onClick={logout} className="nav-link" style={{ cursor: "pointer" }}>
                  Logout {user.name}
                </a>
              ) : (
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              )}
            </li>
          </ul>
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
