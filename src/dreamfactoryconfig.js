export default {
  //--------------------------------------------------------------------------
//  DreamFactory 2.0 instance specific constants
//--------------------------------------------------------------------------
  INSTANCE_URL:'https://api.ageektech.com',
  APP_API_KEY: 'db1f5534d2ce698bdb15d25a9f5e665e62abf2ee7b940878bba19a95fe3ed39b',
  email:'support@ageektech.com',
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
