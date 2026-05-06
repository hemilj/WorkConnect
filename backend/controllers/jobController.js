const Job = require("../models/Job");

// @desc    Create a new job
// @route   POST /api/jobs/create
// @access  Private (Employer only)
const createJob = async (req, res) => {
    try {
        const { title, description, salary, location, category } = req.body;

        const job = await Job.create({
            title,
            description,
            salary,
            location,
            category,
            company: req.user.id // ID from decoded token (added by protect middleware)
        });

        res.status(201).json({
            message: "Job created successfully",
            job
        });

    } catch (error) {
        console.error("Create job error:", error);
        res.status(500).json({ message: "Error creating job" });
    }
};

// Get all jobs
const getJobs = async (req, res) => {
    try {
        const jobs = await Job.find().populate("company", "name email").sort({ createdAt: -1 });
        res.status(200).json(jobs);
    } catch (error) {
        console.error("Get jobs error:", error);
        res.status(500).json({ message: "Error fetching jobs" });
    }
};

// Get job by ID
const getJobById = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id).populate("company", "name email");
        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }
        res.status(200).json(job);
    } catch (error) {
        console.error("Get job by ID error:", error);
        res.status(500).json({ message: "Error fetching job details" });
    }
};

module.exports = { createJob, getJobs, getJobById };
