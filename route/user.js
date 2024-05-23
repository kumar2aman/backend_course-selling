const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require('../DB/index')

// User Routes
router.post('/signup', async (req, res) => {
    // Implement user signup logic
    const username = req.body.username
    const password = req.body.password

    await User.create({
        username,
        password
    })

    res.json({
        msg: "user has been created"
    })

});

router.get('/courses', async (req, res) => {
    // Implement listing all courses logic
    const response = await Course.find({})
    res.send(response)

});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic
    const courseId = req.params.courseId
    const username = req.headers.username
     await User.updateOne({
        username: username
    },{
       "$push":{
        purchasedcourse: courseId
       }
    }
    )

    res.json({
        msg:"you have purchased the course"
    })
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic

    const user = await User.findOne({
        username : req.headers.username
    })

    console.log(user.purchasedcourse)
const courses = await Course.find({
    _id:{
        "$in":user.purchasedcourse
    }
})
     res.json({
        courses: courses
     })

});
  

module.exports = router