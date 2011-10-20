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











