"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

const COLOR_STYLES = {
  b: { fontSize: "20px", fontFamily: "serif" },
  bl: { color: "blue", fontSize: "20px", fontFamily: "serif" },
  r: { color: "red", fontSize: "20px", fontFamily: "serif" },
  y: { color: "orange", fontSize: "20px", fontFamily: "serif" },
};

const Numbers = () => {
  const searchPharams = useSearchParams();
  const router = useRouter();
  const [skidnofrom, setSkidnofrom] = useState();
  const [skidnoto, setSkidnoto] = useState();
  const [gdno, setGdno] = useState();
  const [ctno, setCtno] = useState();
  const [date, setDate] = useState();
  const [name, setName] = useState();
  const [quantity, setQuantity] = useState();
  const [color, setColor] = useState();

  useEffect(() => {
    setSkidnofrom(searchPharams.get("skidnofrom"));
    setSkidnoto(searchPharams.get("skidnoto"));
    setGdno(searchPharams.get("gdno"));
    setCtno(searchPharams.get("ctno"));
    setDate(searchPharams.get("date"));
    setName(searchPharams.get("name"));
    setColor(searchPharams.get("color"));
    setQuantity(searchPharams.get("quantity"));
  }, [searchPharams]);

  const from = parseInt(skidnofrom, 10);
  const to = parseInt(skidnoto, 10);
  const hasValidRange = skidnofrom !== undefined && !Number.isNaN(from) && !Number.isNaN(to) && to >= from;

  const numbersArray = hasValidRange
    ? Array.from({ length: to - from + 1 }, (_, i) => from + i)
    : [];

  useEffect(() => {
    if (!hasValidRange) return;
    const printTimer = setTimeout(() => {
      window.print();
    }, 150);
    return () => clearTimeout(printTimer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasValidRange, skidnofrom, skidnoto]);

  if (skidnofrom === undefined) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-sm text-slate-400">Loading label…</p>
      </main>
    );
  }

  if (!hasValidRange) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-6 py-16">
        <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-red-100">
            <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7 text-red-600">
              <path
                d="M12 9v4m0 4h.01M10.29 3.86l-8.18 14.18A2 2 0 003.82 21h16.36a2 2 0 001.71-2.96L13.71 3.86a2 2 0 00-3.42 0z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h1 className="text-lg font-semibold text-slate-900">Missing skid numbers</h1>
          <p className="mt-2 text-sm text-slate-500">
            We couldn&apos;t generate a label because the skid number range is missing or invalid.
          </p>
          <button
            onClick={() => router.back()}
            className="mt-6 inline-flex items-center rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-300"
          >
            Go back and fix it
          </button>
        </div>
      </main>
    );
  }

  return (
    <>
      <div className="print:hidden sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white/90 px-6 py-3 backdrop-blur">
        <Link
          href="/diecuttingpage"
          className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-700"
        >
          <svg viewBox="0 0 20 20" fill="currentColor" className="mr-1 h-4 w-4">
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L6.414 9H16a1 1 0 110 2H6.414l3.293 3.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Edit details
        </Link>
        <span className="text-xs font-medium text-slate-400">
          {numbersArray.length} label{numbersArray.length === 1 ? "" : "s"}
        </span>
        <button
          onClick={() => window.print()}
          className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          <svg viewBox="0 0 20 20" fill="currentColor" className="mr-1.5 h-4 w-4">
            <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v2H5V4z" />
            <path
              fillRule="evenodd"
              d="M3 8a2 2 0 012-2h10a2 2 0 012 2v4a2 2 0 01-2 2h-1v2a2 2 0 01-2 2H8a2 2 0 01-2-2v-2H5a2 2 0 01-2-2V8zm4 6v2h6v-2H7z"
              clipRule="evenodd"
            />
          </svg>
          Print
        </button>
      </div>

      {numbersArray.map((number) => (
        <div className="mainContainer" key={number}>
          {gdno ? (
            <div className="messagebox">
              <h1>{gdno}</h1>
            </div>
          ) : null}
          <div className="labelcontainer">
            <div className="skidlabel">
              <h1>Skid Label</h1>
            </div>
            <div className="ctp">
              <table className="tableone">
                <tbody>
                  <tr>
                    <td></td>
                    <td></td>
                    <td>Skid No.</td>
                    <td>{number}</td>
                  </tr>
                  <tr>
                    <td style={{ textAlign: "center" }}>
                      ERP#
                      <br />
                      GD Number
                    </td>
                    <td style={COLOR_STYLES[color] || COLOR_STYLES.b}>{gdno}</td>
                    <td>CT Number</td>
                    <td style={{ fontFamily: "serif" }}>{ctno}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="ctp2">
              <table className="tabletwo">
                <tbody>
                  <tr>
                    <td>Die-cutting qty</td>
                    <td style={{ fontSize: "20px", fontFamily: "serif" }}>{quantity}</td>
                    <td>Date</td>
                    <td>{date}</td>
                    <td>Operator name</td>
                    <td>{name}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="windownote">If item required windowing, must fill up below</div>
            <div className="ctp3">
              <table className="tablethree">
                <tbody>
                  <tr>
                    <td>Windowing qty</td>
                    <td></td>
                    <td>Date</td>
                    <td></td>
                    <td>Operator name</td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="footerone">
              <h6>
                Revision #01
                <br />
                Effective date:8 March,2023
                <br />
                Supersedes:10 January,2022
              </h6>
              <h6>
                Prepared by:QA
                <br />
                Document:RE-60.1
              </h6>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Numbers;
