const mongoose = require("mongoose");
const connectdb = async()=>{
   try {

    await mongoose.connect(process.env.MONGO_URL);
    console.log(`Server Running on ${mongoose.connection.host}`);
    console.log("MongoDB Connected successfully!!...");
    
   } catch (error) {
    console.error(`${error}`.bgGreen);
   }
}

// // Example to add a sample document
// const transactionSchema = new mongoose.Schema({
//     name: String,
//     amount: Number,
//   });
  
//   const Transaction = mongoose.model('Transaction', transactionSchema);
  
//   // Insert a sample document
//   Transaction.create({ name: "Sample", amount: 100 });


module.exports = connectdb;