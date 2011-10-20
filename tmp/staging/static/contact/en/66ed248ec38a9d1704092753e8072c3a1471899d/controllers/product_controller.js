// ==========================================================================
// Project:   Contact.productController
// Copyright: @2011 My Company, Inc.
// ==========================================================================
/*globals Contact */

/** @class

  (Document Your Controller Here)

  @extends SC.ObjectController
*/
Contact.productController = SC.ObjectController.create(
/** @scope Contact.productController.prototype */ {

  // TODO: Add your own code here.
  contentBinding: SC.Binding.single('Contact.productsListController.selection'),
  //contentBindingDefault: SC.Binding.single()

}) ;
