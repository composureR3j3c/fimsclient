import React, { useState, useEffect } from "react";
import LC from "../helpers/lineCt";
export default function Home() {
  return (
    <div>
      <p className="text-light">Profit</p>
      <LC color="green"/> 
      {/* <p className="text-light">Fixed Asset</p> */}
      {/* <LC />
      <p className="text-light">Account Payable</p>
      <LC />
      <p className="text-light">Account Receivable</p>
      <LC /> */}
    </div>
  );
}
