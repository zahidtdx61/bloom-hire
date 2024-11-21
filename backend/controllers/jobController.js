const { StatusCodes } = require("http-status-codes");
const Job = require("../models/job");
const User = require("../models/user");

const addJob = async (req, res) => {
  const job = req.body;
  try {
    const jobPoster = await User.findOne({ uid: job.postedBy });
    
    if (!jobPoster) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Invalid job poster!",
        data: {},
      });
    }
    job.postedBy = jobPoster._id;

    const newJob = await Job.create(job);
    res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Job created successfully",
      data: newJob,
      error: {},
    });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: "Invalid job data!",
      data: {},
      error: error.errors,
    });
  }
};

module.exports = { addJob };