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
