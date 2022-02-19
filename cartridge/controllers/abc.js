'use strict';

var server = require('server');
var HookMgr = require('dw/system/HookMgr');
var Map = require('dw/util/Map');
server.get('Show', function(req, res, next){
    // send("neerajsharma@cyntexa.com")
    // res.render("/customEmail/emailTemplate2");
    res.render('customEmail/emailInput');
    next();
});

server.post('Start', function(req, res, next){
    // HookMgr.callHook('app.email', 'send', 'gehlotramesh71@gmail.com');
    // send("gehlotramesh71@gmail.com")
    // res.print("email");
    // var entries = "[[Entries]]"
    var data = req.httpParameterMap.requestBodyAsString;
    // send("gehlotramesh71@gmail.com", data);
    send("neerajsharma@cyntexa.com", data);
    res.print("done")
    // .processMultipart(callback);
    // var map = new Map(req.httpHeaders)
    // var contains = map.containsKey("[[Entries]]");
    // var body = data;
    // res.json({
    //     data:data,
    //     req:req
    // });
    // function callback(data_custom, data2, data3){
    //     res.print(data_custom + " and " + data2 + " and " + data3);
    // }
    next();
});

// server.get("Send", function(req ,res, next){
//     res.render("customEmail/emailTemplate");
//     next();
// });

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
    context.data = dataArray[1];
    context.fileType = fileType[1];
    context.fileName = dataArray[2];
    var email = new Mail();
    var template = new Template('/customEmail/tempEmailTemplate');
    // var template = new Template('/customEmail/emailTemplateToSend');
    // var template = new Template('/customEmail/emailTemplate2');

    email.addTo(customerEmail);
    email.setFrom(Site.current.getCustomPreferenceValue('customerServiceEmail') || 'no-reply@salesforce.com');
    email.setSubject(Resource.msg('subject.newsletter.confirmation.email', 'forms', null));
    // email.setContent(file, 'multipart/mixed', 'UTF-8');
    // email.setContent("sdsdfg", 'text/html', 'UTF-8');
    email.setContent(template.render(context).text, 'multipart/mixed;boundary=------------000001030701020908040900', 'ISO-8859-1');
    // email.setContent(template.render(context).text, 'text/html', 'UTF-8');
    email.send();
}


module.exports = server.exports();