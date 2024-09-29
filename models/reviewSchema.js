const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    fullName: { type: String, required: true },
    subject: { type: String, required: true },
    reviewText: { type: String, required: true },
    starRating: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", reviewSchema);
