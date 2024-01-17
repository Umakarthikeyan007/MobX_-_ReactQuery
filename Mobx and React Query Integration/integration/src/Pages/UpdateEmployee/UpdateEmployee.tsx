import { useLocation } from "react-router-dom";
import { employeestore } from "../../Store/employeestore";
import UpdateForm from "../../Components/UpdateForm/UpdateForm";


const UpdateEmployee = () => {
    const location = useLocation();
    const empname = location.state?.id;
    const data = employeestore.getParticularEmployee(empname);
  return (
    <div>
        <h1>Update Employee Details</h1>
        <UpdateForm props={data}/>
    </div>
  )
}

export default UpdateEmployee;