const Company = require("../models/companySchema");

const addCompany = async (req, res) => {
  try {
    // Create a new company instance with the request body

    if (
      !req.body.name ||
      !req.body.location ||
      !req.body.foundedOn ||
      !req.body.city
    ) {
      return res.status(404).json({ message: "All field are required" });
    }

    const newCompany = new Company(req.body);
    await newCompany.save();

    res.status(201).json(newCompany);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getCompanies = async (req, res) => {
  try {
    // Fetch companies from the database
    const companies = await Company.find();

    res.json(companies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addCompany,
  getCompanies,
};
