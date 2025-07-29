const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String, required: true },
    salary: { type: Number },
    requirements: { type: [String] },
    employer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    applications: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Application" },
    ],
    savedBy: [
      { type: mongoose.Schema.Types.ObjectId, ref: "User" }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", jobSchema);
