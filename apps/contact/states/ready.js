/*globals Contact */

Contact.ReadyState = SC.State.extend({

  // Whereas the Contact.SignInState defaults to initialSubstate: 'form', here we default to 'loading', which calls 'gotoNone' at some point
  initialSubstate: 'productsList',

  enterState: function() {
    
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
  
  

});