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



// Product Listing Page Views
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











