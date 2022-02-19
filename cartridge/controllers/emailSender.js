'use strict';

var server = require('server');
server.get('Show', function(req, res, next){
    res.render('customEmailTemplate');
    next();
});

server.post('Start', function(req, res, next){
    var data = req.httpParameterMap.requestBodyAsString;
    send("neerajsharma@cyntexa.com", data);
    res.print("done")
    next();
});

function send(customerEmail, data) {
    var HashMap = require('dw/util/HashMap');
    var Mail = require('dw/net/Mail');
    var Resource = require('dw/web/Resource');
    var Site = require('dw/system/Site');
    var Template = require('dw/util/Template');

    var context = new HashMap();
    var dataArray = data.split(',');
    var dataInfo = dataArray[0].split(';');
    var fileType = dataInfo[0].split(':');
    context.data= data;
    var email = new Mail();
    var template = new Template('TemplateForEmail');

    email.addTo(customerEmail);
    email.setFrom(Site.current.getCustomPreferenceValue('customerServiceEmail') || 'no-reply@salesforce.com');
    email.setSubject(Resource.msg('subject.newsletter.confirmation.email', 'forms', null));

    email.setContent(template.render(context).text, 'multipart/mixed;boundary=------------000001030701020908040900', 'ISO-8859-1');
    email.send();
}


module.exports = server.exports();

