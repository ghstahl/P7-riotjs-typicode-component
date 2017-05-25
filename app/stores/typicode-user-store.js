
const user_cache = 'typicodeUserCache';

function TypicodeUserStore() {
    var self = this
    self.name = 'TypicodeUserStore';
    riot.EVT.typicodeUserStore ={
        in:{
            typicodeInit:'typicode-init',
            typicodeUninit:'typicode-uninit',
            typicodeUsersFetchResult:'typicode-users-fetch-result',
            typicodeUsersFetch:'typicode-users-fetch',
            typicodeUserFetch:'typicode-user-fetch'
        },
        out:{
            typicodeUsersChanged:'typicode-users-changed',
            typicodeUserChanged:'typicode-user-changed'
        }
    }
    riot.observable(self) // Riot provides our event emitter.

    self.fetchException = null;

    self.on(riot.EVT.app.out.appMount, function() {
        console.log(riot.EVT.app.out.appMount,self.name);
        riot.control.on(riot.EVT.typicodeUserStore.in.typicodeUsersFetchResult, self.onUsersResult);
    })
    self.on(riot.EVT.app.out.appUnmount, function() {
        console.log(riot.EVT.app.out.appUnmount,self.name);
        riot.control.off(riot.EVT.typicodeUserStore.in.typicodeUsersFetchResult, self.onUsersResult);
    })
    self.on(riot.EVT.typicodeUserStore.in.typicodeInit, function() {
        console.log(riot.EVT.typicodeUserStore.in.typicodeInit,self.name);
        riot.control.on(riot.EVT.typicodeUserStore.in.typicodeUsersFetchResult, self.onUsersResult);
    })
    self.on(riot.EVT.typicodeUserStore.in.typicodeUninit, function() {
        console.log(riot.EVT.typicodeUserStore.in.typicodeUninit,self.name);
        riot.control.off(riot.EVT.typicodeUserStore.in.typicodeUsersFetchResult, self.onUsersResult);
    })
    

    /**
     * Reset tag attributes to hide the errors and cleaning the results list
     */
    self.resetData = function() {
        self.fetchException = null;
    }

    self.onUsersResult = (result,myTrigger) =>{
        console.log(riot.EVT.typicodeUserStore.in.typicodeUsersFetchResult,result,myTrigger);
        if(result.error == null && result.response.ok && result.json){
            // good
            var data = result.json;
            riot.control.trigger(riot.EVT.localStorageStore.in.localstorageSet,{key:user_cache,data:data});
            self.trigger(riot.EVT.typicodeUserStore.out.typicodeUsersChanged, data)
            if(myTrigger.query){
                var query = myTrigger.query;
                if(query.type =='riotControlTrigger'){
                   riot.control.trigger(query.evt,query.query); 
                }
            }
        }else{
            // Bad.. Wipe the local storage
            riot.control.trigger(riot.EVT.localStorageStore.in.localstorageRemove,{key:user_cache});
            riot.control.trigger('ErrorStore:error-catch-all',{code:'typeicode-143523'});
        }
    }

    self.on(riot.EVT.typicodeUserStore.in.typicodeUsersFetch, function(query) {
        console.log(riot.EVT.typicodeUserStore.in.typicodeUsersFetch);
        var url = 'https://jsonplaceholder.typicode.com/users';
        var trigger = {
            name:riot.EVT.typicodeUserStore.in.typicodeUsersFetchResult
        };
        if(query){
            trigger.query = query
        }

        riot.control.trigger(riot.EVT.fetchStore.in.fetch,url,null,trigger);
    })

    self.on(riot.EVT.typicodeUserStore.in.typicodeUserFetch, function(query) {
        console.log(riot.EVT.typicodeUserStore.in.typicodeUserFetch);
        var restoredSession = JSON.parse(localStorage.getItem(user_cache));
        if(restoredSession){
            var result = restoredSession.filter(function( obj ) {
                return obj.id == query.id;
            });
            if(result && result.length>0){
                self.trigger(riot.EVT.typicodeUserStore.out.typicodeUserChanged,result[0]);
            }
        }else{
            // need to fetch.
            var myQuery = {
                type:'riotControlTrigger',
                evt:riot.EVT.typicodeUserStore.in.typicodeUserFetch,
                query:query
            }
            riot.control.trigger(riot.EVT.typicodeUserStore.in.typicodeUsersFetch,myQuery);
        }
    })

    // The store emits change events to any listening views, so that they may react and redraw themselves.
}
if (typeof(module) !== 'undefined') module.exports = TypicodeUserStore;



