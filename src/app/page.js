'use client'
import styles from "./page.module.css";
import React, { useRef, useState } from 'react';
import { readCsvFile } from '../utils/csvUtils'; 
export default function Home() {

  const [csvData, setCsvData] = useState(null);
  const fileInput = useRef(null);
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const data = await readCsvFile(file);
      setCsvData(data);
    } catch (error) {
      console.error("Error reading CSV file:", error);
      alert("Failed to read CSV file. Please ensure the format is correct.");
    }
  };

  return (
    <main className={styles.main}>
      <div>
        <h1>Upload a CSV File</h1>
        <input
          type="file"
          accept=".csv"
          ref={fileInput}
          onChange={handleFileUpload}
        />
        <br />
        <br />
        {csvData && (
          <div>
            <h2>CSV Data:</h2>
            <pre>{JSON.stringify(csvData, null, 2)}</pre>
          </div>
        )}
      </div>
    </main>
  );
}
