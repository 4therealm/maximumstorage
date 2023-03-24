import logo from './logo.svg';
import './App.css';

import { useState, useEffect } from 'react';
import FileUpload from './FileUpload';


function App() {
  return (
    <div className="App">
        <h1>Maximum Storage</h1>
        <main>
        <FileUpload />
      </main>
    </div>
  );
}

export default App;
