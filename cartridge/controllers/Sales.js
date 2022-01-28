'use strict';

var server = require('server');


server.get('Show', function (req, res, next) {

    let PageMgr = require('dw/experience/PageMgr');

    let page = PageMgr.getPage('sale-page')

    if (page.hasVisibilityRules()) {
        if (page.isVisible())
            res.print(PageMgr.renderPage(page.ID, 'salespage'))
    }
    else{
        res.print(PageMgr.renderPage(page.ID, 'salespage'));
    }

    next();

});

module.exports = server.exports();
