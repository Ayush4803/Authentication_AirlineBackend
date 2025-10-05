const jwt=require('jsonwebtoken')
const JWT_KEY = process.env.JWT_KEY;
const UserRepository = require('../repository/user-repository')
class UserService{
    constructor(){
        this.userRepository= new UserRepository();
    }

    async createuser(data){
       try {
         const user = await this.userRepository.createuser(data)
         return user;
       } catch (error) {
        console.log("Something went wrong in User Services")
        throw error;
       }
    }


     async deleteuser(userId){
        try {
            await this.userRepository.deleteuser(userId)
            return true;
        } catch (error) {
             console.log("Something went wrong in User Services")
        throw error;
        }
    }

    createToken(user){
       try {
        const result= jwt.sign(user, JWT_KEY, {expiresIn:'1h'});
        return result;
       } catch (error) {
        console.log("Something went wrong in token creation")
        throw error;
       }
    }

    verifyToken(token){
        try {
            const response= jwt.verify(token, JWT_KEY);
            return response;
        } catch (error) {
             console.log("Something went wrong in token validation,",error)
        throw error;
        }
    }
}

module.exports= UserService;