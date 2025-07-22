/*const router = require("express").Router();
const User = require("../models/user");
const List = require("../models/list");

router.post("/addTask", async (req, res) => {
  try {
    const {title,body}=req.body;
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }
    // Check for duplicate task
    const existingTask = await List.findOne({ title, body, user: existingUser._id });
    if (existingTask) {
      return res.status(400).json({ message: "Task already exists" });
    }
    //creating tasks
    const list = new List({ title, body, user: existingUser._id });
    await list.save();
    existingUser.list.push(list._id);
    await existingUser.save();
    res.status(200).json({ message: "Task added successfully", list });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
});

//update tasks
router.put("/updateTask/:id", async (req, res) => {
  try {
    const { title, body} = req.body;
    const existingUser = await User.findById({ id });
    if (existingUser) {
      //updating
    const list=await List.findByIdAndUpdate(req.params.id,{title,body},{ new: true });
    list.save().then(()=> res.status(200).json({message:"Task updated"}));
    
    } 
  } catch (error) {
    console.log(error);
    
  }
});
router.put("/updateTask/:id", async (req, res) => {
  try {
    const { title, body } = req.body;
    const updatedTask = await List.findByIdAndUpdate(
      req.params.id,
      { title, body },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task updated successfully", updatedTask });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to update task", error: error.message });
  }
});


//delete tasks
router.delete("/deleteTask/:id", async (req, res) => {
  try {
    const {id } = req.body;
    const existingUser = await User.findByIdAndUpdate(id,{$pull:{list:req.params.id}});
    if (existingUser) {
      //updating
    const list=await List.findByIdAndDelete(req.params.id).then(()=> res.status(200).json({message:"Task deleted"}));
    
    } 
  } catch (error) {
    console.log(error);
    
  }
});
//getTask
router.get("/getTasks/:id",async(req,res)=>{
  const list=await List.find({user:req.params.id}).sort({createdAt:-1});
 if(list.length!=0){
  res.status(200).json({list:list});
 }
 else{
  res.status(200).json({message:"No tasks"});
 }
});

module.exports = router;*/

const router = require("express").Router();
const User = require("../models/user");
const List = require("../models/list");

router.post("/addTask", async (req, res) => {
  try {
    const { title, body, id } = req.body; // Fixed: Added id from request body
    
    // Fixed: Find the user first
    const existingUser = await User.findById(id);
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }
    
    // Validate input
    if (!title || !body) {
      return res.status(400).json({ message: "Title and body are required" });
    }
    
    // Check for duplicate task
    const existingTask = await List.findOne({ 
      title: title.trim(), 
      body: body.trim(), 
      user: existingUser._id 
    });
    if (existingTask) {
      return res.status(400).json({ message: "Task already exists" });
    }
    
    // Creating tasks
    const list = new List({ 
      title: title.trim(), 
      body: body.trim(), 
      user: existingUser._id 
    });
    await list.save();
    existingUser.list.push(list._id);
    await existingUser.save();
    res.status(200).json({ message: "Task added successfully", list });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
});

// Fixed: Update tasks route with better error handling
router.put("/updateTask/:id", async (req, res) => {
  try {
    const { title, body } = req.body;
    
    // Validate input
    if (!title || !body) {
      return res.status(400).json({ message: "Title and body are required" });
    }
    
    // Validate ObjectId format
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid task ID format" });
    }
    
    const updatedTask = await List.findByIdAndUpdate(
      req.params.id,
      { 
        title: title.trim(), 
        body: body.trim() 
      },
      { new: true, runValidators: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ 
      message: "Task updated successfully", 
      updatedTask 
    });
  } catch (error) {
    console.log(error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        message: "Validation error", 
        error: error.message 
      });
    }
    res.status(500).json({ 
      message: "Failed to update task", 
      error: error.message 
    });
  }
});

// Fixed: Delete tasks route with better error handling
router.delete("/deleteTask/:id", async (req, res) => {
  try {
    const { id } = req.body; // User ID from request body
    
    if (!id) {
      return res.status(400).json({ message: "User ID is required" });
    }
    
    // Validate ObjectId format
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid task ID format" });
    }
    
    const existingUser = await User.findByIdAndUpdate(
      id,
      { $pull: { list: req.params.id } },
      { new: true }
    );
    
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }
    
    const deletedTask = await List.findByIdAndDelete(req.params.id);
    
    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ 
      message: "Failed to delete task", 
      error: error.message 
    });
  }
});

// Fixed: Get tasks route with better error handling
router.get("/getTasks/:id", async (req, res) => {
  try {
    // Validate ObjectId format
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid user ID format" });
    }
    
    const list = await List.find({ user: req.params.id }).sort({ createdAt: -1 });
    
    if (list.length !== 0) {
      res.status(200).json({ list: list });
    } else {
      res.status(200).json({ message: "No tasks found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ 
      message: "Failed to fetch tasks", 
      error: error.message 
    });
  }
});

module.exports = router;

