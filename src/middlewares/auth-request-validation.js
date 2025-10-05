const validateUserAuth=(req,res,next)=>{
    if(!req.body.email || !req.body.password){
        return res.status(400).json({
         success:false,
         data:{},
         message:"Something Went Wrong",
         err:"Email or Password is missing in SignUp request"
        })
    }
    next();
}
module.exports={
    validateUserAuth
}