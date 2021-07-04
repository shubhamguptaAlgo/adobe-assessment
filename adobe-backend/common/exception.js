const constants = require('./constant')
const message = require('./message')
//**************************************************************************************************** */

module.exports = {

  internlServerError(err) {

    console.log("erorr",err)
    return {
      error:err,
      errorCode: constants.STATUS_CODE.internal_server_error,
      errorMsg: message.intrnlServorError
    }
  },
  conflictError(errorMsg = '',err=null) {
    return {
      error:err,
      errorCode: constants.STATUS_CODE.conflict_error,
      errorMsg: errorMsg ? errorMsg : message.conflictError
    }
  },
  notFoundError(errorMsg = '',err=null) {
    return {
      error:err,
      errorCode: constants.STATUS_CODE.not_found,
      errorMsg: errorMsg ? errorMsg : message.notFound
    }
  },
  alreadyExistError(errMsg,err=null) {
    return {
      error:err,
      errorCode: constants.STATUS_CODE.already_exist,
      errorMsg: errMsg
    }
  },
 
  validationError(errMsg,err=null) {
    return {
      error:err,
      errorCode: constants.STATUS_CODE.bad_request,
      errorMsg: errMsg
    }
  },
  
}