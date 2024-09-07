
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./Component/Singup";
import Login from "./Component/Login";
import Home from "./Component/Home";
import Profile from "./Component/Profile";

function App() {
  return (
    <BrowserRouter>
   
      <div>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile/>}/>
        </Routes>
      </div>
    
    </BrowserRouter>
  );
}

export default App;