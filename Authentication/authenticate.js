const jwt = require('jsonwebtoken')

const auth = (req,res,next)=>{
    try {
        const token = req.header("Authorization")
        if(!token) return res.status(400).json({msg: "Invalid Authentication."})

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if(err) {return res.status(400).json({msg: "Invalid Authentication.Kindly Login"})}
            else{
             req.userid = decoded;                                                              //passing the userinfo=>gets the specific user loggedIn
             console.log(req.userid)
            //  req.user = user;
            next()
            }
        })
    } catch (err) { 
        return res.status(500).json({msg: err.message})
    }
}

module.exports = auth