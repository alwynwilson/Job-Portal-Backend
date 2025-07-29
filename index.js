require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connection = require("./config/db");

const authRoutes = require('./routes/auth');
const jobRoutes = require('./routes/jobs');
const applicationRoutes = require('./routes/applications');

connection();

const server = express();

server.use(cors({origin: "*"}));
server.use(express.json());

server.use('/api/auth', authRoutes);
server.use('/api/jobs', jobRoutes);
server.use('/api/applications', applicationRoutes);

PORT = 3000 || process.env.PORT;

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running in port:${PORT}`);
});