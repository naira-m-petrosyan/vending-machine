import { BrowserRouter as Router, Routes, Route, Redirect } from 'react-router-dom';
import './App.css';
import Login from "./page/Login";
import Signup from "./page/Signup";
import BuyerDashboard from "./page/BuyerDashboard";
import Products from "./page/Products";
import NotFound from "./page/NotFound";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='*' element={<NotFound />} />
          <Route path='/vending-machine' element={<BuyerDashboard/>} />
          <Route path='/products' element={<Products/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/signup' element={<Signup/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
