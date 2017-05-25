<mpc-my-component-page>

<div class="panel panel-default">
  <div class="panel-heading">TypiCode Users</div>
  <div class="panel-body">
    <div class="well">
      This pulls users from https://jsonplaceholder.typicode.com/     
</div>
    <table class="table table-striped table-hover ">
    <thead>
      <tr>
        <th>id</th>
        <th>username</th>
        <th>name</th>
        <th>email</th>
        <th>phone</th>
        <th>details</th>
      </tr>
    </thead>
    <tbody>
      <tr each={ this.results }>
        <td>{ this.id }</td>
        <td>{ this.username }</td>
        <td>{ this.name }</td>
        <td>{ this.email }</td>
        <td>{ this.phone }</td>
        <td><a onclick={parent.route}>More...</a></td>
      </tr>
       
    </tbody>
</table> 
  </div>
</div>
 


<script>
	var self = this;
	self.error = false;
  self.results = [];
  /**
   * Reset tag attributes to hide the errors and cleaning the results list
   */
  self.resetData = function() {
    self.results = [];
    self.error = false;
  }

	self.on('mount', () => {
      console.log('typicode-users mount')
      riot.control.on(riot.EVT.typicodeUserStore.out.typicodeUsersChanged,self.onTypicodeUsersChanged);
      riot.control.trigger(riot.EVT.typicodeUserStore.in.typicodeUsersFetch);
    });
    self.on('unmount', () => {
      console.log('typicode-users unmount')
      riot.control.off(riot.EVT.typicodeUserStore.out.typicodeUsersChanged,self.onTypicodeUsersChanged);
    });
	self.onTypicodeUsersChanged = (result) =>{
       console.log(riot.EVT.typicodeUserStore.out.typicodeUsersChanged);
       self.results = result;
       console.log(self.results);
       self.update();
    }
  self.route = (evt) => {
		riot.control.trigger('riot-route-dispatch',
		'my-component-page/typicode-user-detail?id='+evt.item.id);
	  };
</script>

</mpc-my-component-page>
