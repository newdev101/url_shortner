const User = require("../models/user");

const {setUser} = require('../service/auth');

//signup request
async function handleUserSignup(req, res) {
     const {name,email,password}=req.body;
     console.log("signup request received");
     const user = await User.create({
          name,
          email,
          password,
     });     
     const token = setUser(user);
     res.cookie("uid",token);
     console.log("status:success cookiee set")
     return res.redirect('/');
}


//login request
async function handleUserLogin(req, res) {
     const {email,password}=req.body;
     const user = await User.findOne({
          email,
          password,
     });
     console.log(user);
     if(!user){
          return res.render('login',{
               error:"invalid username or password",
          });
     }
     // const sessionId = uuidv4();
     const token = setUser(user);
     res.cookie("uid",token);
     return res.redirect('/');
}



module.exports = {
  handleUserSignup,
  handleUserLogin,
};
