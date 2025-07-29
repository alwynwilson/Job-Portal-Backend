const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/applicationController');
const { verifyToken } = require('../middleware/authMiddleware');

router.get('/', verifyToken, applicationController.getApplications);

module.exports = router;
