'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');

module.exports.render = function (context) {
    var content = context.content;

    var model = new HashMap();
    model.feature_1_image = content.feature_1_image;
    model.feature_1_desc = content.feature_1_desc;

    return new Template('experience/components/commerce_assets/productFeatures').render(model).text;
}