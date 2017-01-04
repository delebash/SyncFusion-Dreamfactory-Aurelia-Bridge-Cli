import {inject} from 'aurelia-framework'
import {DreamFactoryApi} from './dreamfactory-api'

@inject(DreamFactoryApi)
export class DreamfactoryTester{
  constructor(dfapi) {
    this.dfapi = dfapi;
  }
  login(){
  this.dfapi.login()
  }
}
