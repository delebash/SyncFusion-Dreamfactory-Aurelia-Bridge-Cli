export class App {
  configureRouter(config, router) {
    config.title = 'Aurelia';
    config.map([
      { route: ['', 'welcome'], name: 'welcome',      moduleId: 'welcome',      nav: true, title: 'Welcome' },
      { route: 'localgrid',         name: 'localgrid',        moduleId: 'localgrid',        nav: true, title: 'Local Grid' },
      { route: 'remotegrid',         name: 'remotegrid',        moduleId: 'remotegrid',        nav: true, title: 'Remote Grid' },
      { route: 'dreamfactorytestconnection', name: 'dreamfactorytestconnection', moduleId: 'dreamfactorytestconnection', nav: true, title: 'Test DreamFactory Connection' }
      ]);
    this.router = router;
  }
}
