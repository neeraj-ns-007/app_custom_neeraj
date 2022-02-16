'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');

module.exports.render = function(context) {
    var content = context.content;

    var model = new HashMap();
    model.imageID = content.imageID;
    model.navDotColor = content.navDotColor;
    model.imageHeading = content.imageHeading;
    model.imageDescription = content.imageDescription;
    model.btnName = content.btnName;
    model.btnURL = content.btnURL;

    return new Template('experience/components/commerce_assets/sliderComponent').render(model).text;
}