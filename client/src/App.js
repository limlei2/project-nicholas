import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import NoPage from "./pages/NoPage";
import ContactUs from "./pages/ContactUs";
import Sell from "./pages/Sell";
import Profile from "./pages/Profile";
import Item from "./pages/Item";
import BuyNow from "./pages/BuyNow";
import Receipt from "./pages/Receipt";

import Navbar from "./components/Navbar";
import LoggedInNavbar from "./components/LoggedInNavbar";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import useAuth from "./authentication/useAuth";


function App() {
  const auth = useAuth();
  return (
    <Router>
      <div className="App">
        { Object.keys(auth.auth).length === 0 ? (
          <Navbar />
        ) : (
          <LoggedInNavbar />
        )}
        
        <Routes>
          <Route index element={<Home />}/>
          <Route path="/" element={<Home />}/>
          <Route path="/signup" element={<Signup />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/contactus" element={<ContactUs />}/>
          <Route path="/profile" element={<Profile />}/>
          <Route path="/sell" element={<Sell/>}/>
          <Route path="/item/:id" element={<Item/>}/>
          <Route path="/buynow/:id" element={<BuyNow/>}/>
          <Route path="/receipt/:id" element={<Receipt/>}/>
          <Route path="*" element={<NoPage />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
