
/**
  If true, then all SC.Controls can be focused when the
  user presses the tab key. Otherwise, only TextFieldViews
  will be focused.

  @type String
  @constant
*/
SC.FOCUS_ALL_CONTROLS = YES;

/*
  TODO [CC @ 1.5] Remove this deprecation warning eventually
*/
SC.ready(function() {
  var focus = SC.SAFARI_FOCUS_BEHAVIOR;
  if (focus !== null && focus !== undefined) {
    

    SC.FOCUS_ALL_CONTROLS = SC.SAFARI_FOCUS_BEHAVIOR;
  }
});
