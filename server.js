const express = require("express");
const connectDB = require("./config/db");
const companyRoutes = require("./routes/companyRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const cors = require("cors");

const app = express();

// Database connection
connectDB();

app.use(cors());
app.use(express.json());

app.use("/api", companyRoutes, reviewRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
