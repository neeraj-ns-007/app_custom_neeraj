'use strict';

var server = require('server');


server.get('Show', function (req, res, next) {

    let PageMgr = require('dw/experience/PageMgr');

    let page = PageMgr.getPage('highproteinsnacks')

    if (page.hasVisibilityRules()) {
        if (page.isVisible())
            res.print(PageMgr.renderPage(page.ID, 'highproteinsnacks'))
    }
    else{
        res.print(PageMgr.renderPage(page.ID, 'highproteinsnacks'));
    }

    next();

});

module.exports = server.exports();
