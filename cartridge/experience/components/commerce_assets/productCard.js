'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');

module.exports.render = function (context) {
    var content = context.content;
    var model = new HashMap();

    model.discount_ID = content.discount_ID;
    model.card_heading_ID = content.card_heading_ID;
    model.card_image_ID = content.card_image_ID;
    model.card_link_ID = content.card_link_ID;
    model.card_url_ID = content.card_url_ID;
    model.card_price_ID = content.card_price_ID;
    model.product_button_name_ID = content.product_button_name_ID;
    model.product_button_url_ID = content.product_button_url_ID;

    return new Template('experience/components/commerce_assets/productCard').render(model).text;
}