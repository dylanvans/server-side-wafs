var express = require('express');
var router  = express.Router();
var request = require('request');

router.get('/', function(req, res, next){
	request('https://content.guardianapis.com/search?section=world&show-blocks=all&api-key=cca1dc44-8318-4823-b2e8-ae009aa3941a', function(err, response, body) {
        if (!err && response.statusCode == 200) {
            var locals = JSON.parse(body);
            req.session.data = locals.response.results;
            data = req.session.data;
            res.render('index', data);
        }
    });
});

// Export router to server
module.exports = router;