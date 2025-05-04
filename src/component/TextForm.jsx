import React, { useState } from "react";

export default function TextForm() {
  const [Text, setText] = useState("enter text here");
  const [showFindText, setshowFindText] = useState(false);
  const [showReplaceText, setShowReplaceText] = useState(false);
  const [findingText, setFindingText] = useState("Find");
  const [replacedText, setReplacedText] = useState("Replace");

  //onChanging
  const handleOnTextInput = (event) => {
    setText(event.target.value);
  };  
  const handleOnFindText = (event) => {
    setFindingText(event.target.value);
  };

  const handleOnReplaceText = (event) => {
    setReplacedText(event.target.value);
  };

  //upperCase
  const handleUpToLo = () => {
    let newText = Text.toUpperCase();
    setText(newText);
  };
  //lowercase
  const handleLoToUp = () => {
    let newText = Text.toLowerCase();
    setText(newText);
  };
  //capitalFirstLetter
  const handleCapitalFirst = () => {
    let capitalFirst = Text.charAt(0).toUpperCase() + Text.slice(1);
    setText(capitalFirst);
  };
  //copy
  const handleCopyClipboard = () => {
    navigator.clipboard.writeText(Text);
    console.log(Text);
  };
  //Reverse
  const handleReverse = () => {
    let reverseText = Text.split("").reverse().join("");
    setText(reverseText);
  };
  //findAndReplace
  const handleFindReplace = () => {
    setshowFindText(true);
    console.log("start finding...");
  };
  const handleFind = () => {
    if (Text.search(findingText) !== -1) {
      console.log("text find ", findingText);
      setShowReplaceText(true);
    } else {
      console.log("not-found");
    }
  };
  const handleReplace = () => {
    let updatedText = Text.replace(new RegExp(findingText, "g"), replacedText);
    setText(updatedText);
    console.log("changed", updatedText);
  };

  // removeSpaces
  const handleRemoveSpaces = () => {
    let splitText = Text.split(/[ ]+/);
    setText(splitText.join(" "));
  };
  // RemoveSpecialChar
  const handleRemoveSpecialChar = () => {
    let specialText =Text.replace(/[^a-zA-Z0-9\s]/g, ' ')
    setText(specialText)
  };
  return (
    <>
      <div className="container my-2">
        <label htmlFor="exampleFormControlTextarea1" className="form-label">
          Enter Text
        </label>
        <textarea
          className="form-control"
          onChange={handleOnTextInput}
          value={Text}
          id="exampleFormControlTextarea1"
          rows="8"
        ></textarea>
        <div className="buttons mt-3">
          <button
            type="button"
            className="btn btn-primary mx-2"
            onClick={handleUpToLo}
          >
            UpperToLower
          </button>
          <button
            type="button"
            className="btn btn-primary mx-2"
            onClick={handleLoToUp}
          >
            LowerToUpper
          </button>
          <button
            type="button"
            className="btn btn-primary mx-2"
            onClick={handleReverse}
          >
            Reverse
          </button>

          <button
            type="button"
            className="btn btn-primary mx-2"
            onClick={handleFindReplace}
          >
            FindAndReplace
          </button>
          {showFindText && (
            <div
              style={{
                position: "fixed",
                top: "20px",
                right: "20px",
                background: "white",
                padding: "10px",
                borderRadius: "8px",
                boxShadow: "0 0 10px rgba(0,0,0,0.2)",
                display: "flex",
                gap: "5px",
                alignItems: "center",
              }}
            >
              <input
                className="form-control"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={findingText}
                onChange={handleOnFindText}
              />
              <button className="btn btn-outline-success" onClick={handleFind}>
                Find
              </button>
              <button
                className="btn btn-outline-danger"
                onClick={() => setshowFindText(false)}
              >
                ×
              </button>
            </div>
          )}
          {showReplaceText && (
            <div
              style={{
                position: "fixed",
                top: "80px",
                right: "20px",
                background: "white",
                padding: "10px",
                borderRadius: "8px",
                boxShadow: "0 0 10px rgba(0,0,0,0.2)",
                display: "flex",
                gap: "5px",
                alignItems: "center",
              }}
            >
              <input
                className="form-control"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={replacedText}
                onChange={handleOnReplaceText}
              />
              <button
                className="btn btn-outline-success"
                onClick={handleReplace}
              >
                Change
              </button>
              <button
                className="btn btn-outline-danger"
                onClick={() => setShowReplaceText(false)}
              >
                ×
              </button>
            </div>
          )}
          <button
            type="button"
            className="btn btn-primary mx-2"
            onClick={handleCopyClipboard}
          >
            CopyToClipboard
          </button>
          <button
            type="button"
            className="btn btn-primary mx-2"
            onClick={handleRemoveSpaces}
          >
            RemoveExtraSpace
          </button>
          <button
            type="button"
            className="btn btn-primary mx-2"
            onClick={handleCapitalFirst}
          >
            CapitalFirstLetter
          </button>
          <button
            type="button"
            className="btn btn-primary mx-2 mt-4"
            onClick={handleRemoveSpecialChar}
          >
            RemoveSpecialChar
          </button>
        </div>
      </div>
      <div className="container my-2">
        <h2>Your Text Summary</h2>
        <p>
          {Text.split(" ").length} words and {Text.length} characters
        </p>
      </div>
    </>
  );
}
