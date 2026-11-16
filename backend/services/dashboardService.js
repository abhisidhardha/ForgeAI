/** Dashboard service boundary, keeping controllers independent of report SQL. */
const dashboardRepository = require('../repositories/dashboardRepository');

class dashboardService{
    async getReports(ownerId){
        const reportData = await dashboardRepository.getReports(ownerId);
        return reportData ;
    }
}

module.exports = new dashboardService();
