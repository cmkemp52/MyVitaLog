const express = require('express'),
    router = express.Router(),
    foodSearch = require('../models/searchModel'),
    foodData = require('../models/nutritionModel'),
    logAdd = require('../models/logAdd');


router.get('/', async(req, res, next)=>{
    res.render('template',{
        locals: {
        title: 'Food Log',
        searchResults: false,
        info: false,
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
    res.render('template',{
        locals: {
        title: 'Food Log',
        searchResults: searchRes,
        info: false,
        isLoggedIn: req.session.is_logged_in
        },
        partials:{
        partial: 'partial-foodlog'
        }
    });
});

router.post("/nutritiondata", async(req,res,next)=>{
    const {id} = req.body;
    const foodInfo = await foodData(id);
    res.render('template',{
        locals: {
        title: 'Food Log',
        searchResults: false,
        info: foodInfo,
        isLoggedIn: req.session.is_logged_in
        },
        partials:{
        partial: 'partial-foodlog'
        }
    });
});

router.post("/log", async(req,res,next)=>{
    logAdd(Object.entries(req.body), req.session.account_id);
    res.status(200).redirect("/");
});

module.exports = router;