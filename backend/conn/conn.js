const mongoose=require("mongoose");
const conn=async(req,res)=>{
  await mongoose.connect("mongodb+srv://honeyy9125:mongo%40123@cluster0.dlib1mn.mongodb.net/").then(()=>{
    console.log("connected");
  })
  
}
conn()
