// ==========================================================================
// Project:   Contact.Product
// Copyright: @2011 My Company, Inc.
// ==========================================================================
/*globals Contact */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
Contact.Product = SC.Record.extend(
/** @scope Contact.Product.prototype */ {
  title: SC.Record.attr(String),
  price: SC.Record.attr(String),
  image: SC.Record.attr(String),
  created_at: SC.Record.attr(String),
  body: SC.Record.attr(String)
  // TODO: Add your own code here.
}) ;
