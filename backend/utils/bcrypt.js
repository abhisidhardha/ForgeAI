/** Password hashing and comparison; BCRYPT_SALT configures the bcrypt work factor, not a literal salt. */
const bcrypt = require('bcryptjs');

const saltRounds = parseInt(process.env.BCRYPT_SALT) ;

const hashPassword = async(password) =>  await bcrypt.hash(password,saltRounds);


const checkPassword = async(inputPassword,hashedPassword) => {
    try{
        return await bcrypt.compare(inputPassword,hashedPassword);
    }catch(err){
        console.error("Error while comparing passwords",err);
        throw err ;
    }
}

module.exports = {hashPassword,checkPassword} ;
