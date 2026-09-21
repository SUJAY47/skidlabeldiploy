// pages/index.js

import React from 'react';
import Link from 'next/link';

const options = [
  {
    href: '/diecuttingpage',
    title: 'Die-cutting',
    description: 'Generate skid labels for die-cutting jobs with GD/CT numbers, color coding and quantities.',
    accent: 'from-blue-500 to-blue-600',
    ring: 'group-hover:ring-blue-300',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7 text-white">
        <path
          d="M4 6h16M4 12h16M4 18h10"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="19" cy="18" r="2" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
  {
    href: '/sheetingpage',
    title: 'Sheeting',
    description: 'Create skid labels for sheeting jobs. This workflow is still being built out.',
    accent: 'from-emerald-500 to-emerald-600',
    ring: 'group-hover:ring-emerald-300',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7 text-white">
        <rect x="5" y="4" width="11" height="14" rx="1.5" stroke="currentColor" strokeWidth="2" />
        <path d="M8 8h5M8 11h5M8 14h3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
];

const IndexPage = () => (
  <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100 px-6 py-16">
    <div className="mb-10 text-center">
      <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-700">
        Skid Label Generator
      </span>
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        What kind of label do you need?
      </h1>
      <p className="mt-3 max-w-md text-sm text-slate-500 sm:text-base">
        Choose a workflow below to fill in the job details and generate a print-ready skid label.
      </p>
    </div>

    <div className="grid w-full max-w-3xl grid-cols-1 gap-6 sm:grid-cols-2">
      {options.map((option) => (
        <Link key={option.href} href={option.href} className="group">
          <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm ring-1 ring-transparent transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
            <div
              className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${option.accent} shadow-sm ring-4 ring-transparent transition ${option.ring}`}
            >
              {option.icon}
            </div>
            <h2 className="text-lg font-semibold text-slate-900">{option.title}</h2>
            <p className="mt-2 flex-1 text-sm text-slate-500">{option.description}</p>
            <span className="mt-4 inline-flex items-center text-sm font-medium text-blue-600">
              Get started
              <svg viewBox="0 0 20 20" fill="currentColor" className="ml-1 h-4 w-4 transition group-hover:translate-x-1">
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414-1.414L13.586 10H4a1 1 0 110-2h9.586l-3.293-3.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </div>
        </Link>
      ))}
    </div>
  </main>
);

export default IndexPage;
