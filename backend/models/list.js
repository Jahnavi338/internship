/*const mongoose =require("mongoose");
const listSchema = new mongoose.Schema({
  title:{
    type:String,
    required:true,
  },
  body:{
    type:String,
    required:true,
  },
   user:[{
      type:mongoose.Types.ObjectId,
      ref:"User",
    }],
},
    {timestamps:true}
);

module.exports =mongoose.model("List",listSchema)*/

const mongoose = require("mongoose");

const listSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true,
    maxlength: [200, "Title cannot exceed 200 characters"]
  },
  body: {
    type: String,
    required: [true, "Body is required"],
    trim: true,
    maxlength: [1000, "Body cannot exceed 1000 characters"]
  },
  // Fixed: Changed from array to single ObjectId reference
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: [true, "User reference is required"]
  }
}, {
  timestamps: true
});

// Add index for better query performance
listSchema.index({ user: 1, createdAt: -1 });

module.exports = mongoose.model("List", listSchema);
