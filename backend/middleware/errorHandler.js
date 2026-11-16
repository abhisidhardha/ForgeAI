/** Serialize service errors as { message }; unknown errors currently expose their message too. */
const  errorHandler = (err,req,res,next) => {
    const statusCode = err.statusCode || 500 ;
    console.log(statusCode);
    console.error("Error:", err.message);
    return res.status(statusCode).json({message:err.message || 'Internal Server Error'});
}

module.exports = errorHandler ;
