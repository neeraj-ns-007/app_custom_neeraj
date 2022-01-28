'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');

module.exports.render = function (context) {
    var model = new HashMap();

    model.postURL = context.content.postURL;
    model.sharedByURL = context.content.sharedByURL;

    return new Template('experience/components/commerce_assets/instagramPost').render(model).text;
}