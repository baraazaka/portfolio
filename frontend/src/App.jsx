import { BrowserRouter,Routes,Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";

function App(){
  return(
    <BrowserRouter>
    <Routes>

      <Route path="/" element={<Home/>}/>
      <Route path="/Login" element={<Login/>}/>
      <Route path="/Register" element={<Register/>}/>
      <Route path="/Dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
      <Route path="/Dashboard/Projects" element={<ProtectedRoute><Projects/></ProtectedRoute>}/>


    </Routes>
    </BrowserRouter>
    
  );
}
export default App;