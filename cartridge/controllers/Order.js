'use strict';

var server = require('server');
var Transaction = require('dw/system/Transaction');
var OrderMgr = require('dw/order/OrderMgr');
server.extend(module.superModule);

server.append('Confirm', function (req, res, next) {
    var order;
    if (!req.form.orderToken || !req.form.orderID) {
        res.render('/error', {
            message: Resource.msg('error.confirmation.error', 'confirmation', null)
        });

        return next();
    }

    order = OrderMgr.getOrder(req.form.orderID, req.form.orderToken);

    var billingAddress = '';

    var address1 = order.billingAddress.address1;
    var address2 = order.billingAddress.address2;
    var city = order.billingAddress.city;

    if (address1 !== null)
        billingAddress += address1;

    if (address2 !== null)
        billingAddress += ', ' + address2;

    if (city !== null)
        billingAddress += ', ' + city;

    var productName = order.productLineItems[0].productName;

    var nameAndAddress = 'Name: ' + productName + ' Address: ' + billingAddress;

    Transaction.begin();
    order.custom.productName_Address = nameAndAddress;
    Transaction.commit();
    next();
});

module.exports = server.exports();
