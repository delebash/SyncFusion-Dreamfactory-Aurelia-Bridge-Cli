import environment from './environment';
import 'bootstrap';
import 'ejButton'
import 'ejCheckBox'
//import '../node_modules/aurelia-syncfusion-bridge/vendors/css/web/default-theme/ej.web.all.min.css/'
//Configure Bluebird Promises.
Promise.config({
  longStackTraces: environment.debug,
  warnings: {
    wForgottenReturn: false
  }
});

export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .feature('resources');

  if (environment.debug) {
    aurelia.use.developmentLogging();
  }

  if (environment.testing) {
    aurelia.use.plugin('aurelia-testing');
  }

  aurelia.start().then(() => aurelia.setRoot());
}
