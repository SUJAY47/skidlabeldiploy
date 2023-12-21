'use client'
import { useEffect, useState } from "react";
import { useSearchParams,useRouter } from 'next/navigation';

const Numbers = () => {
  const searchPharams = useSearchParams()
  const [skidnofrom,setSkidnofrom] = useState()
  const [skidnoto,setSkidnoto] = useState()
  const [gdno,setGdno] = useState()
  const [ctno,setCtno] = useState()
  const [date,setDate] = useState()
  const [name,setName] = useState()
  let [color,setColor] = useState()
  const [message,setMessage] = useState()
  const numbers = []

  const generateNumbers = () => {
    for (let i = parseInt(skidnofrom, 10); i <= parseInt(skidnoto, 10); i++) {
      numbers.push(i);
    }
    return numbers;
  };

  const numbersArray = generateNumbers();

  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      numbers != '' ? window.print() : alert("please enter the skid numbers") , console.log("2");
    }, 10);
    return () => clearTimeout(redirectTimer);
  }, [numbers,skidnofrom]);
  


  useEffect(() => {
    setSkidnofrom(searchPharams.get('skidnofrom'))
    setSkidnoto(searchPharams.get('skidnoto'))
    setGdno(searchPharams.get('gdno'))
    setCtno(searchPharams.get('ctno'))
    setDate(searchPharams.get("date"))
    setName(searchPharams.get('name'))
    setColor(searchPharams.get('color'))
    setMessage(searchPharams.get('message'))
  }),[searchPharams,numbers]
  // console.log("skidnofrom",searchPharams.get('skidnofrom'))
  // console.log("skidnoto",searchPharams.get('skidnoto'))
  console.log("num",numbers)

  return (
    <>
    {numbers && numbersArray.map((number) => (
    <div className="mainContainer" key={number}>
          <div className="messagebox"><h1>{message}</h1></div>
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
                <td style={{textAlign:'center'}}>
                  ERP#
                  <br />
                  GD Number
                </td>
                {
                color=='b' ?
                <td style={{fontSize:'20px',fontFamily:'serif'}}>GD{gdno}</td>:
                color=='bl' ? 
                <td style={{color:'blue',fontSize:'20px',fontFamily:'serif'}}>GD{gdno}</td>:
                color=='r' ? 
                <td style={{color:'red',fontSize:'20px',fontFamily:'serif'}}>GD{gdno}</td>:
                color=='y'?
                <td style={{color:'orange',fontSize:'20px',fontFamily:'serif'}}>GD{gdno}</td>:
                <td style={{fontSize:'20px',fontFamily:'serif'}}>GD{gdno}</td>
                }
                <td>CT Number</td>
                <td style={{fontFamily:'serif'}}>CT{ctno}</td>
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
          <div className="windownote">
            If item required windowing, must fill up below
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


