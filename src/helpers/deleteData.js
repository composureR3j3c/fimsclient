export default async function deleteData(table,ID) {
    var item={
        table:table,
        ID:ID 
      }
      

    await fetch("http://127.0.0.1:5000/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(item),
      })


}

export async function UpdateCurr(Buy,Sell,ID) {
  var item={
    Buy:Buy,
    Sell:Sell,
    ID:ID,
    nDate:new Date()
    }
    console.log(item)

  await fetch("http://127.0.0.1:5000/buy", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(item),
    })


}
export async function paymentsDet(Invoice) {
  var item={
    Invoice:Invoice
    
    }
    console.log(item)

  var res= await fetch("http://127.0.0.1:5000/payDet", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(item),
    }).then((response) => response.json())
    .then((data) => {return data})
 return res 
}