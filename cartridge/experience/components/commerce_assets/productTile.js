'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');

module.exports.render = function (context) {
    var content = context.content;

    var model = new HashMap();
    model.heading_text = content.heading_text;
    model.heading_text_description = content.heading_text_description;

    return new Template('experience/components/commerce_assets/productTile').render(model).text;
}