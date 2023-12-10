'use client'
import { useEffect, useState } from "react";
import { useSearchParams,useRouter } from 'next/navigation';

const Numbers = () => {
  const searchPharams = useSearchParams()
  const [printData,setPrintdata] = useState()
  const [gdno,setGdno] = useState()
  const [ctno,setCtno] = useState()
  const [date,setDate] = useState()
  const [name,setName] = useState()
  const numbers = [];
  const router = useRouter()

  const generateNumbers = () => {
    for (let i = 1; i <= printData; i++) {
      numbers.push(i);
    }

    return numbers;
  };
  


  useEffect(() => {
    setPrintdata(searchPharams.get('skidno'))
    setGdno(searchPharams.get('gdno'))
    setCtno(searchPharams.get('ctno'))
    setDate(searchPharams.get("date"))
    setName(searchPharams.get('name'))
  }),[]

  const numbersArray = generateNumbers();

  return (
    <>
    {numbersArray.map((number) => (
    <div className="mainContainer">
          <div className="labelcontainer">
          <div className="skidlabel">
            <h1>Skid Label</h1>
          </div>
          <div className="ctp">
            <table className="tableone">
              <tr>
                <td></td>
                <td></td>
                <td>Skid No.</td>
                <td key={number}>{number}</td>
              </tr>
              <tr>
                <td>
                  ERP#
                  <br />
                  GD Number
                </td>
                <td>GD{gdno}</td>
                <td>CT Number</td>
                <td>CT{ctno}</td>
              </tr>
            </table>
          </div>
          <div className="ctp2">
            <table className="tabletwo">
              <tr>
                <td>Die-cutting qty</td>
                <td></td>
                <td>Date</td>
                <td>{date}</td>
                <td>Operator name</td>
                <td>{name}</td>
              </tr>
            </table>
          </div>
          <div className="ctp3">
            <table className="tablethree">
              <tr>
                <td>Windowing qty</td>
                <td></td>
                <td>Date</td>
                <td></td>
                <td>Operator name</td>
                <td></td>
              </tr>
            </table>
          </div>
          <div className="footerone">
            <h>
              Revision #01
              <br/>Effective date:8 March,2023
              <br/>Supersedas:10 January,2022
            </h>
            <h>
              Prepared by:QA
              <br/>Document:RE-60.1
            </h>
          </div>
    </div>
    </div>
    ))}
    </>
  );
};

export default Numbers;


