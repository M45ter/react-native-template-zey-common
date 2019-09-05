/**
 * @format
 */
export default class ApiException {
  static ERROR_NULL = 1;
  static ERROR_FALSE = 2;
  static ERROR_TOKEN_EXPIRED = 3;
  static ERROR_CONNECT = 4;
  static ERROR_NETWORK = 5;
  static ERROR_PARSE = 6;
  static ERROR_SSL = 7;
  static ERROR_UNKNOWN = 9999;

  constructor(code, message) {
    this.code = code;
    this.message = message;
  }

  toString() {
    return 'code: ' + this.code + ', message: ' + this.message;
  }
}
