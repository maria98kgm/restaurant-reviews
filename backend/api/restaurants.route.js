import express from "express";
import RestaurantsCtrl from "./restaurants.controller.js";

var router = express.Router();

router.route("/").get(RestaurantsCtrl.apiGetRestaurants);

export default router;
