/*globals Contact */

Contact.ReadyState = SC.State.extend({

  // Whereas the Contact.SignInState defaults to initialSubstate: 'form', here we default to 'loading', which calls 'gotoNone' at some point
  initialSubstate: 'productsList', //CHANGE TO PRODUCTS LIST VIEW!!!

  enterState: function() {
  	// GET RID OF THIS!!!
    //Contact.pane.append();
    
    Contact.productsListPane.append();
    Contact.productsListController.setProductList();
    //Contact.productsListController.queryTimer.set('isPaused', NO);
    Contact.productsListController.calculateTotalPrice();
    
    // Enter the productsList state
    this.gotoState('productsList');
  },

  exitState: function() {
    Contact.productsListPane.remove();
    //Contact.productsListController.queryTimer.set('isPaused', YES);
  },


  // ..........................................................
  // Substates
  // 

  
  productsList: SC.State.design({
    // WE MIGHT WANT TO LOOK AT THE SAVE AND CANCEL METHODS, below
    // State appears when a user clicks the "Add New Item" button
	
	// State appears when a user clicks a credit card in the "Add Payment Method" button
	selectPaymentMethodState: SC.State.design({
		enterState: function() {
			//Contact.productsListPane.productsList.selectPaymentMethod.append(); //Append toWHAT?
	},
	
		exitState: function() {
			//Contact.productsListPane.productsList.selectPaymentMethod.remove();
		}
	}),
  
    // State appears when a user clicks the "Show More Vendors" link
	productDetailState: SC.State.design({
		enterState: function() {
			//Contact.productsListPane.productsList.productDetail.append();
		},
		
		exitState: function() {
			//Contact.productsListPane.productsList.productDetail.remove();
		}
	}),
  
    // The Method called by the Sign Out button
    signOut: function() {
      this.gotoState('signIn');
      //this.get('statechart').invokeStateMethod('');
    }
  })
  
  
  
  
  // DO WE NEED THEM ANYMORE?
  // YES, we should have one for a ListDetailView? AND PERHAPS KEEP 'loading'?
  
  // THE LOADING STATE
  /*
  loading: SC.State.design({
    _loaded: 0,
    _total: 0,

	// AN ENTER STATE
    enterState: function() {
      this._loaded = 0;
      this._total = 2;

      this._loadGroups();
      this._loadPeople();
    },

	// AN EXIT STATE
    exitState: function() {},

	// DATA LOADED METHOD
    dataLoaded: function() {
      this._loaded++;

      if (this._loaded === this._total) {
        this.get('statechart').sendAction('gotoNone');
      }
    },

	// METHOD
    _loadGroups: function() {
      var query = SC.Query.local(Contact.Group),
          data = Contact.store.find(query);

      data.addObserver('status', this, function observer() {
        if (data.get('status') === SC.Record.READY_CLEAN) {
          data.removeObserver('status', this, observer);
          Contact.groupsController.set('content', data);
          this.get('statechart').invokeStateMethod('dataLoaded');
        }
        // might want to check error states too
      });

      // in case our data was already loaded (ie synchronous)
      data.notifyPropertyChange('status');
    },

	// METHOD
    _loadPeople: function() {
      var query = SC.Query.local(Contact.Person),
          data = Contact.store.find(query);

      data.addObserver('status', this, function observer() {
        if (data.get('status') === SC.Record.READY_CLEAN) {
          data.removeObserver('status', this, observer);
          this.get('statechart').invokeStateMethod('dataLoaded');
        }
      });

      data.notifyPropertyChange('status');
    }
  }),



  // THE NONE STATE (Has two sub-states: GROUP STATE and PERSON STATE)
  none: SC.State.design({
  
    // SET THE INITIAL SUB-STATE of the NONE STATE to NONE (below)
    initialSubstate: 'none',

	// ENTER STATE of the NONE STATE
    enterState: function() {
      console.log("Application ready");
    },
    

  	// NONE STATE of the NONE STATE: Essentially, do nothing initially, but allow other states to transpire
  	// as soon as people start clicking around in this NONE STATE
    none: SC.State,


    // GROUP STATE
    group: SC.State.design({
      _store: null,

	  // AN ENTER STATE
      enterState: function(context) {
        var group = context ? context.group : null,
            store = Contact.store.chain();

        if (group) {
          group = store.find(Contact.Group, group.get('guid'));
          Contact.groupController.set('content', group);
        }
        this._store = store;

        Contact.displayController.set('nowShowing', 'Contact.groupView');
      },

	  // AN EXIT STATE
      exitState: function() {
        this._store.discardChanges().destroy();
        this._store = null;
      },

	  // A CANCEL STATE/FUNCTION?
      cancel: function() {
        this._store.discardChanges();
      },

	  // A SAVE STATE/FUNCTION?
      save: function() {
        this._store.commitChanges(true);
      }
    }),


    // PERSON STATE
    person: SC.State.design({
      _store: null,
	  
	  // AN ENTER STATE
      enterState: function(context) {
        var person = context ? context.person : null,
            store = Contact.store.chain();

        if (person) {
          person = store.find(Contact.Person, person.get('guid'));
          Contact.personController.set('content', person);
        }
        this._store = store;

        Contact.displayController.set('nowShowing', 'Contact.personView');
      },

	  // AN EXIT STATE
      exitState: function() {
        this._store.discardChanges().destroy();
        this._store = null;
      },

      // A CANCEL STATE/FUNCTION?
      cancel: function() {
        this._store.discardChanges();
      },

	  // A SAVE STATE/FUNCTION?
      save: function() {
        this._store.commitChanges(true);
      }
    }),


    // SHOW GROUP METHOD
    showGroup: function(sender) {
      var group = sender.getPath('parentView.content');
      this.gotoState('ready.none.group', {group: group});
      return YES;
    },

 	// SHOW PERSON METHOD
    showPerson: function(sender) {
      var person = sender.getPath('content');
      this.gotoState('ready.none.person', {person: person});
      return YES;
    }
  }),*/


  // ..........................................................
  // Actions
  // 

  /*
  gotoNone: function() {
    this.gotoState('ready.none');
    return YES;
  }*/

});