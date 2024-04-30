import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddPayment() {


  const [tType, settType] = useState("");
  const [Invoice, setInvoice] = useState("");
  const [Amount, setAmount] = useState("");
  
  const [ErrorMessage, setErrorMessage] = useState("");
  let history = useNavigate();

  async function addItem(params) {
    var item={
      pDate:new Date(),
      Amount:Amount,
      Invoice:Invoice
    }
    await fetch("http://127.0.0.1:5000/pay", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(item),
    })
    .then((response) => response.json())
    .then((data) => {

    }).catch((data) => {
      
      setErrorMessage("Can't handle request now, please try again later");
    });
    history('/')
  }

  return (
    <div className="container col-md-5">
    <div className="row justify-content-center p-3 rounded  bg-secondary m-3 ">
      <div className="col-md-8">
      <select
      //  label="Transaction Type"
              className="form-control dropdown-toggle m-3"
               id="mySelect"  onChange={(e)=>{ e.preventDefault(); settType(e.target.value); 
              
              }} 
                >
                  <option>--- Select Type ---</option>
              <option value="Expense" >Reciveable</option>
              <option value="Income"> Payable</option>
              
            </select>
      <input
        type="number"
        className="form-control m-3"
        placeholder="Enter Amount"
        value={Amount}
        onChange={(e) => {setAmount(e.target.value)}}
      />
      <input
        type="text"
        className="form-control m-3"
        placeholder="Enter Invoice"
        value={Invoice}
        onChange={(e) => {setInvoice(e.target.value)}}
      />
      {ErrorMessage}
      <button onClick={addItem} className='btn btn-success'>ADD</button>
      </div>
    </div>
    </div>
  );
}