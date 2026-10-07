const express = require("express");
const students = require("../data/students");

const router = express.Router();


// GET /students
// Get all students
router.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        count: students.length,
        data: students
    });
});


// GET /students/:id
// Get student by ID
router.get("/:id", (req, res) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({
            success: false,
            message: "Student ID must be a number"
        });
    }

    const student = students.find(student => student.id === id);

    if (!student) {
        return res.status(404).json({
            success: false,
            message: "Student not found"
        });
    }

    res.status(200).json({
        success: true,
        data: student
    });
});


// POST /students
// Add a new student
router.post("/", (req, res) => {
    const { name, course, age, city } = req.body;

    if (!name || !course || !age || !city) {
        return res.status(400).json({
            success: false,
            message: "Name, course, age and city are required"
        });
    }

    const newStudent = {
        id: students.length > 0
            ? Math.max(...students.map(student => student.id)) + 1
            : 1,
        name: name,
        course: course,
        age: Number(age),
        city: city
    };

    students.push(newStudent);

    res.status(201).json({
        success: true,
        message: "Student created successfully",
        data: newStudent
    });
});


// PUT /students/:id
// Update a student
router.put("/:id", (req, res) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({
            success: false,
            message: "Student ID must be a number"
        });
    }

    const student = students.find(student => student.id === id);

    if (!student) {
        return res.status(404).json({
            success: false,
            message: "Student not found"
        });
    }

    const { name, course, age, city } = req.body;

    if (!name || !course || !age || !city) {
        return res.status(400).json({
            success: false,
            message: "Name, course, age and city are required"
        });
    }

    student.name = name;
    student.course = course;
    student.age = Number(age);
    student.city = city;

    res.status(200).json({
        success: true,
        message: "Student updated successfully",
        data: student
    });
});


// DELETE /students/:id
// Delete a student
router.delete("/:id", (req, res) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({
            success: false,
            message: "Student ID must be a number"
        });
    }

    const studentIndex = students.findIndex(
        student => student.id === id
    );

    if (studentIndex === -1) {
        return res.status(404).json({
            success: false,
            message: "Student not found"
        });
    }

    const deletedStudent = students.splice(studentIndex, 1);

    res.status(200).json({
        success: true,
        message: "Student deleted successfully",
        data: deletedStudent[0]
    });
});


module.exports = router;