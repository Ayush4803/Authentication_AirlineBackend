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
 const validateIsAdminRequest=(req,res,next)=>{
       if(!req.body.id){
        return res.status(400).json({
         success:false,
         data:{},
         message:"Something Went Wrong",
         err:"User Id is Not Given"
        })
    }
    next();
    }
module.exports={
    validateUserAuth,
    validateIsAdminRequest
}