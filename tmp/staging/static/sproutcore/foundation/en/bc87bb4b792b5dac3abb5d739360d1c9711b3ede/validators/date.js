// ==========================================================================
// Project:   SproutCore - JavaScript Application Framework
// Copyright: ©2006-2011 Strobe Inc. and contributors.
//            Portions ©2008-2011 Apple Inc. All rights reserved.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================

sc_require('validators/validator') ;

/**
  Handle parsing and display of dates.
  
  @class
  @extends SC.Validator
  @author Charles Jolley
  @version 1.0
*/
SC.Validator.Date = SC.Validator.extend(
/** @scope SC.Validator.Date.prototype */ {

  /**
    The standard format you want the validator to convert dates to.
  */
  format: '%b %d, %Y %i:%M:%S %p',
  
  /**
    if we have a number, then convert to a date object.
  */
  fieldValueForObject: function(object, form, field) {
    var format = this.get('format'),
        dateTime;

    /*
      TODO [CC] deprecated warning, we should remove this in a future release
    */
    


    if (SC.typeOf(object) === SC.T_NUMBER) {
      dateTime = SC.DateTime.create(object);
    } else if (object instanceof Date) {
      dateTime = object.getTime();
    }

    if (dateTime) { object = dateTime.toFormattedString(format); }

    return object;
  },

  /**
    Try to pase value as a date. convert into a number, or return null if
    it could not be parsed.
  */
  objectForFieldValue: function(value, form, field) {
    var format = this.get('format'),
        dateTime;

    /*
      TODO [CC] deprecated warning, we should remove this in a future release
    */
    


    if (value) {
      dateTime = SC.DateTime.parse(value, format);
      value = dateTime ? dateTime._ms : null;
    }
    return value ;
  }
    
}) ;
