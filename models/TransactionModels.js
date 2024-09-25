const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    userid:{
      type: String,
      required: true
    },
    amount: {
      type: Number,
      required: [true, "amount is required"],
    },
    type:{
      type:String,
      required:[true,"type is required"],
    },
    catagory: {
      type: String,
      required: [true, "catagory is required"],
    },
    reference: {
      type: String,
    },
    description: {
      type: String,
      required: [true, "description is required for keep accounts"],
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const transactionModel = mongoose.model(
  "transactions",
  //reference obj..
  transactionSchema
);

module.exports = transactionModel;
