import React, { Component } from 'react';
import LineChart from 'react-linechart';
import '../../node_modules/react-linechart/dist/styles.css';
import { useEffect,useState } from 'react';



export default  function LC() {


    const [graphPoints, setgraphPoints] = useState([]);

    
  useEffect(() => {
    let ignore = false;
    
    if (!ignore) {loadBody(); }
    return () => {
      ignore = true;
    };
  }, []);

    async function loadBody() {
       
        await fetch("http://127.0.0.1:5000/profit", {
          method: "GET",
        })
          .then((response) => response.json())
          .then((data) => {
            
            console.log(data);
            var gPs=[]
            var responseArray =data.dbData;
            var i=1;
            var bal=0
            responseArray.map((res) => {
            bal=(res.Type=="Expense")? bal-res.Amount:bal+res.Amount
                gPs.push({x:i,y:bal
                })
                i++
            })
            setgraphPoints(gPs)
          })
          .catch((data) => {
            //console.log(data);
          });
      }
      
      
//  var graphPoints=[{x:1,y:3},{x:2,y:2},{x:3,y:2},{x:4,y:2},{x:5,y:5},{x:6,y:1}] 
    var data = [
        {									
            color: 'green', 
            points: graphPoints
        }
    ];
    return (
        <div className='d-flex justify-content-center'>
            <div className="LC bg-warning d-flex justify-content-center mb-2 p-2">
                {/* <h6>Respose Time </h6> */}
                <LineChart 
                    width={900}
                    height={300}
                    data={data}
                    // xLabel={"Time"}
                    // yLabel={"Amount"}
                    hideXLabel={true}
                    hideYLabel={true}
                    pointRadius={3}
                    onPointClick={(event, point) => console.log(point)}
                />
            </div>				
        </div>
    );
}
