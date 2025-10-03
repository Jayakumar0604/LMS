const Order = require("../../models/Order");
const Course = require("../../models/Course");
const StudentCourses = require("../../models/StudentCourses");

const createOrder = async (req, res) => {
  try {
    const {
      userId,
      userName,
      userEmail,
      instructorId,
      instructorName,
      courseImage,
      courseTitle,
      courseId,
      coursePricing,
    } = req.body;

    console.log("Creating fake payment order for:", { userId, courseId, courseTitle });

    // Validate required fields
    if (!coursePricing || isNaN(parseFloat(coursePricing))) {
      return res.status(400).json({
        success: false,
        message: "Invalid course pricing",
      });
    }

    // Generate fake payment IDs
    const fakePaymentId = "FAKE_PAY_" + Date.now();
    const fakePayerId = "FAKE_PAYER_" + userId;

    // Create order with fake payment details
    const newlyCreatedCourseOrder = new Order({
      userId,
      userName,
      userEmail,
      orderStatus: "confirmed",
      paymentMethod: "fake_payment",
      paymentStatus: "paid",
      orderDate: new Date(),
      paymentId: fakePaymentId,
      payerId: fakePayerId,
      instructorId,
      instructorName,
      courseImage,
      courseTitle,
      courseId,
      coursePricing,
    });

    await newlyCreatedCourseOrder.save();

    // Automatically complete the enrollment process
    await completeEnrollment(newlyCreatedCourseOrder);

    // Generate fake approval URL for client compatibility
    const fakeApprovalUrl = `${process.env.CLIENT_URL || 'http://localhost:5173'}/payment-return?paymentId=${fakePaymentId}&PayerID=${fakePayerId}&orderId=${newlyCreatedCourseOrder._id}`;

    res.status(201).json({
      success: true,
      data: {
        approveUrl: fakeApprovalUrl,
        orderId: newlyCreatedCourseOrder._id,
        message: "Fake payment processed successfully!",
      },
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Some error occurred!",
    });
  }
};

// Helper function to complete enrollment
async function completeEnrollment(order) {
  try {
    // Update StudentCourses
    const studentCourses = await StudentCourses.findOne({
      userId: order.userId,
    });

    if (studentCourses) {
      // Check if already enrolled
      const alreadyEnrolled = studentCourses.courses.find(
        (course) => course.courseId === order.courseId
      );
      
      if (!alreadyEnrolled) {
        studentCourses.courses.push({
          courseId: order.courseId,
          title: order.courseTitle,
          instructorId: order.instructorId,
          instructorName: order.instructorName,
          dateOfPurchase: order.orderDate,
          courseImage: order.courseImage,
        });
        await studentCourses.save();
      }
    } else {
      const newStudentCourses = new StudentCourses({
        userId: order.userId,
        courses: [
          {
            courseId: order.courseId,
            title: order.courseTitle,
            instructorId: order.instructorId,
            instructorName: order.instructorName,
            dateOfPurchase: order.orderDate,
            courseImage: order.courseImage,
          },
        ],
      });
      await newStudentCourses.save();
    }

    // Update the course schema students
    await Course.findByIdAndUpdate(order.courseId, {
      $addToSet: {
        students: {
          studentId: order.userId,
          studentName: order.userName,
          studentEmail: order.userEmail,
          paidAmount: order.coursePricing,
        },
      },
    });

    console.log("Enrollment completed for order:", order._id);
  } catch (error) {
    console.error("Error completing enrollment:", error);
  }
}

const capturePaymentAndFinalizeOrder = async (req, res) => {
  try {
    const { paymentId, payerId, orderId } = req.body;

    console.log("Finalizing fake payment:", { paymentId, payerId, orderId });

    let order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order can not be found",
      });
    }

    // For fake payments, the order should already be confirmed
    if (order.paymentStatus === "paid" && order.orderStatus === "confirmed") {
      return res.status(200).json({
        success: true,
        message: "Payment already processed - redirecting to course",
        data: order,
      });
    }

    // Update order status (though it should already be done in createOrder)
    order.paymentStatus = "paid";
    order.orderStatus = "confirmed";
    order.paymentId = paymentId;
    order.payerId = payerId;

    await order.save();

    res.status(200).json({
      success: true,
      message: "Fake payment confirmed successfully!",
      data: order,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Some error occurred!",
    });
  }
};

// Free course enrollment for testing
const createFreeOrder = async (req, res) => {
  try {
    const {
      userId,
      userName,
      userEmail,
      instructorId,
      instructorName,
      courseImage,
      courseTitle,
      courseId,
    } = req.body;

    console.log("Creating free order for:", { userId, courseId, courseTitle });

    // Create order record
    const freeOrder = new Order({
      userId,
      userName,
      userEmail,
      orderStatus: "confirmed",
      paymentMethod: "free",
      paymentStatus: "paid",
      orderDate: new Date(),
      paymentId: "FREE_" + Date.now(),
      payerId: "FREE_USER",
      instructorId,
      instructorName,
      courseImage,
      courseTitle,
      courseId,
      coursePricing: "0",
    });

    await freeOrder.save();

    // Update StudentCourses
    const studentCourses = await StudentCourses.findOne({ userId });

    if (studentCourses) {
      // Check if already enrolled
      const alreadyEnrolled = studentCourses.courses.find(
        (course) => course.courseId === courseId
      );
      
      if (!alreadyEnrolled) {
        studentCourses.courses.push({
          courseId,
          title: courseTitle,
          instructorId,
          instructorName,
          dateOfPurchase: new Date(),
          courseImage,
        });
        await studentCourses.save();
      }
    } else {
      const newStudentCourses = new StudentCourses({
        userId,
        courses: [{
          courseId,
          title: courseTitle,
          instructorId,
          instructorName,
          dateOfPurchase: new Date(),
          courseImage,
        }],
      });
      await newStudentCourses.save();
    }

    // Update Course students array
    await Course.findByIdAndUpdate(courseId, {
      $addToSet: {
        students: {
          studentId: userId,
          studentName: userName,
          studentEmail: userEmail,
          paidAmount: "0",
        },
      },
    });

    res.status(200).json({
      success: true,
      message: "Course enrolled successfully (free)",
      data: freeOrder,
    });

  } catch (error) {
    console.error("Error creating free order:", error);
    res.status(500).json({
      success: false,
      message: "Failed to enroll in course",
    });
  }
};

module.exports = { createOrder, capturePaymentAndFinalizeOrder, createFreeOrder };
