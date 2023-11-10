const express = require('express');

const {handleGenerateNewURL, handleGetAnalytics} = require('../controllers/url');

const router = express.Router();


router.post('/',handleGenerateNewURL);
// router.get('/:shortID',handleRedirectURL);
router.get('/analytics/:shortId',handleGetAnalytics)

module.exports=router;