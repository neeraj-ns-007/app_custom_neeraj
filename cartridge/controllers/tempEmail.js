'use strict';

var server = require('server');
var HookMgr = require('dw/system/HookMgr');
var Map = require('dw/util/Map');
server.get('Show', function(req, res, next){
    // send("gehlotramesh71@gmail.com")
    // res.render("/customEmail/emailTemplate");
    res.render('tempEmailInput');
    next();
});

server.post('Start', function(req, res, next){
    // HookMgr.callHook('app.email', 'send', 'gehlotramesh71@gmail.com');
    // send("gehlotramesh71@gmail.com")
    // res.print("email");
    // var entries = "[[Entries]]"
    var data = req.httpParameterMap.parameterNames[0];
    send("gehlotramesh71@gmail.com", data);
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
    context.data= dataArray[1];
    var email = new Mail();
    var template = new Template('/tempEmail');

    email.addTo(customerEmail);
    email.setFrom(Site.current.getCustomPreferenceValue('customerServiceEmail') || 'no-reply@salesforce.com');
    email.setSubject(Resource.msg('subject.newsletter.confirmation.email', 'forms', null));
    // email.setContent(file, 'multipart/mixed', 'UTF-8');
    // email.setContent("sdsdfg", 'text/html', 'UTF-8');
    email.setContent(template.render(context).text, 'text/html', 'UTF-8');
    email.send();
}


module.exports = server.exports();