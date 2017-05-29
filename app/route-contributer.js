import './pages/my-component-page.tag';
import './pages/typicode-user-detail.tag';
import './pages/home.tag';

export default class RouteContributer {

  constructor() {
    var self = this;

    riot.observable(self);
    self.name = 'RouteContributer';
    self._initializeViewSet();

    this.initialize();
  }

  _initializeViewSet() {
    var self = this;

    self._viewsSet = new Set();
    let s = self._viewsSet;

    s.add('home');
    s.add('my-component-page');
    s.add('typicode-user-detail');
    self.views = Array.from(s);
    self.defaultRoute = '/my-component-page/home';
  }
  uninitialize() {

  }
  initialize() {

  }
  contributeRoutes(r) {
    var self = this;

    console.log(self.name, riot.EVT.router.out.contributeRoutes, r);
    r('/my-component-page/typicode-user-detail?id=*', ()=>{
      console.log('route handler of /my-component-page/typicode-user-detail');
      riot.control.trigger(riot.EVT.routeStore.in.riotRouteLoadView, 'mpc-typicode-user-detail');
    });

    r('/my-component-page/*', (name)=>{
      console.log('route handler of /my-component-page/' + name);
      let view = name;

      if (self.views.indexOf(view) === -1) {
        riot.control.trigger(riot.EVT.routeStore.in.routeDispatch, self.defaultRoute);
      } else {
        riot.control.trigger(riot.EVT.routeStore.in.riotRouteLoadView, 'mpc-' + view);
      }
    });
    r('/my-component-page..', ()=>{
      console.log('route handler of /my-component-page..');
      riot.control.trigger(riot.EVT.routeStore.in.routeDispatch, self.defaultRoute);
    });
  }
}
