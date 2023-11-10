const express = require('express');
const {handleStaticRoute, handleStaticGenerator, handleRedirectURL} = require('../controllers/url');
const {handleStaticHome} = require('../controllers/home')
const router = express.Router();


//signup page
router.get('/signup',async (req,res)=>{
     return res.render('signup');
});

//sigin page
router.get('/login',(req,res)=>{
     return res.render('login');
});

//redirect url
router.get('/:shortID',handleRedirectURL);

// static home
router.get('/',handleStaticHome);

//??
router.post('/',handleStaticGenerator);


module.exports=router;
