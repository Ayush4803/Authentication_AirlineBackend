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
}

module.exports= UserService;