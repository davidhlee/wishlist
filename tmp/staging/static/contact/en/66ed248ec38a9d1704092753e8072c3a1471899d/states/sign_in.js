/*globals Contact */

Contact.SignInState = SC.State.extend({

  initialSubstate: 'form',

  enterState: function() {
    Contact.signInPane.append();
    //Contact.productsListController.queryTimer.set('isPaused', YES);
  },

  exitState: function() {
    Contact.signInPane.remove();
  },



  // Form appended by initialSubstate (above)
  // ARE THESE SUB-STATES, ANALOGOUS TO SUB-STATES IN THE Contact.ReadyState?--ready.js: IT WOULD APPEAR SO.
  // ALSO, THIS FORM STATE is tied to the FORM TEMPLATE VIEW in contact.js, and sign_in_form.handlebars, whose action="signIn", the method below:
  form: SC.State.design({
  
    // The Method called by the action of the SC.Button in the sign_in_form
    signIn: function() {
      var email = Contact.signInController.get('email'),
          password = Contact.signInController.get('password');

	  // If all goes well, gotoState: the signInRequest state, below
      this.gotoState('signInRequest', {email: email, password: password});
    }
  }),


  // If all goes well with the signIn method (above), then sign the damn user in
  signInRequest: SC.State.design({
  
    // Here is a new enterState for signInRequest (NOT the one above, which is for the SignInState)
    enterState: function(context) {
      var email = context ? context.email : null,
          password = context ? context.password : null,
          statechart = this.get('statechart');

      // here is where you'd authenticate the user
      // we're just going to fire off an action
      // after we wait some time to simulate a request
      console.log("Checking log in for %@ with password: %@".fmt(context.email, context.password));

      this.invokeLater(function() {
        statechart.sendAction('signInSuccessful');
      }, 250);
    },

    // If the Email and Password authenticate properly, kick it ready state of the statechart in the 
    // core contact.js file, which will then enter its own Contact.ReadyState in ready.js
    signInSuccessful: function() {
      this.gotoState('ready');
    }
  })

});