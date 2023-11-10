const URL = require("../models/url");

async function handleStaticHome(req, res) {
  if(!req.user) return res.redirect('login');
  const urls = await URL.find({createdBy:req.user._id});
  var input_box=true;
  if(!urls)input_box=false;
  return res.render("home", {
    urls: urls,
    input_box,
  });
}

module.exports={
     handleStaticHome,
};
