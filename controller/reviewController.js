const Review = require("../models/reviewSchema");
const Company = require("../models/companySchema");

const addReview = async (req, res) => {
  try {
    const { companyId } = req.params;

    // Create a new review
    if (
      !req.body.fullName ||
      !req.body.subject ||
      !req.body.reviewText ||
      !req.body.starRating
    ) {
      return res.status(404).json({ message: "All field are required" });
    }

    const newReview = new Review({ ...req.body, companyId });
    await newReview.save();

    // Fetch all reviews for the company
    const reviews = await Review.find({ companyId });

    // Calculate average rating and total reviews
    const totalRating = reviews.reduce(
      (acc, { starRating }) => acc + starRating,
      0
    );
    const averageRating = totalRating / reviews.length || 0; // Avoid division by zero
    const totalReviews = reviews.length;

    // Update the company's average rating and total reviews
    await Company.findByIdAndUpdate(
      companyId,
      { averageRating, totalReviews },
      { new: true }
    );

    res.status(201).json(newReview);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getReviews = async (req, res) => {
  try {
    const { companyId } = req.params;

    // Check if the company exists
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({ message: "Company not found." });
    }

    // Fetch reviews for the company
    const reviews = await Review.find({ companyId });

    res.status(200).json({
      reviews,
      totalResults: reviews.length,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addReview,
  getReviews,
};
