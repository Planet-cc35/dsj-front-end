<<<<<<< Updated upstream
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
=======
import React from "react";
import Login from "../components/Login";
import NewCard from "../components/NewCard";
>>>>>>> Stashed changes

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
<<<<<<< Updated upstream
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
=======
      <div className="container text-center mw-100">
        <div className="row vh-100">
          <div className="col-9 pt-2"></div>
          <div className="col mx-auto pt-2">
            <div className="mx-auto">
              <Login></Login>
            </div>
          </div>
        </div>
      </div>
>>>>>>> Stashed changes
    </>
  )
}

<<<<<<< Updated upstream
export default App
=======
export default App;
>>>>>>> Stashed changes
