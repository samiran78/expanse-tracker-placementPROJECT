const express = require("express");

const { addTransactions, getAlltransanction, EditTransaction, DeleteTransaction } = require("../controllers/transactionController");

//router object..
const router = express.Router();
//routes...
//addtransaction by POST

router.post('/add-transaction', addTransactions);

//gettransactions by GET
router.post('/get-transaction', getAlltransanction);
//Edit transaction..
router.post('/edit-transaction',EditTransaction);
//delete transaction..
router.post('/delete-transaction', DeleteTransaction);

module.exports = router;

