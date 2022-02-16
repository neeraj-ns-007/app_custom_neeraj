"use strict";

var server = require("server");
var Order = require('dw/order/Order');
var OrderMgr = require("dw/order/OrderMgr");

server.get("Start", function (req, res, next) {

  var orderList = OrderMgr.queryOrders("status = {0}", "creationDate DESC", Order.EXPORT_STATUS_EXPORTED);
  res.print(Order.getOrderToken());


//   var orderHistory: dw.customer.OrderHistory = customer.getOrderHistory();
//   var orders = orderHistory.getOrders(
//     "status = {1}",
//     "creationDate DESC",
//     Order.EXPORT_STATUS_EXPORTED
//   );
//   res.print(orders)
// orders.close();
  
  next();
});
module.exports = server.exports();
