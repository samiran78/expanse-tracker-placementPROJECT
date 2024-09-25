import React from 'react'
import {Progress} from "antd";
const Analytics = ({alltransactions}) => {
    //array of catagories..
    const catagory = ['Salary','cashback','travelling','food','recharge','bills','tip','borrow','medicine','asyourwish']
    const totaltransaction = alltransactions.length;
    const totalincometransaction = alltransactions.filter(transaction=>transaction.type === 'income')
    const totalexpansetransaction = alltransactions.filter(transaction=>transaction.type === 'expanse')
    //percentage........
    const incomepercentage = (totalincometransaction.length/ totaltransaction) * 100
    const expansepercentage = (totalexpansetransaction.length/ totaltransaction) * 100


    //total turnover..
    const totalturnover = alltransactions.reduce((acc, transaction) => acc + transaction.amount,0)
    //total incometurnover....
    const totalincometurnover = alltransactions.filter(transaction=>transaction.type === 'income').reduce((acc,transaction)=>acc+transaction.amount,0)
    //total expenseturnover....
    const totalexpenseturnover = alltransactions.filter(transaction=>transaction.type === 'expanse').reduce((acc,transaction)=>acc+transaction.amount,0)
    //percentage turnover calculation.......
    const totalIncomeTURNOVER = (totalincometurnover/totalturnover)*100;
    const totalExpanseTURNOVER = (totalexpenseturnover/totalturnover)*100;
  return (

   <>
<div className='row m-3'>
    <div className='col-md-4'>
        <div className='card'>
            <div className='card-header'>
                Total Transaction : {totaltransaction}
            </div>
            <div className='card-body'>
                <h5 className='text-success'>
                    Income : {totalincometransaction.length}
                </h5>
                <h5 className='text-denger'>
                    Expanse : {totalexpansetransaction.length}
                </h5>
                <div>
                    <Progress type="circle"  strokeColor={'green'} percent={incomepercentage.toFixed(0)} />
                    <Progress type="circle" strokeColor={'yellow'} percent={expansepercentage.toFixed(0)} />
                </div>
            </div>

        </div>
    </div>
    <div className='col-md-4'>
        <div className='card'>
            <div className='card-header'>
                Total Turnover : {totalturnover}
            </div>
            <div className='card-body'>
                <h5 className='text-success'>
                    Income : {totalincometurnover}
                </h5>
                <h5 className='text-denger'>
                    Expanse : {totalexpenseturnover}
                </h5>
                <div>
                    <Progress type="circle"  strokeColor={'green'} percent={totalIncomeTURNOVER.toFixed(0)} />
                    <Progress type="circle" strokeColor={'yellow'} percent={totalExpanseTURNOVER.toFixed(0)} />
                </div>
            </div>

        </div>
    </div>
</div>
<div className='row mt-3'>
  <div className='col-md-5'>
    <h4>Category-wise Income</h4>
    {
      catagory.map((categoryy, index) => {
        const amount = alltransactions
          .filter(transaction => transaction.type === 'income' && transaction.category === categoryy)
          .reduce((acc, transaction) => acc + transaction.amount, 0);

        return (
          <div className='card' key={index}>
            <div className='card-body'>
              <h5>{categoryy}</h5>
              <Progress percent={((totalIncomeTURNOVER/amount) * 100).toFixed(0)} />
            </div>
          </div>
        );
      })
    }
  </div>
  <div className='col-md-5'>
    <h4>Category-wise Expanse</h4>
    {
      catagory.map((categoryy, index) => {
        const amountt = alltransactions
          .filter(transaction => transaction.type === 'expense' && transaction.category === categoryy)
          .reduce((acc, transaction) => acc + transaction.amount, 0);

        return (
          <div className='card' key={index}>
            <div className='card-body'>
              <h5>{categoryy}</h5>
              <Progress percent={((amountt / totalexpenseturnover) * 100).toFixed(0)} />
            </div>
          </div>
        );
      })
    }
  </div>
</div>

   </>
  )
}

export default Analytics
