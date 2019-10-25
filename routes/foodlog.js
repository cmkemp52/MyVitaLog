const express = require('express'),
    router = express.Router(),
    foodSearch = require('../models/searchModel'),
    foodData = require('../models/nutritionModel.js');


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
    console.log(req.body);
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

router.post("/nutritiondata", async(req,res,next)=>{
    const {id} = req.body;
    const searchRes = await foodData(id);
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