var Item = Ember.Object.extend({
  price: 0,
  quantity: 0,
  total: Ember.computed("price", "quantity", function(){
    return this.get("price") * this.get("quantity");
  })
})

var ShoppingCart = Ember.Object.extend({
  items: [],
  total: Ember.computed("items.@each.total", function(){
    return this.get("items").reduce(function(memo, item){
      return memo + item.get('total');
    }, 0);
  })
});

var ham = new Item({price: 5, quantity: 6});
var bacon = new Item({price: 5, quantity: 6});

var cart = ShoppingCart.create();
cart.get("total"); // 0

cart.get('items').pushObjects([ham, bacon]);
cart.get("total"); // 10