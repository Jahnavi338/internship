const router=require("express").Router();
const User=require("../models/user");
const bcrypt=require("bcryptjs");
//sign up

router.post("/register", async(req,res)=>{
  try{
      const {email,username,password} =req.body;
      
      // Input validation
      if (!email || !username || !password) {
        return res.status(400).json({message:"All fields are required"});
      }
      
      // Email format validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({message:"Please enter a valid email address"});
      }
      
      // Password strength validation
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!passwordRegex.test(password)) {
        return res.status(400).json({message:"Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character"});
      }
      
      // Username validation
      if (username.length < 3) {
        return res.status(400).json({message:"Username must be at least 3 characters long"});
      }
      
      const hashpassword=bcrypt.hashSync(password);
      const user=new User({email,username,password:hashpassword});
      await user.save().then(()=>
         res.status(200).json({message:"Signup successful"})
      );
  }catch(err){
      if (err.code === 11000) {
        // Duplicate key error
        if (err.keyPattern.email) {
          res.status(400).json({message:"Email already exists"});
        } else if (err.keyPattern.username) {
          res.status(400).json({message:"Username already exists"});
        } else {
          res.status(400).json({message:"User already exists"});
        }
      } else {
        res.status(500).json({message:"Server error during registration"});
      }
  }
});


//Login
router.post("/signin", async(req,res)=>{
  try{
     const user=await User.findOne({email:req.body.email});
     if(!user){
  return res.status(400).json({message:"please signup first"});
}
const ispasswordCorrect=bcrypt.compareSync(req.body.password,user.password);
if(!ispasswordCorrect){
  return res.status(400).json({message:"password is not correct"});
}

     //we dont want to send password back in the response we will seperate it 
    /* const{password,...others}=user._doc;
      res.status(200).json({others});
  }catch(err){
      
       res.status(200).json({message:"User already exits"});
  }*/
 res.status(200).json({
      message: "Login successful",
      user_id: user._id,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports =router;
