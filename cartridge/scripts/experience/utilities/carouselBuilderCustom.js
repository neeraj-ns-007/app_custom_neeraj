"use strict";

/* eslint no-param-reassign: ["error", { "props": true, "ignorePropertyModificationsFor": ["model"] }] */
var PageRenderHelper = require("*/cartridge/experience/utilities/PageRenderHelper.js");

/**
 * Helper to encapsulate common code for building a carousel
 *
 * @param {Object} model - model object for a component
 * @param {Object} context - model object for a component
 * @return {Object} model - prepared model
 */
function init(model, context) {
  model.regions = PageRenderHelper.getRegionModelRegistry(context.component);

  var xsColSize = 12;
  var smColSize = 12;
  var mdColSize = 12;

  var sizeExtraSmall = " col-" + xsColSize;
  var sizeSmall = " col-sm-" + smColSize;
  var sizeMedium = " col-md-" + mdColSize;

  model.regions.slides.setClassName("swiper-wrapper");
  model.regions.slides.setComponentClassName("swiper-slide");
  // model.regions.slides.setComponentClassName('carousel-item active' + sizeExtraSmall + sizeSmall + sizeMedium, { position: 0 });

  var numberOfSlides = model.regions.slides.region.size;

  // for (var i = 0; i < numberOfSlides; i++) {
  //     model.regions.slides.setComponentAttribute('data-position', i, { position: i });
  // }

  if (
    context.component.typeID === "einstein.einsteinCarousel" ||
    context.component.typeID === "einstein.einsteinCarouselProduct" ||
    context.component.typeID === "einstein.einsteinCarouselCategory"
  ) {
    numberOfSlides = context.content.count;
  }

  model.id = "carousel-" + context.component.getID();

  model.slidesToDisplay = {
    xs: 1,
    sm: 1,
    md: 1,
    sizeExtraSmall: sizeExtraSmall,
    sizeSmall: sizeSmall,
    sizeMedium: sizeMedium,
  };

  model.displayIndicators = {
    xs: "indicators-xs",
    sm: "indicators-sm",
    md: "indicators-md",
  };

  model.displayControls = {
    xs: "controls-xs",
    sm: "controls-sm",
    md: "controls-md",
  };

  model.insufficientNumberOfSlides = {
    xs: "",
    sm: "",
    md: "",
  };

  model.numberOfSlides = model.regions.slides.region.size;
  if (
    context.component.typeID === "einstein.einsteinCarousel" ||
    context.component.typeID === "einstein.einsteinCarouselProduct" ||
    context.component.typeID === "einstein.einsteinCarouselCategory"
  ) {
    model.numberOfSlides = context.content.count - 1;
  }
  model.title = context.content.heading ? context.content.heading : null;
  return model;
}

module.exports = {
  init: init,
};
