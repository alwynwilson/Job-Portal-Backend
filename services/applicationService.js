const Application = require("../models/Application");
const Job = require("../models/Job");
const User = require('../models/User')

exports.getApplicationsByRole = async (user) => {
  try {
    if (user.role === "job_seeker") {
      const applications = await Application.find({ applicant: user.id })
        .populate({
          path: "job",
          select: "title company location salary"
        });
      return applications;
    }

    if (user.role === "employer") {
      const jobs = await Job.find({ employer: user.id }, "_id");
      const jobIds = jobs.map(job => job._id);

      const applications = await Application.find({ job: { $in: jobIds } })
        .populate({
          path: "applicant",
          select: "username email profile resume"
        })
        .populate("job"); 
        
      return applications;
    }

    console.error("Unauthorized role access attempt:", user.role);
    return { error: "Unauthorized role" };

  } catch (err) {
    console.error("Error in getApplicationsByRole:", err.message);
    return { error: err.message };
  }
};

