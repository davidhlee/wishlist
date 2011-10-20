/* >>>>>>>>>> BEGIN source/contact.js */
// ==========================================================================
// Project:   Contact
// Copyright: @2011 My Company, Inc.
// ==========================================================================
/*globals Contact */

// Creating the damn Application
Contact = SC.Application.create({
  //store: SC.Store.create().from('Contact.FixturesDataSource')
  
  //Setting up our Server Data source:
  store: SC.Store.create().from('Contact.NodeDataSource')
});


// Application State Chart
Contact.statechart = SC.Statechart.create({

  autoInitStatechart: NO,

  rootState: SC.State.design({
    initialSubstate: 'signIn',

    signIn: SC.State.plugin('Contact.SignInState'),
    ready: SC.State.plugin('Contact.ReadyState')
  })
});





// Signin Page Views
Contact.signInPane = SC.Pane.create({
  layout: {top: 0, bottom: 0, left: 0, right: 0},
  childViews: ['mainTemplateView'],
  classNames: ['sign-in'],
  defaultResponder: 'Contact.statechart',

  mainTemplateView: SC.TemplateView.design({
  	templateName: 'main_template',
  
  	form: SC.TemplateView.extend({
	    templateName: 'sign_in_form'
	})
  })
});






// Contact Page Views
/*
Contact.pane = SC.Pane.create({
  layout: {centerX: 0, centerY: 0, height: 400, width: 800},
  childViews: ['sidebar', 'contentView'],
  classNames: ['app'],
  defaultResponder: 'Contact.statechart',

  // This is wrapped in a SC.View so we have our layout defined
  // in one place. If you wanted, you could just have the SC.TemplateView
  // here and define its width in CSS
  sidebar: SC.View.design({
    layout: {width: 200},
    childViews: ['sidebar'],
    classNames: ['sidebar'],

    sidebar: SC.TemplateView.design({
      templateName: 'sidebar'
    })
  }),

  contentView: SC.ContainerView.design({
    layout: {left: 201},
    autoResizeStyle: SC.RESIZE_AUTOMATIC,
    nowShowingBinding: 'Contact.displayController.nowShowing'
  })
});


// THE REASON THESE ARE NOT INSIDE Contact.pane is because they will be APPENDED to the DOM when
// the app enters a Sub-state of the NONE STATE (specifically, the showGroup state of the NONE STATE)
Contact.groupView = SC.TemplateView.create({
  classNames: ['group'],
  contentBinding: 'Contact.groupController',
  templateName: 'group'
});

// THE REASON THESE ARE NOT INSIDE Contact.pane is because they will be APPENDED to the DOM when
// the app enters a Sub-state of the NONE STATE (specifically, the showPerson state of the NONE STATE)
Contact.personView = SC.TemplateView.create({
  classNames: ['person'],
  contentBinding: 'Contact.personController',
  templateName: 'person'
});
*/








// Product Listing Page Views: NEED TO BE CHANGED FROM TODO TO PRODUCT
Contact.productsListPane = SC.Pane.create({
	layout: {top: 0, bottom: 0, left: 0, right: 0},
	childViews: ['productsList'],
	classNames: ['productsList'],
	defaultResponder: 'Contact.statechart',

    productsList: SC.TemplateView.design({
		layerId: 'products',
   		templateName: 'products',
   		
   		//childViews: ['productImage'],
   		
   		childViews: ['totalPriceView', 'addNewProductView', 'selectPaymentMethod', 'productCollectionView', 'productDetailView'],
	    classNames: ['totalPriceView', 'addNewProductView', 'selectPaymentMethod', 'productCollectionView', 'productDetailView'],
    
    	totalPriceView: SC.LabelView.design({
    		layerId: 'total_value',
    		//valueBinding: "Contact.productsListController.calculateTotalPrice"
		}),
    	
    	// HOPEFULLY YOU'RE ALLOWED TO ADD CHILDVIEWS AND CLASSNAMES TO SC.TemplateViews!!!!!!
    	addNewProductView: SC.TemplateView.design({
	    	layerId: 'add_new_product',
	    	templateName: 'add_new_product',
	    	isVisible: NO
	    }),
	    
	    selectPaymentMethod: SC.TemplateView.design({
	    	layerId: 'select_payment_method',
	    	templateName: 'select_payment_method',
	    	isVisible: NO
	    }),
	    
	    productCollectionView: SC.TemplateCollectionView.design({
	    	classNames: 'productsCollectionList',
	    	contentBinding: "Contact.productsListController.arrangedObjects",
	    	selectionBinding: "Contact.productsListController.selection",
	    	contentDisplayProperties: "title price body image",
	    	array: 'productCollectionArray'
	    }),
	    
	    productDetailView: SC.TemplateView.design({
	    	layerId: 'productDetail',
	    	templateName: 'productDetail',
	    	isVisible: NO
	    })
        
        
        
    }),
});

// Appended to the Contact.productsListPane instantly by products.handlebars
Contact.CreateProductView = SC.TextField.extend({
	//valueBinding
	
	insertNewline: function() {
		var value = this.get('value');
		
		if (value) {
		  Contact.productListController.createProduct(value);
		  this.set('value', '');
		}
	}
}) 








// The Application's Ready Function, which fires as soon as you reach the root URL
SC.ready(function() {
  Contact.statechart.initStatechart();
});












/* >>>>>>>>>> BEGIN __sc_chance.js */
if (typeof CHANCE_SLICES === 'undefined') var CHANCE_SLICES = [];CHANCE_SLICES = CHANCE_SLICES.concat(['__s126_0',
'__s126_1',
'__s126_2',
'__s126_3',
'__s126_4',
'__s126_5',
'__s126_6',
'__s126_7',
'__s126_8',
'__s126_9']);

/* >>>>>>>>>> BEGIN source/controllers/display.js */
/*globals Contact */

/**
  @class
  @extends SC.Object
*/
Contact.displayController = SC.Object.create(
/** @scope Contact.displayController.prototype */ {

  /**
    @type String
    @default null
  */
  nowShowing: null

});
/* >>>>>>>>>> BEGIN source/controllers/group.js */
/*globals Contact */

/**
  @class
  @extends SC.ObjectController
*/
Contact.groupController = SC.ObjectController.create(
/** @scope Contact.groupController.prototype */ {

});
/* >>>>>>>>>> BEGIN source/controllers/groups.js */
/*globals Contact */

/**
  @class
  @extends SC.ArrayController
*/
Contact.groupsController = SC.ArrayController.create(
/** @scope Contact.groupsController.prototype */ {

});
/* >>>>>>>>>> BEGIN source/controllers/person.js */
/*globals Contact */

/**
  @class
  @extends SC.ObjectController
*/
Contact.personController = SC.ObjectController.create(
/** @scope Contact.personController.prototype */ {

});
/* >>>>>>>>>> BEGIN source/controllers/product_controller.js */
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

/* >>>>>>>>>> BEGIN source/controllers/productos_controller.js */
// ==========================================================================
// Project:   Contact.productosController
// Copyright: @2011 My Company, Inc.
// ==========================================================================
/*globals Contact */

/** @class

  (Document Your Controller Here)

  @extends SC.ObjectController
*/
Contact.productosController = SC.ObjectController.create(
/** @scope Contact.productosController.prototype */ {

  // TODO: Add your own code here.
  

}) ;

/* >>>>>>>>>> BEGIN source/controllers/products_list_controller.js */
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
  	 //var priceValues = Contact.getPath('productsListPane.productsList.productCollectionView.content.price');
  	 //totalPrice = firstField.get('value');
  	 //totalValueDiv = Contact.getPath('productsListPane.productsList.calculateTotalPriceView.value');
  	 //totalValueDiv.set('value', priceValues);
  	 
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
  	//console.log(newProduct.storeKey);
  	//Contact.productsListController.get('selection').destroy();
  	//var products = Contact.store.find(Contact.PRODUCTS_QUERY);
  	//console.log('howdy');
  	//this.set('content', products);
	//Contact.productsListController.content.popObject();
  	//Contact.getPath('productsListPane.productsList.productCollectionView').arrayContentDidChange();
  	//Contact.getPath('productsListPane.productsList.productCollectionView').pop();
  	//TRY THIS: Contact.productsListController.get('selection').destroy(); TRY: Collection.length(0)  TRY: Collection.content.removeObject
  	//Contact.store.destroyRecord(Contact.Product);
  	
  	Contact.productsListController.content.firstObject().destroy();
  },
  

  // Creates a new product with the passed title, then adds it to the array.
  createProduct: function(title, price, body, image, created_at) {
 	 Contact.store.createRecord(Contact.Product, { title: title, price: price, body: body, image: image, created_at: created_at });
  }
});

/* >>>>>>>>>> BEGIN source/controllers/sign_in.js */
/*globals Contact */

/**
  @class
  @extends SC.Object
*/
Contact.signInController = SC.Object.create(
/** @scope Contact.signInController.prototype */ {

  /**
    @type String
    @default null
  */
  email: null,

  /**
    @type String
    @default null
  */
  password: null

});
/* >>>>>>>>>> BEGIN source/data_sources/fixtures.js */
/*globals Contact */

Contact.FixturesDataSource = SC.FixturesDataSource.extend({

  simulateRemoteResponse: YES,

  latency: 250

});
/* >>>>>>>>>> BEGIN source/data_sources/node_data_source.js */
// ==========================================================================
// Project:   Contact.NodeDataSource
// Copyright: @2011 My Company, Inc.
// ==========================================================================
/*globals Contact */
sc_require('Contact.Product');
Contact.PRODUCTS_QUERY = SC.Query.local(Contact.Product, {
  orderBy: 'created_at DESC'
});

/** @class

  (Document Your Data Source Here)

  @extends SC.DataSource
*/
Contact.NodeDataSource = SC.DataSource.extend(
/** @scope Contact.NodeDataSource.prototype */ {

  // ..........................................................
  // QUERY SUPPORT
  // 

  fetch: function(store, query) {
    // TODO: Add handlers to fetch data for specific queries.  
    // call store.dataSourceDidFetchQuery(query) when done.
    $.ajax('/datas', {
      success: function(data){
        Contact.productsListController.beginPropertyChanges();
        data.forEach(function(item){
          item = item;
          /*
          var todo = Todos.Todo.create({
            //id: item.id,
            title: item.title,
            price: item.price,
            body: item.body
          });*/
          
          var image = item.image;
          var title = item.title;
          var price = item.price;
          var body = item.description;
          var created_at = item.created_at;
          
          //Todos.todoListController.content.pushObject(todo);
          Contact.productsListController.createProduct(title, price, body, image, created_at);
        });
        //Todos.todoListController.endPropertyChanges();
        store.dataSourceDidFetchQuery(query);
      }
    });

    return NO ; // return YES if you handled the query
  },

  // ..........................................................
  // RECORD SUPPORT
  // 
  
  retrieveRecord: function(store, storeKey) {
    
    // TODO: Add handlers to retrieve an individual record's contents
    // call store.dataSourceDidComplete(storeKey) when done.
    
    return NO ; // return YES if you handled the storeKey
  },
  
  createRecord: function(store, storeKey) {
    
    // TODO: Add handlers to submit new records to the data source.
    // call store.dataSourceDidComplete(storeKey) when done.
    if (SC.kindOf(store.recordTypeFor(storeKey), Contact.Product)) {
      SC.Request.postUrl('/datas/new').header({'Accept':'application/json'}).json()
        .notify(this, 'didCreateProduct', store, storeKey)
        .send(store.readDataHash(storeKey));
      return YES;
    } else {
      return NO; // return YES if you handled the storeKey
    }
  },
  
  
  updateRecord: function(store, storeKey) {
    
    // TODO: Add handlers to submit modified record to the data source
    // call store.dataSourceDidComplete(storeKey) when done.

    return NO ; // return YES if you handled the storeKey
  },
  
  destroyRecord: function(store, storeKey) {
    
    // TODO: Add handlers to destroy records on the data source.
    // call store.dataSourceDidDestroy(storeKey) when done
    
    return NO ; // return YES if you handled the storeKey
  }
  
}) ;

/* >>>>>>>>>> BEGIN source/models/group.js */
/*globals Contact */

Contact.Group = SC.Record.extend({

  name: SC.Record.attr(String),

  people: SC.Record.toMany('Contact.Person', {inverse: 'group'})

});
/* >>>>>>>>>> BEGIN source/models/person.js */
/*globals Contact */


/**
  @class
  @extends SC.Record
*/
Contact.Person = SC.Record.extend(
/** @scope Contact.Person.prototype */{

  /**
    @type String
    @default "Señor"
  */
  firstName: SC.Record.attr(String, {defaultValue: "Señor"}),

  /**
    @field
    @type String
    @default null
  */
  fullName: function() {
    var firstName = this.get('firstName'),
        lastName = this.get('lastName');

    return firstName + ' ' + lastName;
  }.property('firstName', 'lastName').cacheable(),

  /**
    @type Contact.Group
    @default null
  */
  //group: SC.Record.toOne('Contact.Group', {inverse: 'people'}),

  /**
    @type String
    @default null
  */
  lastName: SC.Record.attr(String),
  
  
  /**
    @type String
    @default null
  */
  email:     SC.Record.attr(String)

});
/* >>>>>>>>>> BEGIN source/models/product_model.js */
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

/* >>>>>>>>>> BEGIN source/resources/templates/add_new_product.handlebars */
SC.TEMPLATES["add_new_product"] = SC.Handlebars.compile("<div id=\"add_product_container\">\n\t<div id=\"add_product_instructions\">\n\t\t<h3>Add a product to your <strong>Wishlist</strong> manually:</h3>\n\t\t<p><strong>Note:</strong> The \"Image\" field should be a URL link. Image file uploads will be available soon.</p>\n\t</div>\n\n\t{{#view SC.TextField classNames=\"product_input\" valueBinding=\"Contact.productosController.title\" hint=\"Product name\"}}\n\t\t<input placeholder=\"Product name\" />\n\t{{/view}}\n\t\n\t{{#view SC.TextField classNames=\"product_input\" valueBinding=\"Contact.productosController.price\" hint=\"Price\"}}\n\t\t<input placeholder=\"Price\" />\n\t{{/view}}\n\t\n\t{{#view SC.TextField classNames=\"product_input\" valueBinding=\"Contact.productosController.body\" hint=\"Description\"}}\n\t\t<input placeholder=\"Product description\" />\n\t{{/view}}\n\t\n\t{{#view SC.TextField classNames=\"product_input\" valueBinding=\"Contact.productosController.image\" hint=\"Image URL (optional)\"}}\n\t\t<input placeholder=\"Image URL (optional)\" />\n\t{{/view}}\n\t\n\t<div id=\"submit_or_cancel\">\n\t\t{{#view SC.Button target=\"Contact.productsListController\" action=\"submitProduct\"}}\n\t\t  <input id=\"submit_product_button\" class=\"blue_button\" value=\"Submit\"/>\n\t\t{{/view}}\n\t\t\n\t\t{{#view SC.Button target=\"Contact.productsListController\" action=\"cancelProductAddition\" classNames=\"cancel_button\"}}\n\t\t\t<a>Cancel</a>\n\t\t{{/view}}\n\t</div>\n</div>\n");
/* >>>>>>>>>> BEGIN source/resources/templates/contact.handlebars */
SC.TEMPLATES["contact"] = SC.Handlebars.compile("<h1>Welcome to SproutCore!</h1>\n");
/* >>>>>>>>>> BEGIN source/resources/templates/group.handlebars */
SC.TEMPLATES["group"] = SC.Handlebars.compile("<h2>Group: {{content.name}}</h2>\n\n<ul class=\"form\">\n  <li>\n    <label for=\"name\">Name:</label>\n    {{view SC.TextField name=\"name\" valueBinding=\"Contact.groupController.name\"}}\n  </li>\n</ul>\n\n<div class=\"buttons\">\n  {{#view SC.Button action=\"cancel\" classNames=\"button cancel\"}}\n    Cancel\n  {{/view}}\n  {{#view SC.Button action=\"save\" classNames=\"button save\"}}\n    Save\n  {{/view}}\n</div>");
/* >>>>>>>>>> BEGIN source/resources/templates/main_template.handlebars */
SC.TEMPLATES["main_template"] = SC.Handlebars.compile("<div id=\"landing_page_bg\">\n\t<div id=\"demo_hand\"></div>\n\t<div id=\"landing_page\">\n\n\t\t\n\t\t<header id=\"header\">\n\t\t\t<!--<img alt=\"Square\" class=\"logo\" src=\"https://d1g145x70srn7h.cloudfront.net/static/229d9eccc2e02bff608fa2698fbb8bea1a6e6208/images/public/logotype-dark.png\">-->\n\t\t\t<div class=\"logo\"><p>wishlist</p></div>\n\t\t</header>\n\t\t\t\n\t\t<div class=\"container\">\n\t    \t<div id=\"signup_form_container\">\n\t    \t\t<div id=\"signup_form_body\">\n\t    \t\t\t<div id=\"welcome_wagon\" class=\"fontface\">\n\t    \t\t\t\t<h1>Start scanning products today.</h1>\n\t    \t\t\t\t<p>Sign up for Wishlist and start pushing Products from your iPhone to the desktop.</p>\n\t\t\t\t\t</div>\n\t    \t\t\t{{view form}}\n\t    \t\t\t<div id=\"app_details\">\n\t    \t\t\t\t\n\t    \t\t\t</div>\n\t    \t\t</div>\n\t    \t</div>\n\t\t</div> <!--! end of #container -->\n\t</div>\n</div>\n");
/* >>>>>>>>>> BEGIN source/resources/templates/person.handlebars */
SC.TEMPLATES["person"] = SC.Handlebars.compile("<h2>Person: {{content.fullName}}</h2>\n\n<ul class=\"form\">\n  <li>\n    <label for=\"firstName\">First Name:</label>\n    {{view SC.TextField name=\"firstName\" valueBinding=\"Contact.personController.firstName\"}}\n  </li>\n  <li>\n    <label for=\"lastName\">Last Name:</label>\n    {{view SC.TextField name=\"lastName\" valueBinding=\"Contact.personController.lastName\"}}\n  </li>\n</ul>\n\n<div class=\"buttons\">\n  {{#view SC.Button action=\"cancel\" classNames=\"button cancel\"}}\n    Cancel\n  {{/view}}\n  {{#view SC.Button action=\"save\" classNames=\"button save\"}}\n    Save\n  {{/view}}\n</div>");
/* >>>>>>>>>> BEGIN source/resources/templates/products.handlebars */
SC.TEMPLATES["products"] = SC.Handlebars.compile("<div id=\"product_page_bg\">\n\t<div id=\"product_page\">\n\t\t<div class=\"product_container\">\n\t\t\t<div id=\"wishlist\">\n\t\t\t\t<div id=\"wishlist_header\">\t\n\t\t\t\t\t<div class=\"user_profile_container\">\n\t\t\t\t\t\t<div class=\"user_profile_avatar\">\n\t\t\t\t\t\t\t<img class=\"user_profile_avatar\" alt=\"\"/>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<p class=\"user_name\">David Lee</p>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"logout_button_container\">\n\t\t\t\t\t\t{{#view SC.Button action=\"signOut\"}}\n\t\t\t\t\t\t\t<a class=\"logout_button\">Log out</a>\n\t\t\t\t\t\t{{/view}}\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div id=\"wishlist_body\">\n\t\t\t\t\t<div id=\"wishlist_utility_dock\">\n\t\t\t\t\t\t<div id=\"wishlist_product_total\">\n\t\t\t\t\t\t\t<label>Total:</label>\n\t\t\t\t\t\t\t{{view totalPriceView name=\"name\"}}\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div id=\"pay_or_add_buttons\">\n\t\t\t\t\t\t\t<div id=\"add_payment_container\">\n\t\t\t\t\t\t\t\t<a id=\"add_payment_method_button\" action=\"selectPaymentMethodState.enterState\">Add Payment Method:</a>\n\t\t\t\t\t\t\t\t<ul id=\"payment_method_list\">\n\t\t\t\t\t\t\t\t\t<li id=\"amex\"></li>\n\t\t\t\t\t\t\t\t\t<li id=\"cash\"></li>\n\t\t\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t{{#view SC.Button target=\"Contact.productsListController\" action=\"addProduct\" id=\"add_product_button_container\"}}\n\t\t\t\t\t\t\t\t<a id=\"add_product_button\">Add Product</a>\n\t\t\t\t\t\t\t{{/view}}\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\n\t\t\t\t\t\t\n\t\t\t\t\t\t{{view addNewProductView}}\n\t\t\t\t\t\t{{view selectPaymentMethod}}\t\t\t\t\t\t\n\t\t\t\t\t\t\n\t\t\t\t\t\t\n\t\t\t\t\t</div>\t\t\t\t\t\n\t\t\t\t\t{{#collection productCollectionView}}\n\t\t\t\t\t\t<div class=\"product_item_container\">\n\t\t\t\t\t\t\t<div class=\"product_image_container\">\n\t\t\t\t\t\t\t\t<a {{bindAttr href=\"content.image\"}} target=\"_blank\">\n\t\t\t\t\t\t\t\t\t<img {{bindAttr src=\"content.image\"}} {{bindAttr alt=\"content.image\"}}/>\n\t\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t\t<div class=\"product_image_shadow\"></div>\n\t\t\t\t\t\t\t\t<div class=\"product_price\">\n\t\t\t\t\t\t\t\t\t$ {{content.price}}\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"text_container\">\n\t\t\t\t\t\t\t\t<div class=\"title_container\">\n\t\t\t\t\t\t\t\t\t{{content.title}}\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div class=\"description_container\">\n\t\t\t\t\t\t\t\t\t{{content.body}}\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t<!--<a action=\"productDetailState.enterState\">Show more vendors...</a>-->\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t{{/collection}}\t\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div> <!--! end of #container -->\n\t</div>\n</div>");
/* >>>>>>>>>> BEGIN source/resources/templates/select_payment_method.handlebars */
SC.TEMPLATES["select_payment_method"] = SC.Handlebars.compile("<div id=\"add_payment_method_container\">\n\t\n</div>");
/* >>>>>>>>>> BEGIN source/resources/templates/sidebar.handlebars */
SC.TEMPLATES["sidebar"] = SC.Handlebars.compile("{{#collection Contact.GroupsList contentBinding=\"Contact.groupsController.content\"}}\n  {{#view SC.Button action=\"showGroup\" classNames=\"group\"}}\n    <h2>{{parentView.content.name}}</h2>\n  {{/view}}\n  {{collection Contact.PeopleList contentBinding=\".parentView.content.people\"}}\n{{/collection}}\n");
/* >>>>>>>>>> BEGIN source/resources/templates/sign_in_form.handlebars */
SC.TEMPLATES["sign_in_form"] = SC.Handlebars.compile("<form id=\"signup_form\">\n\t{{#view SC.TextField valueBinding=\"Contact.signInController.email\"}}\n\t  <input class=\"email\" type=\"text\" name=\"email\" placeholder=\"Email\" />\n\t{{/view}}\n\t{{#view SC.TextField valueBinding=\"Contact.signInController.password\"}}\n\t  <input class=\"password\" type=\"password\" name=\"password\" placeholder=\"Password\" />\n\t{{/view}}\n\t  <input class=\"confirm_password\" type=\"password\" placeholder=\"Confirm Password\" />\n\n\t{{#view SC.Button action=\"signIn\"}}\n\t  <input id=\"sign_in_button\" class=\"blue_button\" value=\"Sign up for Wishlist\"/>\n\t{{/view}}\n</form>\n\n");
/* >>>>>>>>>> BEGIN source/states/ready.js */
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
/* >>>>>>>>>> BEGIN source/states/sign_in.js */
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
/* >>>>>>>>>> BEGIN source/views/groups_list.js */
/*globals Contact */

Contact.GroupsList = SC.TemplateCollectionView.extend({

  classNames: ['groups-list']

});
/* >>>>>>>>>> BEGIN source/views/people_list.js */
/*globals Contact */

Contact.PeopleList = SC.TemplateCollectionView.extend({

  classNames: ['people-list'],

  itemViewClass: SC.Button.extend({
    action: 'showPerson',
    classNames: ['person'],
    template: SC.Handlebars.compile('<div class="button">{{content.fullName}}</div>')
  })

});
/* >>>>>>>>>> BEGIN source/views/text_field.js */

SC.TextField = SC.TextField.extend({
  willLoseFirstResponder: function() {}
});
