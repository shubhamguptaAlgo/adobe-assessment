const RESPONSE_STATUS = require('./constant').RESPONSE_STATUS
const constants = require('./constant');
const exceptions = require('./exception')

//**************************************************************************************************** */

/**
 * Common method to return the reposne of API
 * @param res the type of Response
 * @param response the actual response needs to return
 * @returns json with status
 */
function sendResponse(res, response) {

    if (response  && (response.status_code == 500)) { 
        return res.send(500, response);
    }
    else if (response  && (response.status_code == 409)) { 
        return res.send(409, response);
    }
    else if (response  && (response.status_code == 404)) { 
        return res.send(404, response);
    }
    else if (response  && (response.status_code == 403)) { 
        return res.send(403, response);
    }
    else if (response  && (response.status_code == 401)) { 
        return res.send(401, response);
    }
    else if (response  && (response.status_code == 400)) { 
        return res.send(400, response);
    }
    
    return res.send(200, response);// send success response
}

// This method redirect towards sendError method for error handling.
function handleError(err, req, res, next) {
    sendError(res, err);
}

/**
 * Handles the error response
 * @param res the type of Response
 * @param err the error which occured
 * @returns json with status
 */
function sendError(res, err) {
    if (!err.errorCode) {
        console.log("error", err)
        err = exceptions.internlServerError(err);

    }
    const response = createResponse(RESPONSE_STATUS.failure, err);
    sendResponse(res, response);
}


/**
 * Handles the success response
 * @param res the type of Response
 * @param result the json data
 * @returns json with status
 */
function sendSuccess(res, result = {}, msg = '') {
    const response = createResponse(RESPONSE_STATUS.success, result, msg)
    sendResponse(res, response);
}

/**
 * Prepare response which needs to return
 * @param status the status of Response
 * @param result the json data
 * @param msg the message which needs to return
 * @returns response object
 */
function createResponse(status, result, msg = '') {
    let responseObj;
    if (result.message)
        delete result.message

    if (status == RESPONSE_STATUS.success) {
        responseObj = {
            success: RESPONSE_STATUS.success,
            message: msg,
            status_code:constants.STATUS_CODE.success,
            data: result ? result : {},
            time: Date.now()
        }
    } else {
        responseObj = {
            success: RESPONSE_STATUS.failure,
            message: result.errorMsg,
            status_code:result.errorCode,
            error: result.error ? result.error : {},
            time: Date.now()
        }
    }
    return responseObj;
}


//**************************************************************************************************** */

module.exports = {
    sendResponse,
    handleError,
    sendError,
    sendSuccess
}