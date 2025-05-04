import React from 'react'
import TextForm from "./TextForm"


export  function DropdownButton({ toggleDropdown }) {

    return (
        <button className="btn btn-primary dropdown-btn" onClick={toggleDropdown}>
        Dropdown ⏷
      </button>
    );
  }
  export default function Dropdown({handleUpToLo , handleLoToUp , handleReverse ,Text ,setText}) {
  
    return (
     <> <ul className="dropdown-menu show">
        <li className="dropdown-item" onClick={(handleUpToLo)} >UpperToLower </li>
        <li className="dropdown-item" onClick={(handleLoToUp)}>LowerToUpper</li>
        <li className="dropdown-item" onClick={(handleReverse)}>Reverse</li>
        <li className="dropdown-item" onClick={(handleUpToLo)}>CopyToClipboard</li>
        <li className="dropdown-item" onClick={(handleUpToLo)}>RemoveExtraSpace</li>
        <li className="dropdown-item" onClick={(handleUpToLo)}>RemoveSpecialChar</li>
        <li className="dropdown-item" onClick={(handleUpToLo)}>FindAndReplace</li>
        
      </ul>
      <TextForm/> 
      </>
  
    );
}