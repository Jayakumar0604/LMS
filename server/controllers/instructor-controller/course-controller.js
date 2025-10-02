const Course = require("../../models/Course");

const addNewCourse = async (req, res) => {
  try {
    const courseData = req.body;
    const newlyCreatedCourse = new Course(courseData);
    const saveCourse = await newlyCreatedCourse.save();

    if (saveCourse) {
      res.status(201).json({
        success: true,
        message: "Course saved successfully",
        data: saveCourse,
      });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

const getAllCourses = async (req, res) => {
  try {
    console.log("getAllCourses - req.user:", req.user);
    console.log("getAllCourses - Authorization header:", req.headers.authorization);

    // Check if user is authenticated
    if (!req.user || !req.user._id) {
      // Temporary fallback for debugging - get all courses
      console.warn("User not authenticated, returning all courses (DEBUG MODE)");
      const coursesList = await Course.find({});
      return res.status(200).json({
        success: true,
        data: coursesList,
        debug: "No authentication - showing all courses"
      });
    }

    // Filter courses by current instructor's ID
    const coursesList = await Course.find({ instructorId: req.user._id });

    console.log(`Found ${coursesList.length} courses for instructor ${req.user._id}`);
    
    res.status(200).json({
      success: true,
      data: coursesList,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

const getCourseDetailsByID = async (req, res) => {
  try {
    const { id } = req.params;
    // Ensure instructor can only access their own courses
    const courseDetails = await Course.findOne({ 
      _id: id, 
      instructorId: req.user._id 
    });

    if (!courseDetails) {
      return res.status(404).json({
        success: false,
        message: "Course not found!",
      });
    }

    res.status(200).json({
      success: true,
      data: courseDetails,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

const updateCourseByID = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCourseData = req.body;

    // Ensure instructor can only update their own courses
    const updatedCourse = await Course.findOneAndUpdate(
      { _id: id, instructorId: req.user._id },
      updatedCourseData,
      { new: true }
    );

    if (!updatedCourse) {
      return res.status(404).json({
        success: false,
        message: "Course not found!",
      });
    }

    res.status(200).json({
      success: true,
      message: "Course updated successfully",
      data: updatedCourse,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

module.exports = {
  addNewCourse,
  getAllCourses,
  updateCourseByID,
  getCourseDetailsByID,
};
