const ApplicationService = require("../services/applicationService");

exports.getApplications = async (req, res) => {
  try {
    const applications = await ApplicationService.getApplicationsByRole(req.user);
    res.json(applications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
