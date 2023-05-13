import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import RestaurantDataService from "../services/restaurant";
import Loader from "./loader";

const Restaurant = (props) => {
  const initialRestaurantState = {
    id: null,
    name: "",
    address: {},
    cuisine: "",
    reviews: [],
  };
  const [restaurant, setRestaurant] = useState(initialRestaurantState);
  const [loading, setLoading] = useState(true);
  let { id } = useParams();

  useEffect(() => {
    getRestaurant(id);
  }, [id]);

  const getRestaurant = (id) => {
    RestaurantDataService.get(id)
      .then((res) => {
        setRestaurant(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const deleteReview = (reviewId) => {
    RestaurantDataService.deleteReview(reviewId)
      .then(() => {
        setRestaurant((prevState) => {
          const reviewIndex = prevState.reviews.findIndex((item) => item._id === reviewId);
          const newReviews = [...prevState.reviews];
          newReviews.splice(reviewIndex, 1);

          return {
            ...prevState,
            reviews: newReviews,
          };
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="mt-5">
      {loading ? (
        <Loader />
      ) : restaurant ? (
        <div>
          <h4
            style={{ width: "fit-content" }}
            className="mb-4 border-start border-bottom border-primary border-2 p-2 pt-0"
          >
            {restaurant.name}
          </h4>
          <p className="mb-2">
            <strong>Cuisine: </strong>
            {restaurant.cuisine}
          </p>
          <p className="mb-2">
            <strong>Address: </strong>
            {restaurant.address.building} {restaurant.address.street}, {restaurant.address.zipcode}
          </p>
          <p className="mb-4">
            <strong>Borough: </strong>
            {restaurant.borough}
          </p>
          <Link to={"/restaurants/" + id + "/review"} className="btn btn-primary">
            Add Review
          </Link>
          <h5 style={{ fontSize: "1.4rem" }} className="mt-5 mb-4">
            {" "}
            Reviews{" "}
          </h5>
          <div className="row">
            {restaurant.reviews.length > 0 ? (
              restaurant.reviews.map((review) => {
                return (
                  <div className="col-lg-4 pb-1" key={review._id}>
                    <div className="card h-100">
                      <div className="card-body d-flex flex-column justify-content-between">
                        <p className="card-title">{review.text}</p>
                        <p className="card-text">
                          <strong>Date: </strong>
                          {new Date(review.date).toLocaleDateString("en-us", {
                            weekday: "long",
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                          <br />
                          <strong>User: </strong>
                          {review.name}
                        </p>
                        {props.user && props.user.id === review.user_id && (
                          <div className="row">
                            <a
                              onClick={() => deleteReview(review._id)}
                              className="btn btn-primary col-lg-5 mx-1 mb-1"
                            >
                              Delete
                            </a>
                            <Link
                              to={"/restaurants/" + id + "/review"}
                              state={{ currentReview: review }}
                              className="btn btn-primary col-lg-5 mx-1 mb-1"
                            >
                              Edit
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="col-sm-4">
                <p>No reviews yet.</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div>
          <br />
          <p>No restaurant selected.</p>
        </div>
      )}
    </div>
  );
};

export default Restaurant;
