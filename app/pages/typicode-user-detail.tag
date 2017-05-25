<mpc-typicode-user-detail>

<div if={result != null} class="panel panel-default">
    <div class="panel-heading">
        <h3 class="panel-title">{ result.name }</h3>
    </div>
    <div  class="panel-body">
    <form class="form-horizontal">
        <fieldset>
            <legend>User Details</legend>
            <div class="form-group">
                <label class="col-sm-2 control-label">Name</label>
                <div class="col-sm-10">
                    <p class="form-control-static">{ result.name }</p>
                </div>
            </div>
            <div class="form-group">
                <label class="col-sm-2 control-label">Email</label>
                <div class="col-sm-10">
                  <p class="form-control-static">{ result.email }</p>
                </div>
            </div>
            <div class="form-group">
                <label class="col-sm-2 control-label">Phone</label>
                <div class="col-sm-10">
                  <p class="form-control-static">{ result.phone }</p>
                </div>
            </div>
            <div class="form-group">
                <label class="col-sm-2 control-label">User Name</label>
                <div class="col-sm-10">
                  <p class="form-control-static">{ result.username }</p>
                </div>
            </div>
            <div class="form-group">
                <label class="col-sm-2 control-label">Web Site</label>
                <div class="col-sm-10">
                  <p class="form-control-static">{ result.website }</p>
                </div>
            </div>
        </fieldset>
    </form>
    <form class="form-horizontal">
        <fieldset>
            <legend>Address</legend>
            <div class="form-group">
                <label class="col-sm-2 control-label">Suite</label>
                <div class="col-sm-10">
                    <p class="form-control-static">{ result.address.suite }</p>
                </div>
            </div>
            <div class="form-group">
                <label class="col-sm-2 control-label">Street</label>
                <div class="col-sm-10">
                    <p class="form-control-static">{ result.address.street }</p>
                </div>
            </div>
            <div class="form-group">
                <label class="col-sm-2 control-label">City</label>
                <div class="col-sm-10">
                    <p class="form-control-static">{ result.address.city }</p>
                </div>
            </div>
            <div class="form-group">
                <label class="col-sm-2 control-label">Zip Code</label>
                <div class="col-sm-10">
                    <p class="form-control-static">{ result.address.zipcode }</p>
                </div>
            </div>
        </fieldset>
    </form>
    <form class="form-horizontal">
        <fieldset>
            <legend>Company</legend>
            <div class="form-group">
                <label class="col-sm-2 control-label">Name</label>
                <div class="col-sm-10">
                    <p class="form-control-static">{ result.company.name }</p>
                </div>
            </div>
            <div class="form-group">
                <label class="col-sm-2 control-label">Catch Phrase</label>
                <div class="col-sm-10">
                    <p class="form-control-static">{ result.company.catchPhrase }</p>
                </div>
            </div>
            <div class="form-group">
                <label class="col-sm-2 control-label">Business Statement</label>
                <div class="col-sm-10">
                    <p class="form-control-static">{ result.company.bs }</p>
                </div>
            </div>
            
        </fieldset>
    </form>
  </div>
</div>


    

     
   
 <script>
    var self = this;

    self.result = null;
    self.onUserChanged = (user) => {
        self.result = user;
        console.log(self.result);
        self.update();
    }

    self.on('mount', function() {
        var q = riot.route.query();
        console.log('on mount: typicode-user-detail',q);
        riot.control.on(riot.EVT.typicodeUserStore.out.typicodeUserChanged, self.onUserChanged);
        
        riot.control.trigger(riot.EVT.typicodeUserStore.in.typicodeUserFetch, { id: q.id });
    });

    self.on('unmount', function() {
        console.log('on unmount:');
        riot.control.off(riot.EVT.typicodeUserStore.out.typicodeUserChanged, self.onUserChanged);
    });

</script>
</mpc-typicode-user-detail>