'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');

module.exports.render = function (context) {
    var  content = context.content;
    var model = new HashMap();

    // model.faq_title = content.faq_title;
    model.faqQuestionNumber = content.faqQuestionNumber;
    model.faqQuestion = content.faqQuestion;
    model.faqAnswer = content.faqAnswer;

    return new Template('experience/components/commerce_assets/faqAccordion').render(model).text;
}