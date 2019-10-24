const express = require('express'),
    router = express.Router(),
    foodSearch = require('../models/searchModel');


router.get('/', async(req, res, next)=>{
    res.render('template',{
        locals: {
        title: 'Food Log',
        searchResults: false,
        isLoggedIn: req.session.is_logged_in
        },
        partials:{
        partial: 'partial-foodlog'
        }
    });
});

router.post("/search", async(req,res,next)=>{
    const {search} = req.body;
    const searchRes = await foodSearch(search);
    console.log(searchRes);
    res.render('template',{
        locals: {
        title: 'Food Log',
        searchResults: searchRes,
        isLoggedIn: req.session.is_logged_in
        },
        partials:{
        partial: 'partial-foodlog'
        }
    });
});

module.exports = router;