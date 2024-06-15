import './App.css';
import Signup from './pages/Signup.js'
import Login from './pages/Login.js'
import {Toaster} from 'react-hot-toast'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
 import Dashboard from './pages/Dashboard.js';
import Board from './pages/tictactoe/Board.js';
// import { lazy } from 'react';


// const Dashboard = lazy(()=> import("./pages/Dashboard"));
//  const card = lazy(()=> import("./pages/Card.js"));

function App() {
  return (
    <div className="App">
      <BrowserRouter>
     
      <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/board" element={<Board />} />
      
      </Routes>
      <Toaster/>
     
      </BrowserRouter>
    </div>
  );
}

export default App;
