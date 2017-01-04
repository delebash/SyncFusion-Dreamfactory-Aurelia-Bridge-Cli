import './jsondata';

export class Grid {
  constructor() {
    this.OrdersList = ej.DataManager(window.gridData).executeLocal(ej.Query().take(8)); // eslint-disable-line new-cap
    this.page = { pageSize: 4};
  }
}
