const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid token" });
  }
};

exports.isEmployer = (req, res, next) => {
  if (req.user?.role !== "employer") {
    return res.status(403).json({ message: "Access denied. Employers only." });
  }
  next();
};

exports.isJobSeeker = (req, res, next) => {
  if (req.user?.role !== "job_seeker") {
    return res.status(403).json({ message: "Access denied. Job seekers only." });
  }
  next();
};
