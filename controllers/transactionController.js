const transactionModel = require("../models/TransactionModels");
const transactionmodels = require("../models/TransactionModels");
const moment = require("moment");
const getAlltransanction = async (req,res) => {
    try {
      //destructuring.........
      const {frequency,selectedDate,type} = req.body
        const transactions = await transactionmodels.find({
          ...(frequency !== 'custom' ? {
            date:{
              $gt: moment().subtract(Number(frequency), 'd').toDate()
          },
          }:{
            date:{
              $gte: selectedDate[0],
              $lte: selectedDate[1]
              }
          }),
          //get transaction of particular id/person..
          
          userid:req.body.userid,
          ...(type !=='all'  && {type})
        })
        res.status(200).json(transactions);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

const addTransactions = async (req, res) => {
  try {
    const newTransaction = new transactionmodels(req.body);
    await newTransaction.save();
    res.status(201).send("Transaction Created");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const EditTransaction = async(req,res)=>{
  try {
    await transactionModel.findOneAndUpdate({
      _id:req.body.transactionId
    },
    req.body.payload
  );
  res.status(200).json("Transaction Updated");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}
const DeleteTransaction = async(req,res)=>{
  try {
    await transactionModel.findByIdAndDelete({
      _id:req.body.transactionId
    })
    res.status(200).json("Transaction deleted!");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}
module.exports = { getAlltransanction, addTransactions,EditTransaction,DeleteTransaction };
