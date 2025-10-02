require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Import Models
const User = require("./models/User");
const Course = require("./models/Course");
const Order = require("./models/Order");
const StudentCourses = require("./models/StudentCourses");
const CourseProgress = require("./models/CourseProgress");

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error);
    process.exit(1);
  }
};

// Clear all existing data
const clearDatabase = async () => {
  try {
    await User.deleteMany({});
    await Course.deleteMany({});
    await Order.deleteMany({});
    await StudentCourses.deleteMany({});
    await CourseProgress.deleteMany({});
    console.log("🧹 Database cleared successfully");
  } catch (error) {
    console.error("❌ Error clearing database:", error);
  }
};

// Seed Users
const seedUsers = async () => {
  try {
    const hashedPassword = await bcrypt.hash("password123", 12);
    
    const users = [
      // Instructors
      {
        userName: "John Smith",
        userEmail: "john.instructor@example.com",
        password: hashedPassword,
        role: "instructor",
      },
      {
        userName: "Sarah Johnson",
        userEmail: "sarah.instructor@example.com",
        password: hashedPassword,
        role: "instructor",
      },
      {
        userName: "Michael Brown",
        userEmail: "michael.instructor@example.com",
        password: hashedPassword,
        role: "instructor",
      },
      // Students
      {
        userName: "Alice Wilson",
        userEmail: "alice.student@example.com",
        password: hashedPassword,
        role: "user",
      },
      {
        userName: "Bob Davis",
        userEmail: "bob.student@example.com",
        password: hashedPassword,
        role: "user",
      },
      {
        userName: "Emma Garcia",
        userEmail: "emma.student@example.com",
        password: hashedPassword,
        role: "user",
      },
      {
        userName: "David Martinez",
        userEmail: "david.student@example.com",
        password: hashedPassword,
        role: "user",
      },
      {
        userName: "Lisa Anderson",
        userEmail: "lisa.student@example.com",
        password: hashedPassword,
        role: "user",
      },
      {
        userName: "James Taylor",
        userEmail: "james.student@example.com",
        password: hashedPassword,
        role: "user",
      },
    ];

    const createdUsers = await User.insertMany(users);
    console.log("👥 Users seeded successfully");
    return createdUsers;
  } catch (error) {
    console.error("❌ Error seeding users:", error);
  }
};

// Seed Courses
const seedCourses = async (users) => {
  try {
    const instructors = users.filter(user => user.role === "instructor");
    const students = users.filter(user => user.role === "user");
    
    const courses = [
      // John Smith's Courses
      {
        instructorId: instructors[0]._id.toString(),
        instructorName: instructors[0].userName,
        date: new Date("2024-01-15"),
        title: "Complete React Development Bootcamp",
        category: "web-development",
        level: "intermediate",
        primaryLanguage: "english",
        subtitle: "Master React from basics to advanced concepts",
        description: "Learn React.js from scratch with hands-on projects, hooks, context API, and modern development practices.",
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=500",
        welcomeMessage: "Welcome to the most comprehensive React course!",
        pricing: 2999,
        objectives: "Build modern web applications,Master React hooks,Understand state management,Create responsive UIs,Deploy React apps",
        students: [
          {
            studentId: students[0]._id.toString(),
            studentName: students[0].userName,
            studentEmail: students[0].userEmail,
            paidAmount: "2999",
          },
          {
            studentId: students[1]._id.toString(),
            studentName: students[1].userName,
            studentEmail: students[1].userEmail,
            paidAmount: "2999",
          },
          {
            studentId: students[2]._id.toString(),
            studentName: students[2].userName,
            studentEmail: students[2].userEmail,
            paidAmount: "2999",
          },
        ],
        curriculum: [
          {
            title: "Introduction to React",
            videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
            public_id: "sample_intro_react",
            freePreview: true,
          },
          {
            title: "Components and JSX",
            videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4",
            public_id: "sample_components_jsx",
            freePreview: false,
          },
          {
            title: "State and Props",
            videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
            public_id: "sample_state_props",
            freePreview: false,
          },
          {
            title: "React Hooks",
            videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4",
            public_id: "sample_hooks",
            freePreview: false,
          },
          {
            title: "Context API",
            videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
            public_id: "sample_context",
            freePreview: false,
          },
        ],
        isPublised: true,
      },
      {
        instructorId: instructors[0]._id.toString(),
        instructorName: instructors[0].userName,
        date: new Date("2024-02-01"),
        title: "Node.js Backend Masterclass",
        category: "backend-development",
        level: "advanced",
        primaryLanguage: "english",
        subtitle: "Build scalable backend applications with Node.js",
        description: "Learn to build robust backend APIs with Node.js, Express, MongoDB, and authentication.",
        image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=500",
        welcomeMessage: "Welcome to the ultimate Node.js backend course!",
        pricing: 3499,
        objectives: "Build REST APIs,Implement authentication,Database integration,Error handling,Deploy to production",
        students: [
          {
            studentId: students[3]._id.toString(),
            studentName: students[3].userName,
            studentEmail: students[3].userEmail,
            paidAmount: "3499",
          },
          {
            studentId: students[4]._id.toString(),
            studentName: students[4].userName,
            studentEmail: students[4].userEmail,
            paidAmount: "3499",
          },
        ],
        curriculum: [
          {
            title: "Node.js Fundamentals",
            videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
            public_id: "sample_node_fundamentals",
            freePreview: true,
          },
          {
            title: "Express.js Setup",
            videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4",
            public_id: "sample_express_setup",
            freePreview: false,
          },
          {
            title: "Database Integration",
            videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
            public_id: "sample_database",
            freePreview: false,
          },
        ],
        isPublised: true,
      },
      // Sarah Johnson's Courses
      {
        instructorId: instructors[1]._id.toString(),
        instructorName: instructors[1].userName,
        date: new Date("2024-01-20"),
        title: "Python Data Science Complete Course",
        category: "data-science",
        level: "beginner",
        primaryLanguage: "english",
        subtitle: "Learn data science with Python from scratch",
        description: "Master data science using Python, pandas, numpy, matplotlib, and machine learning basics.",
        image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=500",
        welcomeMessage: "Welcome to your data science journey!",
        pricing: 2799,
        objectives: "Python programming,Data manipulation,Data visualization,Statistical analysis,Machine learning basics",
        students: [
          {
            studentId: students[0]._id.toString(),
            studentName: students[0].userName,
            studentEmail: students[0].userEmail,
            paidAmount: "2799",
          },
          {
            studentId: students[5]._id.toString(),
            studentName: students[5].userName,
            studentEmail: students[5].userEmail,
            paidAmount: "2799",
          },
        ],
        curriculum: [
          {
            title: "Python Basics for Data Science",
            videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
            public_id: "sample_python_basics",
            freePreview: true,
          },
          {
            title: "Working with Pandas",
            videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4",
            public_id: "sample_pandas",
            freePreview: false,
          },
          {
            title: "Data Visualization",
            videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
            public_id: "sample_visualization",
            freePreview: false,
          },
        ],
        isPublised: true,
      },
      // Michael Brown's Courses
      {
        instructorId: instructors[2]._id.toString(),
        instructorName: instructors[2].userName,
        date: new Date("2024-02-10"),
        title: "AWS Cloud Computing Essentials",
        category: "cloud-computing",
        level: "intermediate",
        primaryLanguage: "english",
        subtitle: "Master AWS cloud services and deployment",
        description: "Learn to deploy and manage applications on AWS cloud platform with hands-on projects.",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500",
        welcomeMessage: "Welcome to the cloud computing world!",
        pricing: 4299,
        objectives: "AWS services,Cloud deployment,Serverless computing,Database management,Security best practices",
        students: [
          {
            studentId: students[1]._id.toString(),
            studentName: students[1].userName,
            studentEmail: students[1].userEmail,
            paidAmount: "4299",
          },
        ],
        curriculum: [
          {
            title: "AWS Introduction",
            videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
            public_id: "sample_aws_intro",
            freePreview: true,
          },
          {
            title: "EC2 and Deployment",
            videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4",
            public_id: "sample_ec2",
            freePreview: false,
          },
        ],
        isPublised: true,
      },
      {
        instructorId: instructors[2]._id.toString(),
        instructorName: instructors[2].userName,
        date: new Date("2024-02-15"),
        title: "Cybersecurity Fundamentals",
        category: "cyber-security",
        level: "beginner",
        primaryLanguage: "english",
        subtitle: "Essential cybersecurity concepts and practices",
        description: "Learn cybersecurity fundamentals, threat detection, and security best practices.",
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=500",
        welcomeMessage: "Welcome to cybersecurity mastery!",
        pricing: 3999,
        objectives: "Security fundamentals,Threat analysis,Network security,Incident response,Risk management",
        students: [],
        curriculum: [
          {
            title: "Introduction to Cybersecurity",
            videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
            public_id: "sample_cybersecurity_intro",
            freePreview: true,
          },
          {
            title: "Network Security Basics",
            videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4",
            public_id: "sample_network_security",
            freePreview: false,
          },
        ],
        isPublised: true,
      },
    ];

    const createdCourses = await Course.insertMany(courses);
    console.log("📚 Courses seeded successfully");
    return createdCourses;
  } catch (error) {
    console.error("❌ Error seeding courses:", error);
  }
};

// Seed Orders
const seedOrders = async (users, courses) => {
  try {
    const students = users.filter(user => user.role === "user");
    
    const orders = [
      {
        userId: students[0]._id.toString(),
        userName: students[0].userName,
        userEmail: students[0].userEmail,
        orderStatus: "confirmed",
        paymentMethod: "paypal",
        paymentStatus: "paid",
        orderDate: new Date("2024-01-16"),
        paymentId: "PAY-123456789",
        payerId: "PAYER123",
        instructorId: courses[0].instructorId,
        instructorName: courses[0].instructorName,
        courseImage: courses[0].image,
        courseTitle: courses[0].title,
        courseId: courses[0]._id.toString(),
        coursePricing: "2999",
      },
      {
        userId: students[1]._id.toString(),
        userName: students[1].userName,
        userEmail: students[1].userEmail,
        orderStatus: "confirmed",
        paymentMethod: "paypal",
        paymentStatus: "paid",
        orderDate: new Date("2024-01-17"),
        paymentId: "PAY-987654321",
        payerId: "PAYER456",
        instructorId: courses[0].instructorId,
        instructorName: courses[0].instructorName,
        courseImage: courses[0].image,
        courseTitle: courses[0].title,
        courseId: courses[0]._id.toString(),
        coursePricing: "2999",
      },
      {
        userId: students[2]._id.toString(),
        userName: students[2].userName,
        userEmail: students[2].userEmail,
        orderStatus: "confirmed",
        paymentMethod: "paypal",
        paymentStatus: "paid",
        orderDate: new Date("2024-01-18"),
        paymentId: "PAY-111222333",
        payerId: "PAYER789",
        instructorId: courses[0].instructorId,
        instructorName: courses[0].instructorName,
        courseImage: courses[0].image,
        courseTitle: courses[0].title,
        courseId: courses[0]._id.toString(),
        coursePricing: "2999",
      },
      {
        userId: students[3]._id.toString(),
        userName: students[3].userName,
        userEmail: students[3].userEmail,
        orderStatus: "confirmed",
        paymentMethod: "paypal",
        paymentStatus: "paid",
        orderDate: new Date("2024-02-02"),
        paymentId: "PAY-444555666",
        payerId: "PAYER101",
        instructorId: courses[1].instructorId,
        instructorName: courses[1].instructorName,
        courseImage: courses[1].image,
        courseTitle: courses[1].title,
        courseId: courses[1]._id.toString(),
        coursePricing: "3499",
      },
    ];

    const createdOrders = await Order.insertMany(orders);
    console.log("🛒 Orders seeded successfully");
    return createdOrders;
  } catch (error) {
    console.error("❌ Error seeding orders:", error);
  }
};

// Seed Student Courses
const seedStudentCourses = async (users, courses) => {
  try {
    const students = users.filter(user => user.role === "user");
    
    const studentCourses = [
      {
        userId: students[0]._id.toString(),
        courses: [
          {
            courseId: courses[0]._id.toString(),
            title: courses[0].title,
            instructorId: courses[0].instructorId,
            instructorName: courses[0].instructorName,
            dateOfPurchase: new Date("2024-01-16"),
            courseImage: courses[0].image,
          },
          {
            courseId: courses[2]._id.toString(),
            title: courses[2].title,
            instructorId: courses[2].instructorId,
            instructorName: courses[2].instructorName,
            dateOfPurchase: new Date("2024-01-21"),
            courseImage: courses[2].image,
          },
        ],
      },
      {
        userId: students[1]._id.toString(),
        courses: [
          {
            courseId: courses[0]._id.toString(),
            title: courses[0].title,
            instructorId: courses[0].instructorId,
            instructorName: courses[0].instructorName,
            dateOfPurchase: new Date("2024-01-17"),
            courseImage: courses[0].image,
          },
          {
            courseId: courses[3]._id.toString(),
            title: courses[3].title,
            instructorId: courses[3].instructorId,
            instructorName: courses[3].instructorName,
            dateOfPurchase: new Date("2024-02-11"),
            courseImage: courses[3].image,
          },
        ],
      },
      {
        userId: students[2]._id.toString(),
        courses: [
          {
            courseId: courses[0]._id.toString(),
            title: courses[0].title,
            instructorId: courses[0].instructorId,
            instructorName: courses[0].instructorName,
            dateOfPurchase: new Date("2024-01-18"),
            courseImage: courses[0].image,
          },
        ],
      },
      {
        userId: students[3]._id.toString(),
        courses: [
          {
            courseId: courses[1]._id.toString(),
            title: courses[1].title,
            instructorId: courses[1].instructorId,
            instructorName: courses[1].instructorName,
            dateOfPurchase: new Date("2024-02-02"),
            courseImage: courses[1].image,
          },
        ],
      },
      {
        userId: students[4]._id.toString(),
        courses: [
          {
            courseId: courses[1]._id.toString(),
            title: courses[1].title,
            instructorId: courses[1].instructorId,
            instructorName: courses[1].instructorName,
            dateOfPurchase: new Date("2024-02-03"),
            courseImage: courses[1].image,
          },
        ],
      },
      {
        userId: students[5]._id.toString(),
        courses: [
          {
            courseId: courses[2]._id.toString(),
            title: courses[2].title,
            instructorId: courses[2].instructorId,
            instructorName: courses[2].instructorName,
            dateOfPurchase: new Date("2024-01-22"),
            courseImage: courses[2].image,
          },
        ],
      },
    ];

    const createdStudentCourses = await StudentCourses.insertMany(studentCourses);
    console.log("🎓 Student Courses seeded successfully");
    return createdStudentCourses;
  } catch (error) {
    console.error("❌ Error seeding student courses:", error);
  }
};

// Seed Course Progress
const seedCourseProgress = async (users, courses) => {
  try {
    const students = users.filter(user => user.role === "user");
    
    const courseProgress = [
      {
        userId: students[0]._id.toString(),
        courseId: courses[0]._id.toString(),
        completed: false,
        lecturesProgress: [
          {
            lectureId: "sample_intro_react",
            viewed: true,
            dateViewed: new Date("2024-01-16"),
          },
          {
            lectureId: "sample_components_jsx",
            viewed: true,
            dateViewed: new Date("2024-01-17"),
          },
        ],
      },
      {
        userId: students[1]._id.toString(),
        courseId: courses[0]._id.toString(),
        completed: true,
        completionDate: new Date("2024-01-25"),
        lecturesProgress: [
          {
            lectureId: "sample_intro_react",
            viewed: true,
            dateViewed: new Date("2024-01-17"),
          },
          {
            lectureId: "sample_components_jsx",
            viewed: true,
            dateViewed: new Date("2024-01-18"),
          },
          {
            lectureId: "sample_state_props",
            viewed: true,
            dateViewed: new Date("2024-01-20"),
          },
          {
            lectureId: "sample_hooks",
            viewed: true,
            dateViewed: new Date("2024-01-23"),
          },
          {
            lectureId: "sample_context",
            viewed: true,
            dateViewed: new Date("2024-01-25"),
          },
        ],
      },
    ];

    const createdCourseProgress = await CourseProgress.insertMany(courseProgress);
    console.log("📈 Course Progress seeded successfully");
    return createdCourseProgress;
  } catch (error) {
    console.error("❌ Error seeding course progress:", error);
  }
};

// Main seeding function
const seedDatabase = async () => {
  try {
    console.log("🌱 Starting database seeding...");
    
    await connectDB();
    await clearDatabase();
    
    const users = await seedUsers();
    const courses = await seedCourses(users);
    const orders = await seedOrders(users, courses);
    const studentCourses = await seedStudentCourses(users, courses);
    const courseProgress = await seedCourseProgress(users, courses);
    
    console.log("\n🎉 Database seeding completed successfully!");
    console.log("\n📊 Summary:");
    console.log(`👥 Users: ${users.length}`);
    console.log(`📚 Courses: ${courses.length}`);
    console.log(`🛒 Orders: ${orders.length}`);
    console.log(`🎓 Student Courses: ${studentCourses.length}`);
    console.log(`📈 Course Progress: ${courseProgress.length}`);
    
    console.log("\n🔑 Test Credentials:");
    console.log("Instructors:");
    console.log("- john.instructor@example.com / password123");
    console.log("- sarah.instructor@example.com / password123");
    console.log("- michael.instructor@example.com / password123");
    console.log("\nStudents:");
    console.log("- alice.student@example.com / password123");
    console.log("- bob.student@example.com / password123");
    console.log("- emma.student@example.com / password123");
    
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
};

// Run the seeding
seedDatabase();
