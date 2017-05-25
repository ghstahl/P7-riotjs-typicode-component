class RouteContributionStore{

  constructor(){
    var self = this;
    self.name = "RouteContributionStore";
    riot.observable(self);
    self._initializeViewSet();
    self.bindEvents();
  }

  _initializeViewSet(){
    var self = this;
    self._viewsSet = new Set();
    var s = self._viewsSet;
    s.add('home');
    s.add('my-component-page');
    s.add('typicode-user-detail');
    self.views = Array.from(s);
    self.defaultRoute = '/my-component-page/home';
  }
  bindEvents(){
    var self = this;
    self.on(riot.EVT.router.out.contributeRoutes, (r) => {
      console.log(self.name,riot.EVT.router.out.contributeRoutes,r)
      r('/my-component-page/typicode-user-detail?id=*', ()=>{
        console.log('route handler of /my-component-page/typicode-user-detail'  )
        riot.control.trigger(riot.EVT.loadView,'mpc-typicode-user-detail');
      });

      r('/my-component-page/*', (name)=>{
        console.log('route handler of /my-component-page/'+name )
        var view = name;
        if(self.views.indexOf(view) === -1){
          riot.control.trigger(riot.EVT.routeStore.in.routeDispatch,self.defaultRoute);
        }else{
          riot.control.trigger(riot.EVT.loadView,'mpc-'+view);
        }
      });
      r('/my-component-page..', ()=>{
        console.log('route handler of /my-component-page..' )
        riot.control.trigger(riot.EVT.routeStore.in.routeDispatch,self.defaultRoute);
      });
    });

  }
}
export default RouteContributionStore;