const bodyParser = require("body-parser");
const morgan = require('morgan')
const utils = require("../common/utils");

//**************************************************************************************************** */

module.exports = function (app) {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(morgan('tiny'))
    app.use((req, res, next) => {
      utils.setCors(res);
      next();
    });
  
  };