import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import RestaurantDataService from "../services/restaurant";

const RestaurantsList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchZip, setSearchZip] = useState("");
  const [searchCuisine, setSearchCuisine] = useState("");
  const [cuisines, setCuisines] = useState(["All Cuisines"]);
  const [page, setPage] = useState(0);
  const [maxPage, setMaxPage] = useState(0);
  const [currentSearch, setCurrentSearch] = useState(["name", ""]);
  const [loading, setLoading] = useState(true);

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
        const totalPages = Math.floor(response.data.total_results / response.data.entries_per_page);
        setPage(0);
        setMaxPage(totalPages);
        setRestaurants(response.data.restaurants);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
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

  const find = (query, by, page, doNotSetPage) => {
    RestaurantDataService.find(query, by, page)
      .then((response) => {
        const totalPages = Math.floor(response.data.total_results / response.data.entries_per_page);
        if (!doNotSetPage) setPage(0);
        setMaxPage(totalPages);
        setRestaurants(response.data.restaurants);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const findByName = () => {
    find(searchName, "name");
    setCurrentSearch(["name", searchName]);
  };

  const findByZip = () => {
    find(searchZip, "zipcode");
    setCurrentSearch(["zipcode", searchZip]);
  };

  const findByCuisine = () => {
    if (searchCuisine == "All Cuisines") {
      refreshList();
      setCurrentSearch(["name", ""]);
    } else {
      find(searchCuisine, "cuisine");
      setCurrentSearch(["cuisine", searchCuisine]);
    }
  };

  const pagLeft = () => {
    if (page > 0) {
      const newPage = page - 1;
      setPage(newPage);
      find(currentSearch[1], currentSearch[0], newPage, true);
    }
  };

  const pagRight = () => {
    if (page < maxPage) {
      const newPage = page + 1;
      setPage(newPage);
      find(currentSearch[1], currentSearch[0], newPage, true);
    }
  };

  return (
    <div className="container-md">
      <div className="row mb-4 justify-content-center gy-2">
        <div className="col-4 input-group-container">
          <div className="input-group">
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
        </div>
        <div className="col-4 input-group-container">
          <div className="input-group">
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
        </div>
        <div className="col-4 input-group-container">
          <div className="input-group">
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
      </div>
      <div className="container mb-4" style={{ display: "flex", justifyContent: "space-between" }}>
        <button
          type="button"
          className={`btn btn-primary ${page === 0 ? "disabled" : ""}`}
          onClick={pagLeft}
        >
          <i className="bi bi-arrow-return-left" />
        </button>
        <button
          type="button"
          className={`btn btn-primary ${page === maxPage ? "disabled" : ""}`}
          onClick={pagRight}
        >
          <i className="bi bi-arrow-return-right" />
        </button>
      </div>
      <div className="row justify-content-center">
        {loading ? (
          <p className="text-center fs-3 mt-5">Loading...</p>
        ) : restaurants.length ? (
          restaurants.map((restaurant) => {
            const address = `${restaurant.address.building} ${restaurant.address.street}, ${restaurant.address.zipcode}`;
            return (
              <div key={restaurant._id} className="card-col pb-2">
                <div className="card h-100">
                  <div className="card-body d-flex flex-column justify-content-between">
                    <div className="mb-4">
                      <h5 className="card-title">{restaurant.name}</h5>
                      <p className="card-text">
                        <strong>Cuisine: </strong>
                        {restaurant.cuisine}
                        <br />
                        <strong>Address: </strong>
                        {address}
                      </p>
                    </div>
                    <div className="d-flex justify-content-start">
                      <Link
                        to={"/restaurants/" + restaurant._id}
                        className="btn btn-primary mx-1 mb-1"
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
          })
        ) : (
          <p className="text-center fs-3 mt-5">Nothing Found...</p>
        )}
      </div>
    </div>
  );
};

export default RestaurantsList;
