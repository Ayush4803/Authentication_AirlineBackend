const {User} = require('../models/index')


class UserRepository{
   async createuser(data){
    try {
        const user= await User.create(data)
        return user;
    } catch (error) {
         console.log("Something Went Wrong in User Repository")
        throw error;
    }
   }


   async deleteuser(userId){
    try {
       await User.destroy({where:{
        id:userId
       }})
        return true;
    } catch (error) {
        console.log("Something Went Wrong in User Repository layer")
        throw error;
    }
   }

   async getUser(userId){
      try {
        const user = await User.findbyPk(userId,{
            attributes:['email']
        })
        return user;
      } catch (error) {
        console.log("Something Went Wrong in User Repository")
        throw error;
      }
   }
   async getByEmail(userEmail){
    try {
      const user = await User.findOne({where:{
        email:userEmail
      }});
      return user;
    } catch (error) {
      console.log("Something Went Wrong in User Repository")
        throw error;
    }
   }
}
module.exports= UserRepository;