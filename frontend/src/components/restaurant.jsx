import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import RestaurantDataService from "../services/restaurant";

const Restaurant = (props) => {
  const initialRestaurantState = {
    id: null,
    name: "",
    address: {},
    cuisine: "",
    reviews: [],
  };
  const [restaurant, setRestaurant] = useState(initialRestaurantState);
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
      });
  };

  const deleteReview = (reviewId) => {
    RestaurantDataService.deleteReview(reviewId, props.user.id)
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
    <div>
      {restaurant ? (
        <div>
          <h5>{restaurant.name}</h5>
          <p>
            <strong>Cuisine: </strong>
            {restaurant.cuisine}
            <br />
            <strong>Address: </strong>
            {restaurant.address.building} {restaurant.address.street}, {restaurant.address.zipcode}
          </p>
          <Link to={"/restaurants/" + id + "/review"} className="btn btn-primary">
            Add Review
          </Link>
          <h4 style={{ marginTop: "2rem" }}> Reviews </h4>
          <div className="row">
            {restaurant.reviews.length > 0 ? (
              restaurant.reviews.map((review) => {
                return (
                  <div className="col-lg-4 pb-1" key={review._id}>
                    <div className="card">
                      <div className="card-body">
                        <p className="card-text">
                          {review.text}
                          <br />
                          <strong>User: </strong>
                          {review.name}
                          <br />
                          <strong>Date: </strong>
                          {review.date}
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
                              to={{
                                pathname: "/restaurants/" + id + "/review",
                                state: {
                                  currentReview: review,
                                },
                              }}
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
