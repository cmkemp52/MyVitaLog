var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', async(req, res, next) => {
    res.render('template', {
        locals: {
        title: "Nutrition info",
        isLoggedIn: req.session.is_logged_in
        },
        partials: {
        partial: "partial-info"
        }
    });
});

module.exports = router;
