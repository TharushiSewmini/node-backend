const mongoose = require("mongoose");
const bcrypt = require("bcrypt")
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
    },
    createdAt :{
        type : Date ,
        default : Date.now
    }
  } ,{
    timestamps : true
  }
);

userSchema.pre("save" , async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password , 10)
    next();
});

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password , this.password);
};

const userModel = mongoose.model("users", userSchema);
module.exports = userModel;
