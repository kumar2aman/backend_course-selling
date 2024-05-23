const mongoose = require('mongoose');
const { string } = require('zod');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/');

// Define schemas
const AdminSchema = new mongoose.Schema({
    // Schema definition here
    username:"string",
    password:"string"
});

const UserSchema = new mongoose.Schema({
    // Schema definition here
    username:"string",
    password:"string",
    purchasedcourse:[{

        type: mongoose.Schema.Types.ObjectId,
        ref:'Course'
    }
        
    ],
       
    
});

const CourseSchema = new mongoose.Schema({
    // Schema definition here
    title:"string",
    description: "string",
    price:"number"
});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

module.exports = {
    Admin,
    User,
    Course
}