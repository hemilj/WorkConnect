const express = require("express");
const router = express.Router();

const { createJob, getJobs, getJobById } = require("../controllers/jobController");
const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

// Public route to get all jobs
router.get("/", getJobs);

// Public route to get single job
router.get("/:id", getJobById);

// Only employer can create job
// Changed role from "company" to "employer" to match the User model accountType
router.post("/create", protect, authorizeRoles("employer"), createJob);

module.exports = router;
