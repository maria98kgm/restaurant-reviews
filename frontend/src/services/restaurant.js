import http from "../http-common.js";

class RestaurantDataService {
  getAll(page = 0) {
    return http.get(`restaurants?page=${page}`);
  }

  get(id) {
    return http.get(`/restaurant?id=${id}`);
  }

  find(query, by = "name", page = 0) {
    return http.get(`restaurants?${by}=${query}&page=${page}`);
  }

  createReview(data) {
    return http.post("/review_new", data);
  }

  updateReview(data) {
    return http.put("/review_update", data);
  }

  deleteReview(id) {
    return http.delete(`/review_delete?review_id=${id}`);
  }

  getCuisines() {
    return http.get("/cuisines");
  }
}

export default new RestaurantDataService();
