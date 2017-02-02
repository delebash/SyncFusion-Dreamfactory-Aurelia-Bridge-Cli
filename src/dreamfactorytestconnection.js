import {inject} from 'aurelia-framework'
import {DreamFactoryApi} from './dreamfactory-api'

@inject(DreamFactoryApi)
export class DreamFactoryTestConnection {
  constructor(dfapi) {
    this.dfapi = dfapi;
    this.username = null;
    this.gotdata = null;

    this.dfapi.login().then(response => {
      if (response.session_id) {
        this.username = response.name;

        this.dfapi.getdata().then(response => {
          if (response.resource.length > 0) {
            this.gotdata = true
          }
        })
      }
    })
  }

}
// load(){
//   this.dfapi.login().then(response => {
//     this.username = response.name
//     if (this.username){
//       this.dfapi.getdata().then(response => {
//         this.customers = response.resource
//       })
//     }
//   })
// }
