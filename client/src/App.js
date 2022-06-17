import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router} from "react-router-dom";
import { Routes, Route } from 'react-router';
import  Home  from './pages/Home'
import Navbar from "./navbar/Navbar";


function App() {
  return (
    <Router>
         <Routes>
           <Route path="/" element={<Home />} /> 
          </Routes>
    </Router>
    
  );
}

export default App;
