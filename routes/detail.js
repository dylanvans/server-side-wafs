var express = require('express');
var router  = express.Router();

router.get('/:id', function(req, res, next){
	req.session.data.forEach(function(article) {
		if(req.params.id == article.blocks.body[0].id) {
			data = article;
			res.render('detail', data);
		}
	});
});

// Export router to server
module.exports = router;