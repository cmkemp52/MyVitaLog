var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', async (req, res, next) => {
  
  res.render('template', {
    locals: {
      title: "MyVitaLog",
      isLoggedIn: req.session.is_logged_in
    },
    partials: {
      partial: "partial-index"
    }
  });
});

module.exports = router;
