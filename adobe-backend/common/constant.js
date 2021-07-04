const BASE_URL = "/adobe/"
const RESPONSE_STATUS = {
  failure: false,
  success: true
}
const STATUS_CODE = {
    success: 200,
    bad_request: 400,
    unauthorized_access: 401,
    already_exist: 403,
    not_found: 404,
    conflict_error: 409,
    internal_server_error: 500
}

  module.exports = {
    BASE_URL,
    STATUS_CODE,
    RESPONSE_STATUS
  }
  