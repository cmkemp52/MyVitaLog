const express = require("express"),
  bcrypt = require("bcryptjs"),
  router = express.Router();

const UserModel = require("../models/users");



router.get("/", async (req, res, next) =>{
  res.render("template",{
    locals:{
      title:"Login",
      isLoggedIn: req.session.is_logged_in
    },
    partials:{
      partial:"partial-login"
    }
  });
});

router.get("/logout",(req,res,next)=>{
  req.session.destroy();
  res.status(200).redirect("/");
})

router.post("/sign-up", async(req,res,next)=>{
  const {account_name,email_address} = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);

  const user = new UserModel(account_name, email_address, hash);
  const addUser = await user.save();
  if(addUser){
    res.status(200).redirect("/users");
  } else {
    res.status(500);
  }
});

router.post("/login", async(req,res,next)=>{
  const{email_address,password}=req.body;
  const user=new UserModel(null,email_address,password);
  const response = await user.login();
  console.log(response);
  if(!!response.isValid){
    const {account_name} = response;
    req.session.is_logged_in = true;
    req.session.account_name = account_name;
    res.status(200).redirect("/foodlog");
  } else{
    res.sendStatus(401);
  }
});


module.exports = router;
