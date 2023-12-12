// pages/index.js

import React from 'react';
import Link from 'next/link';

const IndexPage = () => (
  <div className="container">
    <h3>Which skid label do you want</h3>
    <Link href="/diecuttingpage">
      <span className="custom-button primary">Die-cutting</span>
    </Link>
    <Link href="/sheetingpage">
      <span className="custom-button secondary">Sheeting</span>
    </Link>

    <style jsx>{`
      .container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh; /* Set the container height to 100% of the viewport height */
      }

      .custom-button {
        display: inline-block;
        padding: 15px 30px;
        font-size: 18px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        margin: 10px;
        text-decoration: none; /* Remove default underline for links */
      }

      .primary {
        background-color: #3498db;
        color: #fff;
      }

      .secondary {
        background-color: #2ecc71;
        color: #fff;
      }
    `}</style>
  </div>
);

export default IndexPage;
