import React, { useState, useEffect } from "react";
import deleteData, { UpdateCurr } from "../../helpers/deleteData";
import Modal from "react-modal";

// import LC from "./linecharts/lineCt";
import "../spinner.css";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    background: "#0f0c29" /* fallback for old browsers */,
    background:
      "linear-gradient(109.6deg, rgba(0, 0, 0, 0.93) 11.2%, rgb(7, 23, 31) 78.9%)",
    color: "white",
    width: "40%",
    padding:"60px"
  },
};

// export var graphPoints=[]

export default function Currency() {
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const[ModalTitle,setModalTitle]=useState()
  const[ModalId,setModalId]=useState()
  const[ModalBuy,setModalBuy]=useState()
  const[ModalSell,setModalSell]=useState()

  function openModal(id,name,rate ,sell) {
    console.log("id##################",id)
    setModalTitle(name)
    setModalId(id)
    setModalBuy(rate)
    setModalSell(sell)
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#ffffff";
  }

  function closeModal() {
    setIsOpen(false);
  }

  const [Div1Class, setDiv1Class] = useState(
    "row justify-content-center d-flex align-items-center "
  );
  const [btnClass, setBtnClass] = useState("btn btn-primary m-2  mb-3");

  const [TimeDiffColor, setTimeDiffColor] = useState("text text-primary");

  const [Buy, setBuy] = useState();
  const [Sell, setSell] = useState();

  const[ID,setID]=useState()

  const [Spinner, setSpinner] = useState(
    <div className="spinner-container">
      <div className="loading-spinner"></div>
    </div>
  );
  const [bodyTable, setbodyTable] = useState([]);

  const [ErrorMessage, setErrorMessage] = useState("");
  const [Ttype, setTtype] = useState("Apollo");

  var transactionType = {};

  async function loadBody() {
    setbodyTable([]);
    bodyTable1 = [];
    setSpinner(
      <div className="spinner-container mb-3">
        <div className="loading-spinner"> </div>
      </div>
    );
    await fetch("http://127.0.0.1:5000/currency", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        setbodyTable(data.dbData);
        var responseArray = data.dbData;
        console.log(bodyTable);
        setSpinner("");
      })
      .catch((data) => {
        //console.log(data);
        setErrorMessage("Can't handle request now, please try again later");
      });
  }
var currName=[]
var currID=[]
  var bodyTable1 = bodyTable.map((res) => {
    currName.push(res.Name)
    currID.push(res.ID)
    return (
      <tr key={res.sell}>
        <td>{res.Code}</td>
        <td>{res.Name}</td>

        <td>Br. {res.Rate}</td>
        <td>Br. {res.Sell}</td>
        <td>{res.Date}</td>

        <td>
          <button
            onClick={() => {
              openModal(res.ID,res.Name,res.Rate,res.Sell);
            }}
            className="btn btn-warning"
          >
            Update 
          </button>
          <div className="container col-lg-6 ">
            <Modal
              isOpen={modalIsOpen}
              onAfterOpen={afterOpenModal}
              onRequestClose={closeModal}
              style={customStyles}
            >
              <h2
                ref={(_subtitle) => (subtitle = _subtitle)}
                className="m-2 p-3"
              >
                {ModalTitle}
              </h2>
              <div className="m-3 p-3">
                <input
                  type="number"
                  className="form-control m-3 w-75 mb-3"
                  placeholder="Enter New Buying Rate"
                  value={ModalBuy}
                  onChange={(e) => {
                    setModalBuy(e.target.value)
                    setBuy(e.target.value);
                  }}
                />

                <input
                  type="number"
                  className="form-control m-3  w-75"
                  placeholder="Enter New Buying Rate"
                  value={ModalSell}
                  onChange={(e) => {
                    setSell(e.target.value);
                    setModalSell(e.target.value);
                  }}
                />
              </div>
              <button
                onClick={() => {
                  UpdateCurr(Buy,Sell,ModalId);
                  closeModal();
                  window.location.reload(false);
                }}
                className="btn btn-success m-3 con d-flex flex-row-reverse"
              >
                Submit
              </button>
            </Modal>
          </div>
        </td>
      </tr>
    );
  });

  useEffect(() => {
    let ignore = false;

    if (!ignore) loadBody();
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <div className="container">
      {/* <form  method="post"> */}
      <div className="">
        {/* <img src={image} width="320" height="180" className="mb-3" /><br /> */}

        <div className={Div1Class}>
          <div className="col-lg-12 ">
            {/* <p>{Ttype} API calls</p> */}
            {/*             
            <button onClick={loadBody} type="reload" className={btnClass}>
              Refresh
            </button> */}
          </div>
        </div>
      </div>

      <div name="cred" className={Div1Class}>
        <div className="col-lg-12 ">
          {Spinner}
          {/* <LC/> */}
          <table className="table table-striped table-dark p-2">
            <thead>
              <tr>
                <th scope="col">
                  <p className="p-2">Currency Code</p>
                </th>
                <th scope="col">
                  <p className="p-2">Currency Name</p>
                </th>
                <th scope="col">
                  <p className="p-2">Buying Rate</p>
                </th>
                <th scope="col">
                  <p className="p-2">Selling Rate</p>
                </th>
                <th scope="col">
                  <p className="p-2">Date Of Entry</p>
                </th>

                <th></th>
              </tr>
            </thead>
            <tbody>{bodyTable1}</tbody>
            <tfoot>
              <tr>
                {/* <td>total</td>
                <td></td><td></td>
                <td>{totalIN}</td>
                <td>{totalOut}</td>
                <td>{OverallBal}</td>
                 */}
              </tr>
            </tfoot>
          </table>
          <div className="text-danger">{ErrorMessage}</div>
        </div>
      </div>
    </div>
  );
}
