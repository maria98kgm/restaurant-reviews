import axios from "axios";

export default axios.create({
  baseURL: "https://restaurant-reviews-backend-6794.onrender.com/api/v1/restaurants",
  headers: {
    "Content-Type": "application/json",
  },
});
