export class App {
  configureRouter(config, router) {
    config.title = 'Aurelia';
    config.map([
      { route: ['welcome'], name: 'welcome',      moduleId: 'welcome',      nav: true, title: 'Welcome' },
      { route: 'users',         name: 'users',        moduleId: 'users',        nav: true, title: 'Github Users' },
      { route: 'grid',         name: 'grid',        moduleId: 'grid',        nav: true, title: 'Grid' },
      { route: 'button-test',         name: 'button-test',        moduleId: 'button-test',        nav: true, title: 'Button Test' },
      { route: 'dreamfactorytester', name: 'dreamfactorytester', moduleId: 'dreamfactorytester', nav: true, title: 'Dream Factory Tester' },
      { route: ['','gridremote'],         name: 'gridremote', moduleId: 'gridremote', nav: true, title: 'Grid Remote' },
      { route: 'child-router',  name: 'child-router', moduleId: 'child-router', nav: true, title: 'Child Router' }
    ]);

    this.router = router;
  }
}
