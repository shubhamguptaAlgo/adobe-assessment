const resHndlr = require("../common/resHandler");
const hospitalRoutes = require('./hospitalRoute');
const departmentRoutes = require('./departmentRoute')
const baseUrl = require("../common/constant").BASE_URL;

//**************************************************************************************************** */




module.exports = function (app) {
    
    app.use(`${baseUrl}hospital`, hospitalRoutes);
    app.use(`${baseUrl}department`, departmentRoutes);
    app.use(resHndlr.handleError);

}
