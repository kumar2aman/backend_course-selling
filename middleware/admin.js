// Middleware for handling auth
const {Admin} =require("../DB")
async function  adminMiddleware  (req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const username = req.headers.username
    const password = req.headers.password

    const ADMIN = await Admin.findOne({
        username:username,
        password:password
    })

    if(ADMIN){
        next()
    }else{
        res.status(404).send({
            msg: "admin does not exist"
        })
    }
}

module.exports = adminMiddleware;