const express = require("express");
const { addReview, getReviews } = require("../controller/reviewController");

const router = express.Router();

router.post("/add-review/:companyId", addReview).get("/get-review/:companyId", getReviews);

module.exports = router;
