const { Router, response } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const {Admin, Course} =require("../DB/index")

// Admin Routes
router.post('/signup',  async (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;

    await Admin.create({
        username,
        password
    })

   res.json({
    msg:"admin create successfully"
   })

});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
    const title  = req.body.title
    const description  = req.body.description
    const price  = req.body.price

     const COURSE = await Course.create({
        title,
        description,
        price
    })

   // console.log(COURSE)
      res.json({
        msg:"course has been created seccessfully", courseId:COURSE._id
      })

});

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic
      const response =  await Course.find({})
      res.send(response)
});

module.exports = router;