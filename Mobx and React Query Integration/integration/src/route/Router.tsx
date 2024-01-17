import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../Pages/Home/Home";
import Addemployee from "../Pages/AddEmployee/Addemployee";
import EmployeeDetails from "../Pages/EmployeeDetails/EmployeeDetails";
import UpdateEmployee from "../Pages/UpdateEmployee/UpdateEmployee";

export const Router = () => {
  return (
   <BrowserRouter>
   <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/Addemployee" element={<Addemployee/>}/>
    <Route path="/Updateemployee" element={<UpdateEmployee/>}/>
    <Route path="/EmployeeDetails" element={<EmployeeDetails/>}/>
   </Routes>
   </BrowserRouter>
  )
}

export default Router;