import Papa from './vendor/papa';
import feather from 'feather-icons';
import ViewController from './src/controller/view';

class App {
  constructor() {
    this.viewController = new ViewController();
    this.viewController.init();
  }
}

window.addEventListener('load', () => {
  window.Papa = Papa;
  feather.replace();
  new App();
});
