'use strict';


var server = require('server');
var service = require('~/cartridge/services/currencyService');

var currencyconverterform = server.forms.getForm('currencyConverterForm');

server.get('Start', function (req, res, next) {

  currencyconverterform.clear();

  var properties = {} 
  properties.form = currencyconverterform

  res.render('currencyConverter', properties)

  next();
  })

server.post('HandleForm', function (req, res, next) {

  var properties = {}

  properties.form = currencyconverterform
  properties.amount = currencyconverterform.amount.value;
  properties.select_currency = currencyconverterform.select_currency.value

  var url = service.currencyAPIService.getURL();
  var svcResult = service.currencyAPIService.setURL(url + properties.select_currency + '/' + 'USD/' + properties.amount).call();
  
  if(svcResult.status === 'OK'){
    properties.result = svcResult.object.result;
    properties.conversion_result = svcResult.object.conversion_result.toFixed(2)
  }

  res.render('currencyConverter', properties)
  next();
})

module.exports = server.exports();