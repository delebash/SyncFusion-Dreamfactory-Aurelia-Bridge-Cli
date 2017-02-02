export default {
  //--------------------------------------------------------------------------
//  DreamFactory 2.0 instance specific constants
//--------------------------------------------------------------------------
  INSTANCE_URL:'https://api.ageektech.com',
  APP_API_KEY: 'e36139937010dae37c94ffee331f2acae9989a9a04211bc5025f3a1d5d7d2e36',
  email:'test@ageektech.com',
  password: 'test12345',
  api: '/api/v2/',
  db:'northwind/',
  service:'_table/',
  serviceObject:'customers',
  tokenKey: 'token',
  overrideMethod:'?method=GET',
  dataurl: function () {
  return this.INSTANCE_URL + this.api + this.db + this.service + this.serviceObject + this.overrideMethod;
},
  loginurl: function () {
    return this.INSTANCE_URL + '/api/v2/user/session'
  },
  credentials: function () {
    return {email:this.email, password:this.password}
  }
};
