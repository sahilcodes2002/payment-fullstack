const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://codessahil:PvxGwLdbxpwarmlR@cluster0.vkpiqoz.mongodb.net/paytmDB")


const userschema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
})

const accountschema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref:'User', required:true},
    balance: {type: Number , required: true}
})

const Account = mongoose.model("Account",accountschema);

const User = mongoose.model("User",userschema);

module.exports={
    User,
    Account
}