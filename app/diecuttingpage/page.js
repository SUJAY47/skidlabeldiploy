"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const COLORS = [
  { value: "b", label: "Black" },
  { value: "bl", label: "Blue" },
  { value: "r", label: "Red" },
  { value: "y", label: "Orange" },
];

const getToday = () => new Date().toISOString().slice(0, 10);

const initialData = {
  skidnofrom: "1",
  skidnoto: "",
  gdno: "",
  color: "b",
  ctno: "",
  date: "",
  name: "",
  quantity: "",
};

const Field = ({ label, children, hint, error }) => (
  <div>
    <label className="mb-1.5 block text-sm font-medium text-slate-700">{label}</label>
    {children}
    {error ? (
      <p className="mt-1 text-xs text-red-600">{error}</p>
    ) : hint ? (
      <p className="mt-1 text-xs text-slate-400">{hint}</p>
    ) : null}
  </div>
);

const inputClass =
  "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100";

const InputData = () => {
  const router = useRouter();
  const [inputData, setInputData] = useState(() => ({ ...initialData, date: getToday() }));
  const [touched, setTouched] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const errors = {
    skidnofrom: !inputData.skidnofrom ? "Required" : "",
    skidnoto:
      !inputData.skidnoto
        ? "Required"
        : parseInt(inputData.skidnoto, 10) < parseInt(inputData.skidnofrom, 10)
        ? "Must be ≥ start number"
        : "",
    quantity: !inputData.quantity ? "Required" : "",
  };
  const isValid = !errors.skidnofrom && !errors.skidnoto && !errors.quantity;

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched(true);
    if (!isValid) return;
    const query = new URLSearchParams(inputData).toString();
    router.push(`/pdffile?${query}`);
  };

  const handleReset = () => {
    setInputData({ ...initialData, date: getToday() });
    setTouched(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-2xl">
        <Link
          href="/"
          className="mb-4 inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-700"
        >
          <svg viewBox="0 0 20 20" fill="currentColor" className="mr-1 h-4 w-4">
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L6.414 9H16a1 1 0 110 2H6.414l3.293 3.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Back
        </Link>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-5">
            <h1 className="text-lg font-semibold text-white">Die-cutting Skid Label</h1>
            <p className="mt-1 text-sm text-blue-100">
              Fill in the job details below, then generate the printable label.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8 px-6 py-6">
            <section>
              <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
                Skid range
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <Field label="From" error={touched ? errors.skidnofrom : ""}>
                  <input
                    onChange={handleInputChange}
                    type="number"
                    id="skidnofrom"
                    name="skidnofrom"
                    value={inputData.skidnofrom}
                    className={inputClass}
                  />
                </Field>
                <Field label="To" error={touched ? errors.skidnoto : ""}>
                  <input
                    onChange={handleInputChange}
                    type="number"
                    id="skidnoto"
                    name="skidnoto"
                    value={inputData.skidnoto}
                    className={inputClass}
                  />
                </Field>
              </div>
              <p className="mt-2 text-xs text-slate-400">
                One label will be generated for every skid number in this range.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
                Job details
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="GD Number" hint="Also shown as the message at the top of the label">
                  <input
                    onChange={handleInputChange}
                    type="text"
                    id="gdno"
                    name="gdno"
                    value={inputData.gdno}
                    className={inputClass}
                  />
                </Field>
                <Field label="CT Number">
                  <input
                    onChange={handleInputChange}
                    type="text"
                    id="ctno"
                    name="ctno"
                    value={inputData.ctno}
                    className={inputClass}
                  />
                </Field>
                <Field label="Color">
                  <select
                    onChange={handleInputChange}
                    id="color"
                    name="color"
                    value={inputData.color}
                    className={inputClass}
                  >
                    {COLORS.map((c) => (
                      <option key={c.value} value={c.value}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Date" hint="Defaults to today">
                  <input
                    onChange={handleInputChange}
                    type="date"
                    id="date"
                    name="date"
                    value={inputData.date}
                    className={inputClass}
                  />
                </Field>
              </div>
            </section>

            <section>
              <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
                Production
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Die-cutting quantity" error={touched ? errors.quantity : ""}>
                  <input
                    onChange={handleInputChange}
                    type="text"
                    id="quantity"
                    name="quantity"
                    value={inputData.quantity}
                    className={inputClass}
                  />
                </Field>
                <Field label="Operator name">
                  <input
                    onChange={handleInputChange}
                    type="text"
                    id="name"
                    name="name"
                    value={inputData.name}
                    className={inputClass}
                  />
                </Field>
              </div>
            </section>

            <div className="flex items-center justify-between gap-3 border-t border-slate-100 pt-6">
              <button
                type="button"
                onClick={handleReset}
                className="text-sm font-medium text-slate-500 hover:text-slate-700"
              >
                Reset
              </button>
              <button
                type="submit"
                className="inline-flex items-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                View the label
                <svg viewBox="0 0 20 20" fill="currentColor" className="ml-2 h-4 w-4">
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414-1.414L13.586 10H4a1 1 0 110-2h9.586l-3.293-3.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default InputData;
