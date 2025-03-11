import React, { useState } from 'react'

export default function TextForm() {
    const [Text,setText]=useState("enter text here")
    
    const handleUpToLo=()=>{
        let newText=Text.toUpperCase();
        setText(newText)

    }
    const handleLoToUp=()=>{
        let newText=Text.toLowerCase();
        setText(newText)

    }
    const handleOnChange=(event)=>{
        setText(event.target.value)
    }
  return (
  <>
  <div className="container my-2">
    <label htmlFor="exampleFormControlTextarea1" className="form-label">Enter Text</label>
    <textarea className="form-control"  onChange={handleOnChange} value={Text} id="exampleFormControlTextarea1" rows="8"></textarea>
   <div className="buttons mt-3"> <button  type="button" className="btn btn-primary mx-2" onClick={handleUpToLo}>UpperToLower</button>
    <button  type="button" className="btn btn-primary" onClick={handleLoToUp}>LowerToUpper</button></div>
  </div>
  <div className="container my-2">
    <h2>Your Text Summary</h2>
    <p>{Text.split(" ").length} words and {Text.length} characters</p>
  </div>
  </>
  )
}
