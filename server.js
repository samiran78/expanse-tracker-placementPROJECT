const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectdb = require("./config/connectDB");
//config dotenv file....
dotenv.config();


//database call..
connectdb();

const userroutes = require("./routes/UserRoutes")
const transactionRoutes = require("./routes/transactRoutes")
//rest object..
const app = express();


//midddlewares..
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
//useerroutes....
app.use("/api/users", userroutes);
//transactionroutes....
app.use("/api/transactions",transactionRoutes);

//routes..
app.get('/',(req,res)=>{
  res.send("<h1>heyy server!!</h1>")
})

//PORT
const PORT = 8080  || process.env.PORT;

//listen...
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

