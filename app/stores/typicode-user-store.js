
const userCache = 'typicodeUserCache';

export default class TypicodeUserStore {

  constructor() {
    riot.observable(this); // Riot provides our event emitter.
    this.name = 'TypicodeUserStore';
    riot.EVT.typicodeUserStore = {
      in: {
        typicodeInit: 'typicode-init',
        typicodeUninit: 'typicode-uninit',
        typicodeUsersFetchResult: 'typicode-users-fetch-result',
        typicodeUsersFetch: 'typicode-users-fetch',
        typicodeUserFetch: 'typicode-user-fetch'
      },
      out: {
        typicodeUsersChanged: 'typicode-users-changed',
        typicodeUserChanged: 'typicode-user-changed'
      }
    };

    this.fetchException = null;
  }

  _onTypicodeUsersFetch(query) {
    console.log(riot.EVT.typicodeUserStore.in.typicodeUsersFetch);
    let url = 'https://jsonplaceholder.typicode.com/users';
    let trigger = {
      name: riot.EVT.typicodeUserStore.in.typicodeUsersFetchResult
    };

    if (query) {
      trigger.query = query;
    }

    riot.control.trigger(riot.EVT.fetchStore.in.fetch, url, null, trigger);
  }

  _onTypicodeUserFetch(query) {
    console.log(riot.EVT.typicodeUserStore.in.typicodeUserFetch);
    let restoredSession = JSON.parse(localStorage.getItem(userCache));

    if (restoredSession) {
      let result = restoredSession.filter(function (obj) {
        return obj.id === query.id;
      });

      if (result && result.length > 0) {
        this.trigger(riot.EVT.typicodeUserStore.out.typicodeUserChanged, result[0]);
      }
    } else {
            // need to fetch.
      let myQuery = {
        type: 'riotControlTrigger',
        evt: riot.EVT.typicodeUserStore.in.typicodeUserFetch,
        query: query
      };

      riot.control.trigger(riot.EVT.typicodeUserStore.in.typicodeUsersFetch, myQuery);
    }
  }

  uninitialize() {
    this.off(riot.EVT.typicodeUserStore.in.typicodeUsersFetch, this._onTypicodeUsersFetch);
    this.off(riot.EVT.typicodeUserStore.in.typicodeUserFetch, this._onTypicodeUserFetch);
    this.off(riot.EVT.typicodeUserStore.in.typicodeUsersFetchResult, this._onUsersResult);
    riot.EVT.typicodeUserStore = null;
  }
  initialize() {

    this.on(riot.EVT.typicodeUserStore.in.typicodeUsersFetchResult, this._onUsersResult);
    this.on(riot.EVT.typicodeUserStore.in.typicodeUsersFetch, this._onTypicodeUsersFetch);
    this.on(riot.EVT.typicodeUserStore.in.typicodeUserFetch, this._onTypicodeUserFetch);
  }

  /**
     * Reset tag attributes to hide the errors and cleaning the results list
     */
  _resetData() {
    this.fetchException = null;
  };

  _onUsersResult(result, myTrigger) {
    console.log(riot.EVT.typicodeUserStore.in.typicodeUsersFetchResult, result, myTrigger);
    if (result.error == null && result.response.ok && result.json) {
            // good
      let data = result.json;

      riot.control.trigger(riot.EVT.localStorageStore.in.localstorageSet, {key: userCache, data: data});
      this.trigger(riot.EVT.typicodeUserStore.out.typicodeUsersChanged, data);
      if (myTrigger.query) {
        let query = myTrigger.query;

        if (query.type === 'riotControlTrigger') {
          riot.control.trigger(query.evt, query.query);
        }
      }
    } else {
            // Bad.. Wipe the local storage
      riot.control.trigger(riot.EVT.localStorageStore.in.localstorageRemove, {key: userCache});
      riot.control.trigger('ErrorStore:error-catch-all', {code: 'typeicode-143523'});
    }
  }

}

