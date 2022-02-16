'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');

module.exports.render = function (context) {
    var content = context.content;

    var model = new HashMap();
    model.model_image_ID = content.model_image_ID;
    model.heading_text_description = content.heading_text_description;
    model.product_button_name_ID = content.product_button_name_ID;
    model.product_button_url_ID = content.product_button_url_ID;

    return new Template('experience/components/commerce_assets/productPromo').render(model).text;
}