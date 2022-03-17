const express = require("express");
const {addCampus, getAllCampus, getCampus, updateCampus, deleteCampus, getCampusName} = require("../controllers/campusController");

const router = express.Router();

router.post("/create", addCampus);

router.get("/read", getAllCampus);

router.get("/read/:id/name", getCampusName);

router.get("/read/:id", getCampus);

router.put("/update/:id", updateCampus);

router.delete("/delete/:id", deleteCampus);

module.exports = {
    routes: router
}