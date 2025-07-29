const JobService = require('../services/jobService');

exports.createJob = async (req, res) => {
  try {
    const job = await JobService.createJob(req.body, req.user.id);
    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await JobService.getAllJobs();
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getJobById = async (req, res) => {
  try {
    const job = await JobService.getJobById(req.params.id);
    if (!job) return res.status(404).json({ error: 'Job not found' });
    res.json(job);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateJob = async (req, res) => {
  try {
    const job = await JobService.updateJob(req.params.id, req.body, req.user.id);
    if (!job) return res.status(403).json({ error: 'Unauthorized or job not found' });
    res.json(job);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteJob = async (req, res) => {
  try {
    const deleted = await JobService.deleteJob(req.params.id, req.user.id);
    if (!deleted) return res.status(403).json({ error: 'Unauthorized or job not found' });
    res.json({ message: 'Job deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.saveJob = async (req, res) => {
  try {
    const job = await JobService.saveJob(req.params.id, req.user.id);
    res.json(job);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.applyJob = async (req, res) => {
  try {
    const application = await JobService.applyJob(req.params.id, req.user.id, req.body);
    res.status(201).json(application);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};