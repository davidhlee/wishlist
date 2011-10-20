// ==========================================================================
// Project:   Contact.productsList
// Copyright: @2011 My Company, Inc.
// ==========================================================================
/*globals Contact */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
Contact.productsListController = SC.ArrayController.create(/* THIS NEEDS TO BE AN SC.ArrayController, NOT an SC.ObjectController, because it the DATA IS AN ARRAY !!! */
/** @scope Contact.productsList.prototype */ {

  // TODO: Add your own code here.
  // Initialize the array controller with an empty array.
  content: [],
  
  
  allowMultipleSelection: NO,

  /*queryTimer: SC.Timer.schedule({
	  //target: Contact,
	  action: 'Contact.productsListController.setProductList',
	  interval: 3000,
	  repeats: YES,
	  //until: Time.now() + 1000
	}),*/
  
  fullNamess: function() {
  	var firstName = "Hannah";
 	//var lastName = "Jolley";
  
      return firstName;
    }.property('firstName'),
	
  calculateTotalPrice: function(){
  	 //var priceValues = "Hannahssss";
  	 var totalPrices = [];
  	 
  	 Contact.productsListController.content.forEach(
  	 	function(item){
  	 		price = parseFloat(item.get('price'));
  	 		
  	 		totalPrices.push(price)
  	 	}, this);
  	 
	pricesSum = function(arrObj){
		var sum = 0;
		
		for(var i = 0; i < arrObj.length; i++){
			sum += arrObj[i];
		}
		return sum;
	};
	
	var finalTotal = pricesSum(totalPrices).toFixed(2);
	return finalTotal;
  }.property('finalTotal'),
  
  
  setProductList: function(){
  	var products = Contact.store.find(Contact.PRODUCTS_QUERY);
	this.set('content', products);

	console.log(this.get('calculateTotalPrice'));
	
	this.invokeLater(function() {
      Contact.getPath('productsListPane.productsList.totalPriceView').set('value', Contact.productsListController.calculateTotalPrice);
    }, 500);
	//this.get('content').fetch(); //or Contact.productsListController.get('content').fetch();
	//Contact.Product.fetch(); //or Contact.productsListController.get('content').fetch();
  },
  
  editProduct: function(){
  	Contact.getPath('productsListPane.productsList.addNewProductView').set('isVisible', YES);
  },
  
  
  // Methods for Adding, Editing and Submitting a new Product to the Wishlist
  addProduct: function(){
	var newProduct = Contact.store.createRecord(Contact.Product, { 
		title : "",
		price : "",
		body : "",
		image : "",
		created_at : "2013-09-30T16:23:18.849Z"
	});
	
	//var newProduct = this.createProduct();
	Contact.productosController.set('content', newProduct);    
	Contact.productsListController.selectObject(newProduct);
	
	console.log(newProduct.storeKey);
	
	//Contact.productosController.get('content').commitRecord();
	this.editProduct();
    //this.addProduct();
    
    /*
    this.invokeLater(function() {
      //this.selectObject(newProduct);
      Contact.productsListController.selectObject(person);
      this.addProduct();
    });*/
    return YES;
  },

  
  submitProduct: function(){
  	Contact.getPath('productsListPane.productsList.addNewProductView').set('isVisible', NO);
	Contact.productosController.get('content').commitRecord(); // or Contact.productsListController.get('content').commitRecord();
	this.invokeLater(function() {
      Contact.getPath('productsListPane.productsList.totalPriceView').set('value', Contact.productsListController.calculateTotalPrice);
    }, 500);
	
	return YES;
  },
  
  
  cancelProductAddition: function(){
  	Contact.getPath('productsListPane.productsList.addNewProductView').set('isVisible', NO);  	
  	Contact.productsListController.content.firstObject().destroy();
  },
  

  // Creates a new product with the passed title, then adds it to the array.
  createProduct: function(title, price, body, image, created_at) {
 	 Contact.store.createRecord(Contact.Product, { title: title, price: price, body: body, image: image, created_at: created_at });
  }
});
