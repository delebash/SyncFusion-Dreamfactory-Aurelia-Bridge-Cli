import {HttpClient, json} from 'aurelia-fetch-client';
import {inject} from 'aurelia-framework';
import Utils from './utils';
import dreamfactoryconfig from './dreamfactoryconfig';


let httpClient = new HttpClient();
httpClient.configure(config => {
  config
    .useStandardConfiguration();
    });

@inject(HttpClient)
export class DreamFactoryApi {
  constructor(http) {
    this.http = http;
  }
  login() {
    let that =this;
    this.http.fetch(dreamfactoryconfig.loginurl(), {
      method: "POST",
      body: json(dreamfactoryconfig.credentials())
    })
      .then(response => response.json())
      .then(data => {
        if(data.hasOwnProperty('session_token')) {
          Utils.setToken(dreamfactoryconfig.tokenKey, data.session_token);
          console.log(data);
         that.getdata();
        }
      });
  }

  getdata() {
    let token = Utils.getToken(dreamfactoryconfig.tokenKey);
      this.http.fetch(dreamfactoryconfig.dataurl(), {
      method: "POST",
      body: json(dreamfactoryconfig.credentials()),
      headers: new Headers({
        "X-DreamFactory-API-Key": dreamfactoryconfig.APP_API_KEY,
        "X-DreamFactory-Session-Token": token
      })
    })
      .then(response => response.json())
      .then(data => {
          console.log(data);
      })
  }
}
