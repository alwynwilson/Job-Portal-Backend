const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["job_seeker", "employer"], required: true },
    profile: {
      fullName: { type: String },
      skills: [String],
      experience: { type: Number },
      education: { type: String },
      location: { type: String },
      phone: { type: String },
      linkedin: { type: String },
    },
    company: {
      name: { type: String },
      description: { type: String },
      location: { type: String },
      website: { type: String },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
