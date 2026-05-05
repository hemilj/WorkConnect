const { protect } = require("../middleware/authMiddleware.js")
const express = require("express");
const router = express.Router();

router.get("/", protect, (req, res) => {
    res.json({
        message: "Access granted",
        user: req.user
    });
});

module.exports = router;