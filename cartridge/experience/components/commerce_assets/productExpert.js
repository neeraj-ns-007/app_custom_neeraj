'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');

module.exports.render = function (context) {
    var content = context.content;
    var model = new HashMap();

    model.suggestion_area_ID = content.suggestion_area_ID;
    model.expert_name_ID = content.expert_name_ID;
    model.expert_image_ID = content.expert_image_ID;

    return new Template('experience/components/commerce_assets/productExpert').render(model).text;
}