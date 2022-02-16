'use strict'

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');

module.exports.render = function(context){
    var content = context.content;

    var model = new HashMap();
    model.product_heading_ID = content.product_heading_ID;
    model.product_description_ID = content.product_description_ID;
    model.product_button_name_ID = content.product_button_name_ID;
    model.product_button_url_ID = content.product_button_url_ID; 
    model.product_image = content.product_image; 

    return new Template('experience/components/commerce_assets/pageHeader').render(model).text;
}