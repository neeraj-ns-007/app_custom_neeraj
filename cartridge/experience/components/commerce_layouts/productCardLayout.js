'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var PageRenderHelper = require('*/cartridge/experience/utilities/PageRenderHelper.js');

module.exports.render = function (context, modelIn) {
    var model = modelIn || new HashMap();
    model.regions = PageRenderHelper.getRegionModelRegistry(context.component);
    model.numberOfSlides = model.regions.slides.region.size;
    return new Template('experience/components/commerce_layouts/productCardLayout').render(model).text;
};