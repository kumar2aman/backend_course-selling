
const {User } =require("../DB")


 async function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    const username = req.headers.username
    const password = req.headers.password

    const USER = await User.findOne({
        username:username,
        password:password
    })

    if(USER){
        next()
    }else{
        res.status(404).send({
            msg: "admin does not exist"
        })
    }
}



module.exports = userMiddleware;