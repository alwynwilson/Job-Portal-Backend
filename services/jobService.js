const Job = require('../models/Job');
const Application = require('../models/Application');

exports.createJob = (data, employerId) => {
  return Job.create({ ...data, employer: employerId });
};

exports.getAllJobs = () => {
  return Job.find().populate('employer', 'username company');
};

exports.getJobById = (id) => {
  return Job.findById(id).populate('employer', 'username company');
};

exports.updateJob = async (id, data, employerId) => {
  const job = await Job.findById(id);
  if (job && job.employer.toString() === employerId) {
    Object.assign(job, data);
    return job.save();
  }
  return null;
};

exports.deleteJob = async (id, employerId) => {
  const job = await Job.findById(id);

  if (job && job.employer.toString() === employerId) {
    await Application.deleteMany({ job: id });
    await job.deleteOne();
    return true;
  }
  return false;
};


exports.saveJob = async (jobId, userId) => {
  const job = await Job.findById(jobId);
  if (!job.savedBy) job.savedBy = [];
  if (!job.savedBy.includes(userId)) {
    job.savedBy.push(userId);
    await job.save();
  }
  return job;
};

exports.applyJob = async (jobId, applicantId, { coverLetter, resume }) => {
  const existingApplication = await Application.findOne({
    job: jobId,
    applicant: applicantId
  });

  if (existingApplication) {
    const error = new Error('Already Applied');
    error.statusCode = 409;
    throw error;
  }

  const application = new Application({
    job: jobId,
    applicant: applicantId,
    coverLetter,
    resume,
    status: 'pending',
    appliedAt: new Date()
  });

  await application.save();

  const job = await Job.findById(jobId);
  console.log(job);
  
  if (!job.applications) job.applications = [];
  job.applications.push(application._id);
  await job.save();
  
  return application;
};

