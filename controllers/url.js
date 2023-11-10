const URL = require("../models/url");
const ShortUniqueId = require("short-unique-id");
const uid = new ShortUniqueId();


//for generating new url
async function handleGenerateNewURL(req, res) {
  const Body = req.body;
  console.log(Body);
  if (!Body.url) return res.status(400).json({ error: "url is required" });
  const shortID = uid.rnd(8);
  await URL.create({
    shortId: shortID,
    redirectUrl: Body.url,
    visitHistory: [],
    createdBy:req.user._id,
  });
  console.log(`your url is id= ${shortID}`);
  // const urls = await URL.find({});
  const urls = await URL.find({createdBy:req.user._id});

  //rendered response
  return res.render("home", {
    id: shortID,
    urls: urls,
    input_box:true,
  });


}


//for redirecting
async function handleRedirectURL(req, res) {
  const shortID = req.params.shortID;
  const entry = await URL.findOneAndUpdate(
    {
      shortId: shortID, //be aware of case sensitivity problem
    },
    {
      // pusing the object to the visithistory list
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );

  if (!entry) {
    console.log("status:wrong id");
    return res.status(401).json({ status: "false id" });
  }
  console.log(`we are redirecting you to ${entry.redirectUrl}`);
  res.redirect(entry.redirectUrl);
}


//for analytics
async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  const entry = await URL.findOne({ shortId });
  if (!entry) {
    console.log("status: wrong url");
    return res.status(401).json({ status: "wrong url" });
  }

  console.log(`total clicks =${entry.visitHistory.length}`);
  return res.status(200).json({
    total_clicks: entry.visitHistory.length,
    visitHistory: entry.visitHistory,
  });
}

//for handling statichomepage
async function handleStaticRoute(req, res) {
  const urls = await URL.find({});
  return res.render("home", {
    urls: urls,
    input_box: true,
  });
}

async function handleStaticGenerator(req, res) {
  const Body = req.body;
  console.log(Body);
  if (!Body.url) return res.status(400).json({ error: "url is required" });
  const shortID = uid.rnd(8);
  await URL.create({
    shortId: shortID,
    redirectUrl: Body.url,
    visitHistory: [],
  });
  console.log(`your url is id= ${shortID}`);

  //json response
  // return res.json({ id: shortID });

  const urls = await URL.find({});
  //rendered response
  return res.render("home", {
    id: shortID,
    urls: urls,
  });
}

module.exports = {
  handleGenerateNewURL,
  handleRedirectURL,
  handleGetAnalytics,
  handleStaticRoute,
  handleStaticGenerator,
};
