const express = require("express");
const { addCompany, getCompanies } = require("../controller/companyController");

const router = express.Router();

router.post("/add-company", addCompany).get("/get-companies", getCompanies);

module.exports = router;
