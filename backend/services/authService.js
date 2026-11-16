/** Registration hashes passwords; login verifies credentials and signs a three-day identity token. */
const authRepository = require('../repositories/userRepository');
const appError = require('../utils/appError');
const {hashPassword,checkPassword} = require('../utils/bcrypt');
const {signToken} = require('../utils/jwt');
class authService{
    async register(name,email,password){
        const existing = await authRepository.findUserByEmail(email);
        if(existing){
            throw new appError("Email already in use",409) ;
        }
        const hashedPassword = await hashPassword(password);
        await authRepository.register(name,email,hashedPassword);
    }

    async login(email,password){

        const data = await authRepository.findUserByEmail(email);
        if(!data) throw new appError("User not found",404);

        const hashedPassword = data.password ;
        if(!(await checkPassword(password,hashedPassword))){
                throw new appError("Incorrect Password",401);
        }

        const payload = {id : data.id , email : data.email , name: data.name } ;
        const token = signToken(payload);
        return token;
    }
}

module.exports = new authService() ;
