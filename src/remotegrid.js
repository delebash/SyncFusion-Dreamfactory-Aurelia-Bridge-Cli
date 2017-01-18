import {inject} from 'aurelia-framework';
import {DreamFactoryApi} from './dreamfactory-api'
import {DreamfactorySyncfusionAdapter} from './dreamfactorysyncfusionadapter';
import {Utils} from './utils';
import  dreamfactoryconfig from './dreamfactoryconfig'

@inject(DreamFactoryApi)
export class RemoteGrid {
  constructor(dfapi) {
    this.dfapi = dfapi;
    this.login();
  }

  login() {
    this.dfapi.login().then(response => {
      if (response.session_id) {
        //We are logged in
        console.log(response)
      }
    })
  }


  attached() {
    let token = Utils.getToken(dreamfactoryconfig.tokenKey);

    let datamanager = ej.DataManager({
      url: dreamfactoryconfig.dataurl,
      adaptor: new DreamfactorySyncfusionAdapter,
      headers: [{"X-DreamFactory-API-Key": dreamfactoryconfig.APP_API_KEY, "X-DreamFactory-Session-Token": token}]
    });

    $("#Grid").ejGrid({
      dataSource: datamanager,
      allowPaging: true,
      allowSorting: true,
      isResponsive: true,
      columns: [
        {field: "OrderID", headerText: "Order ID", width: 75, textAlign: ej.TextAlign.Right},
        {field: "CustomerID", headerText: "Customer ID", width: 80},
        {field: "EmployeeID", headerText: "Employee ID", width: 75, textAlign: ej.TextAlign.Right, priority: 4},
        {field: "Freight", width: 75, format: "{0:C}", textAlign: ej.TextAlign.Right, priority: 3},
        {
          field: "OrderDate",
          headerText: "Order Date",
          width: 80,
          format: "{0:MM/dd/yyyy}",
          textAlign: ej.TextAlign.Right,
          priority: 2
        },
        {field: "ShipCity", headerText: "Ship City", width: 110, priority: 2}
      ]
    });
  }
}
