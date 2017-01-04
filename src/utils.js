//--------------------------------------------------------------------------
//  Misc functions
//--------------------------------------------------------------------------
export class Utils {

  static setToken(key, value) {
    sessionStorage.setItem(key, value);
  }

  static getToken(key) {
    return sessionStorage.getItem(key);
  }
  removeToken(key) {
    $.api.logout(function (data) {
      if (data.success) {
        sessionStorage.removeItem(key);
        // $.route('index');
      }
      else {
        let response = parseResponse(data);
        messageBox(response.code, response.message, response.error);
      }
    });
  }
}
