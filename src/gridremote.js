
import {HttpClient, json} from 'aurelia-fetch-client';
import {Utils} from './utils';
import  dreamfactoryconfig from './dreamfactoryconfig';
import {inject} from 'aurelia-framework';

let httpClient = new HttpClient();
httpClient.configure(config => {
  config
    .useStandardConfiguration()
});

@inject(HttpClient)

export class GridRemote {
  constructor(http) {
    this.http = http;

  }

  created() {
    this.login()
  }

  login() {
    let that = this;
    this.http.fetch(dreamfactoryconfig.loginurl(), {
      method: "POST",
      body: json(dreamfactoryconfig.credentials())
    })
      .then(response => response.json())
      .then(data => {
        if (data.hasOwnProperty('session_token')) {
          Utils.setToken(dreamfactoryconfig.tokenKey, data.session_token);
          console.log(data);
             let dataManager = ej.DataManager({
              url: dreamfactoryconfig.dataurl,
              adaptor: new syncfusionDreamFactoryAdapter(),
              headers: [{"X-DreamFactory-API-Key": dreamfactoryconfig.APP_API_KEY, "X-DreamFactory-Session-Token": Utils.getToken(dreamfactoryconfig.tokenKey)}]
            });
          $("#Grid").ejGrid({
            dataSource: dataManager,
            allowPaging: true,
            allowSorting: true,
            allowFiltering: true,
            filterSettings: {showPredicate: true, filterType: "menu", enableCaseSensitivity: true},
            searchSettings: {ignoreCase: false},
            // filterSettings: { filterType: "menu" },

            columns: [{field: "id", headerText: "ID"},
              {field: "first_name", headerText: "First Nmae"},
              {field: "last_name", headerText: "Last Name"}
            ]
          })

        }
      });
  }

//   getdata() {
//     let adaptor = TestAdapter.getadapter();
//     let adap = new adaptor()
//     let OrdersList = ej.DataManager({
//       url: dreamfactoryconfig.dataurl,
//       adaptor: adap,
//       headers: [{"X-DreamFactory-API-Key": dreamfactoryconfig.APP_API_KEY, "X-DreamFactory-Session-Token": Utils.getToken(dreamfactoryconfig.tokenKey)}]
//     });
// return OrdersList
//
//   }
}
