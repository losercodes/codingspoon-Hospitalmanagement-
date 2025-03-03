const mongoose = require("mongoose");

const hospitalSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        city: { type: String, required: true },
        image: { type: String },
        specialities: { type: [String], required: true },
        rating: { type: Number, default: 0, required: true },
        description: { type: String },
        images: { type: [String] },
        numberOfDoctors: { type: Number },
        numberOfDepartments: { type: Number },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Hospital", hospitalSchema);