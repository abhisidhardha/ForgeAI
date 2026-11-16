/** Return the current user's dashboard report in the standard message/data envelope. */
const dashboardService = require("../services/dashboardService");


class dashboardController{
    async getReports(req,res){
        const ownerId = req.user.id ;
        if(!ownerId){
            return res.status(401).json({message : "User ID is required"}) ;
        }
        const data = await dashboardService.getReports(ownerId);
        return res.status(200).json({message : "Dashboard report fetched successfully" , data : data});
    };

}

module.exports = new dashboardController();
