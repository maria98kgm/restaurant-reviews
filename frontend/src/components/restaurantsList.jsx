import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import RestaurantDataService from "../services/restaurant";

function RestaurantsList() {
  const [restaurants, setRestaurants] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchZip, setSearchZip] = useState("");
  const [searchCuisine, setSearchCuisine] = useState("");
  const [cuisines, setCuisines] = useState(["All Cuisines"]);

  useEffect(() => {
    retrieveRestaurants();
    retrieveCuisines();
  }, []);

  const onChangeSearchName = (event) => {
    const searchName = event.target.value;
    setSearchName(searchName);
  };

  const onChangeSearchZip = (event) => {
    const searchZip = event.target.value;
    setSearchZip(searchZip);
  };

  const onChangeSearchCuisine = (event) => {
    const searchCuisine = event.target.value;
    setSearchCuisine(searchCuisine);
  };

  const retrieveRestaurants = () => {
    RestaurantDataService.getAll()
      .then((response) => {
        setRestaurants(response.data.restaurants);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const retrieveCuisines = () => {
    RestaurantDataService.getCuisines()
      .then((response) => {
        setCuisines(["All Cuisines"].concat(response.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const refreshList = () => {
    retrieveRestaurants();
  };

  const find = (query, by) => {
    RestaurantDataService.find(query, by)
      .then((response) => {
        setRestaurants(response.data.restaurants);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const findByName = () => {
    find(searchName, "name");
  };

  const findByZip = () => {
    find(searchZip, "zipcode");
  };

  const findByCuisine = () => {
    if (searchCuisine == "All Cuisines") {
      refreshList();
    } else {
      find(searchCuisine, "cuisine");
    }
  };

  return (
    <div className="container">
      <div className="row mb-4">
        <div className="col input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name"
            value={searchName}
            onChange={onChangeSearchName}
          />
          <button className="btn btn-outline-secondary" type="button" onClick={findByName}>
            Search
          </button>
        </div>
        <div className="col input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Search by zip"
            value={searchZip}
            onChange={onChangeSearchZip}
          />
          <button className="btn btn-outline-secondary" type="button" onClick={findByZip}>
            Search
          </button>
        </div>
        <div className="col input-group">
          <select className="form-select" onChange={onChangeSearchCuisine}>
            {cuisines.map((cuisine) => {
              return (
                <option key={cuisine} value={cuisine}>
                  {cuisine.substring(0, 20)}
                </option>
              );
            })}
          </select>
          <button className="btn btn-outline-secondary" type="button" onClick={findByCuisine}>
            Search
          </button>
        </div>
      </div>
      <div className="container mb-4" style={{ display: "flex", justifyContent: "space-between" }}>
        <button type="button" class="btn btn-primary">
          <i className="bi bi-arrow-return-left" />
        </button>
        <button type="button" class="btn btn-primary">
          <i className="bi bi-arrow-return-right" />
        </button>
      </div>
      <div className="row">
        {restaurants.map((restaurant) => {
          const address = `${restaurant.address.building} ${restaurant.address.street}, ${restaurant.address.zipcode}`;
          return (
            <div key={restaurant._id} className="col-lg-4 pb-1">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{restaurant.name}</h5>
                  <p className="card-text">
                    <strong>Cuisine: </strong>
                    {restaurant.cuisine}
                    <br />
                    <strong>Address: </strong>
                    {address}
                  </p>
                  <div className="row">
                    <Link
                      to={"/restaurants/" + restaurant._id}
                      className="btn btn-primary col-lg-5 mx-1 mb-1"
                    >
                      View Reviews
                    </Link>
                    <a
                      target="_blank"
                      href={"https://www.google.com/maps/place/" + address}
                      className="btn btn-primary col-lg-5 mx-1 mb-1"
                    >
                      View Map
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default RestaurantsList;