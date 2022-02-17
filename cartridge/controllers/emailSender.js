'use Strict';

var server = require('server'); 

server.get('Start', function(req, res, next){
    send('neerajsharma@cyntexa.com');
    res.print('okay!!!')
    next();
});
function send(customerEmail) {
    var HashMap = require('dw/util/HashMap');
    var Mail = require('dw/net/Mail');
    var Resource = require('dw/web/Resource');
    var Site = require('dw/system/Site');
    var Template = require('dw/util/Template');

    var context = new HashMap();
    var email = new Mail();
    var template = new Template('TemplateForEmail');

    email.addTo(customerEmail);
    email.setFrom(Site.current.getCustomPreferenceValue('customerServiceEmail') || 'no-reply@salesforce.com');
    email.setSubject(Resource.msg('subject.newsletter.confirmation.email', 'forms', null));
    email.setContent(template.render(context).text, 'text/html', 'UTF-8');
    email.send();
}


module.exports = server.exports();