# MERN-LMS Seed Data

This seed file populates your MongoDB database with comprehensive test data for all models in the MERN-LMS application.

## 🗂️ What Gets Seeded

### 👥 **Users (9 total)**
- **3 Instructors**:
  - John Smith (john.instructor@example.com)
  - Sarah Johnson (sarah.instructor@example.com)
  - Michael Brown (michael.instructor@example.com)

- **6 Students**:
  - Alice Wilson (alice.student@example.com)
  - Bob Davis (bob.student@example.com)
  - Emma Garcia (emma.student@example.com)
  - David Martinez (david.student@example.com)
  - Lisa Anderson (lisa.student@example.com)
  - James Taylor (james.student@example.com)

**Password for all users**: `password123`

### 📚 **Courses (5 total)**
1. **Complete React Development Bootcamp** (John Smith)
   - 3 enrolled students
   - 5 curriculum videos
   - Price: ₹2999

2. **Node.js Backend Masterclass** (John Smith)
   - 2 enrolled students
   - 3 curriculum videos
   - Price: ₹3499

3. **Python Data Science Complete Course** (Sarah Johnson)
   - 2 enrolled students
   - 3 curriculum videos
   - Price: ₹2799

4. **AWS Cloud Computing Essentials** (Michael Brown)
   - 1 enrolled student
   - 2 curriculum videos
   - Price: ₹4299

5. **Cybersecurity Fundamentals** (Michael Brown)
   - 0 enrolled students
   - 2 curriculum videos
   - Price: ₹3999

### 🛒 **Orders (4 total)**
- Completed purchase orders matching the enrolled students

### 🎓 **Student Courses (6 total)**
- Student enrollment records for purchased courses

### 📈 **Course Progress (2 total)**
- Progress tracking for some students

## 🚀 How to Run

1. **Make sure your `.env` file has the correct MongoDB connection string**:
   ```
   MONGO_URI=your_mongodb_connection_string
   ```

2. **Navigate to the server directory**:
   ```bash
   cd server
   ```

3. **Run the seed command**:
   ```bash
   npm run seed
   ```

4. **Watch the console output** for confirmation:
   ```
   🌱 Starting database seeding...
   ✅ MongoDB Connected Successfully
   🧹 Database cleared successfully
   👥 Users seeded successfully
   📚 Courses seeded successfully
   🛒 Orders seeded successfully
   🎓 Student Courses seeded successfully
   📈 Course Progress seeded successfully

   🎉 Database seeding completed successfully!
   ```

## 🧪 Testing Scenarios

### **Instructor Dashboard Testing**
1. Login as `john.instructor@example.com`
2. Check dashboard shows:
   - Total Students: 5
   - Total Revenue: ₹14,995
   - Student list with names and emails

### **Student Purchase Testing**
1. Login as any student account
2. Browse available courses
3. Purchase a new course
4. Login as the instructor to see updated dashboard

### **Course Management Testing**
1. Login as any instructor
2. View your courses in the "Courses" tab
3. Edit course details
4. Create new courses

## ⚠️ Important Notes

- **This will CLEAR ALL existing data** in your database before seeding
- The seed data includes sample video URLs (you may want to replace with real videos)
- All users have the same password for testing convenience
- Course images use Unsplash URLs

## 🔄 Re-running Seeds

You can run `npm run seed` multiple times. It will:
1. Clear all existing data
2. Create fresh seed data
3. Maintain consistent relationships between models

## 🎯 Perfect for Testing

This seed data is designed to test:
- ✅ Instructor dashboard student lists
- ✅ Revenue calculations
- ✅ Student course purchases
- ✅ Course enrollment tracking
- ✅ Authentication flows
- ✅ Course management
- ✅ Progress tracking
