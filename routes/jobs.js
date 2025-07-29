const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');
const { verifyToken, isEmployer, isJobSeeker } = require('../middleware/authMiddleware');

router.get('/', jobController.getAllJobs);
router.get('/:id', jobController.getJobById);
router.post('/', verifyToken, isEmployer, jobController.createJob);
router.put('/:id', verifyToken, isEmployer, jobController.updateJob);
router.delete('/:id', verifyToken, isEmployer, jobController.deleteJob);
router.post('/:id/save', verifyToken, isJobSeeker, jobController.saveJob);
router.post('/:id/apply', verifyToken, isJobSeeker, jobController.applyJob);

module.exports = router;