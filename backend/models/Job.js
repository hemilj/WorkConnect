const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    salary: {
        type: Number
    },
    location: {
        type: String
    },
    category: {
        type: String,
        enum: ['Technology', 'Design', 'Marketing', 'Finance', 'Other'],
        default: 'Other',
        required: true
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // This refers to the employer
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("Job", jobSchema);
