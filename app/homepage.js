"use client";
import React, { useState } from "react";
import Link from "next/link";

const InputData = () => {
  const [inputData, setInputData] = useState({
    skidno: "",
    gdno: "",
    ctno: "",
    date: "",
    name: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log("type", inputData);
  };


  return (
    <div className="container">
      <h2>Input Form</h2>
      <form>
        <div className="form-group">
          <label for="input1">Number of skid:</label>
          <input
            onChange={handleInputChange}
            type="number"
            id="input1"
            name="skidno"
            value={inputData.skidno}
          />
        </div>
        <div className="form-group">
          <label for="input2">GD Number:</label>
          <input
            onChange={handleInputChange}
            type="text"
            id="input2"
            name="gdno"
            value={inputData.gdno}
          />
        </div>
        <div className="form-group">
          <label for="input3">CT Number:</label>
          <input
            onChange={handleInputChange}
            type="text"
            id="input3"
            name="ctno"
            value={inputData.ctno}
          />
        </div>
        <div className="form-group">
          <label for="input4">Date:</label>
          <input
            onChange={handleInputChange}
            type="date"
            id="input4"
            name="date"
            value={inputData.date}
          />
        </div>
        <div className="form-group">
          <label for="input5">Operator name:</label>
          <input
            onChange={handleInputChange}
            type="text"
            id="input5"
            name="name"
            value={inputData.name}
          />
        </div>
        <Link href={{pathname:'pdffile',query:inputData}}>
        <button>
          view the label
        </button>
        </Link>
      </form>
    </div>
  );
}

export default inputdata;
