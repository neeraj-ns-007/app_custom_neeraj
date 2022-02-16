"use strict";

var server = require("server");
var Site = require("dw/system/Site");
// var form = server.forms.getForm("shipping");
var service = require("~/cartridge/services/BingMapService");
// var Transaction = require("dw/system/Transaction");

server.extend(module.superModule);

// server.append("SubmitShipping", function (req, res, next) {
//   var distance = {};
//   var customerLocation = "";
//   var shopLocation = Site.getCurrent().getCustomPreferenceValue(
//     "neerajStoreLocation"
//   );
//   var price = Site.getCurrent().getCustomPreferenceValue("shipmentPricePerKm");

//   var address1 = form.shippingAddress.addressFields.address1.value;
//   var address2 = form.shippingAddress.addressFields.address2.value;
//   var city = form.shippingAddress.addressFields.city.value;
//   var zipCode = form.shippingAddress.addressFields.postalCode.value;

//   if (address1 !== null) {
//     var temp = address1.split(" ");
//     address1 = "";

//     for (var i = 0; i < temp.length - 1; i++) {
//       address1 += temp[i] + "%20";
//     }
//     address1 += temp[temp.length - 1];

//     customerLocation = address1;
//   }

//   if (address2 !== null) customerLocation += "," + address2;

//   if (city !== null) customerLocation += "," + city;

//   if (zipCode !== null) customerLocation += "," + zipCode;

//   var url = service.bingMapAPIService.getURL();
//   var svcResult = service.bingMapAPIService
//     .setURL(url + "&wp.0=" + shopLocation + "&wp.1=" + customerLocation)
//     .call();

//   if (svcResult.status === "OK") {
//     distance.result =
//       svcResult.object.resourceSets[0].resources[0].travelDistance;
//     // shippingCost = price * parseFloat(distance.result);
//   }

//   //   var email = form.shippingAddress.addressFields.secondaryEmail.value;
  
//   var currentBasket = BasketMgr.getCurrentBasket();
//   var shipmentUUID = req.querystring.shipmentUUID || req.form.shipmentUUID;
//   // var shippingMethodID = req.querystring.methodID || req.form.methodID;
//   var shipment;

//   // Transaction.begin();

//   //   currentBasket.custom.secondayEmail = email + distance.result;
//   shipment = ShippingHelper.getShipmentByUUID(currentBasket, shipmentUUID);
  
//   var num = shipment.getAdjustedShippingTotalPrice()
//   // shipment.adjustedShippingTotalPrice.value * parseFloat(distance.result).toFixed(2);
  
//   ShippingHelper.selectShippingMethod(shipment, shipment.shippingMethodID);
//   basketCalculationHelpers.calculateTotals(currentBasket);

//   // Transaction.commit();

//   next();
// });

server.append('SelectShippingMethod', server.middleware.https, function (req, res, next) {
  var BasketMgr = require('dw/order/BasketMgr');
  var Resource = require('dw/web/Resource');
  var Transaction = require('dw/system/Transaction');
  var AccountModel = require('*/cartridge/models/account');
  var OrderModel = require('*/cartridge/models/order');
  var URLUtils = require('dw/web/URLUtils');
  var ShippingHelper = require('*/cartridge/scripts/checkout/shippingHelpers');
  var Locale = require('dw/util/Locale');
  var basketCalculationHelpers = require('*/cartridge/scripts/helpers/basketCalculationHelpers');
  var COHelpers = require('*/cartridge/scripts/checkout/checkoutHelpers');

  var distance = {};
    // var customerLocation = "";
    var shopLocation = Site.getCurrent().getCustomPreferenceValue(
      "neerajStoreLocation"
    );

    var zipCode = req.querystring.zip;
  
    var url = service.bingMapAPIService.getURL();
    var svcResult = service.bingMapAPIService
      .setURL(url + "&wp.0=" + shopLocation + "&wp.1=" + zipCode)
      .call();
  
    if (svcResult.status === "OK") {
      distance.result =
        svcResult.object.resourceSets[0].resources[0].travelDistance;
    }

  var currentBasket = BasketMgr.getCurrentBasket();

  if (!currentBasket) {
      res.json({
          error: true,
          redirectUrl: URLUtils.url('Cart-Show').toString()
      });
      return next();
  }

  var methodId;
    if(distance.result >= 0 && distance.result <= 50)
    methodId = "0-50_km";
    if(distance.result >= 50 && distance.result <= 100)
    methodId = "50-100_km";
    if(distance.result >= 100 && distance.result <= 200)
    methodId = "100-200_km";
    if(distance.result > 200)
    methodId = "200";
    
    var shippingMethodID;
    if(distance.result != undefined)
        shippingMethodID = methodId;
    else
        shippingMethodID = req.querystring.methodID || req.form.methodID;

  var shipmentUUID = req.querystring.shipmentUUID || req.form.shipmentUUID;
  var shipment;
  if (shipmentUUID) {
      shipment = ShippingHelper.getShipmentByUUID(currentBasket, shipmentUUID);
  } else {
      shipment = currentBasket.defaultShipment;
  }

  var viewData = res.getViewData();
  viewData.address = ShippingHelper.getAddressFromRequest(req);
  viewData.isGift = req.form.isGift === 'true';
  viewData.giftMessage = req.form.isGift ? req.form.giftMessage : null;
  res.setViewData(viewData);

  this.on('route:BeforeComplete', function (req, res) { 
      var shippingData = res.getViewData();
      var address = shippingData.address;

      try {
          Transaction.wrap(function () {
              var shippingAddress = shipment.shippingAddress;

              if (!shippingAddress) {
                  shippingAddress = shipment.createShippingAddress();
              }

              shippingAddress.setFirstName(address.firstName || '');
              shippingAddress.setLastName(address.lastName || '');
              shippingAddress.setAddress1(address.address1 || '');
              shippingAddress.setAddress2(address.address2 || '');
              shippingAddress.setCity(address.city || '');
              shippingAddress.setPostalCode(address.postalCode || '');
              shippingAddress.setStateCode(address.stateCode || '');
              shippingAddress.setCountryCode(address.countryCode || '');
              shippingAddress.setPhone(address.phone || '');

              ShippingHelper.selectShippingMethod(shipment, shippingMethodID);

              basketCalculationHelpers.calculateTotals(currentBasket);
          });
      } catch (err) {
          res.setStatusCode(500);
          res.json({
              error: true,
              errorMessage: Resource.msg('error.cannot.select.shipping.method', 'cart', null)
          });

          return;
      }

      COHelpers.setGift(shipment, shippingData.isGift, shippingData.giftMessage);

      var usingMultiShipping = req.session.privacyCache.get('usingMultiShipping');
      var currentLocale = Locale.getLocale(req.locale.id);

      var basketModel = new OrderModel(
          currentBasket,
          { usingMultiShipping: usingMultiShipping, countryCode: currentLocale.country, containerView: 'basket' }
      );

      res.json({
          customer: new AccountModel(req.currentCustomer),
          order: basketModel
      });
  });

  return next();
});

module.exports = server.exports();
