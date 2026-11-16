/** Forward rejected asynchronous route handlers to the centralized Express error middleware. */
const asyncHandler = (fn) =>{

    return (req,res,next) => {
        Promise
            .resolve(fn(req,res,next))
            .catch(next);
    }
}

module.exports = asyncHandler ;
