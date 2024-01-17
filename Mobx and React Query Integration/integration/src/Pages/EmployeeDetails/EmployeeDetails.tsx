import { useLocation, useNavigate } from "react-router-dom";
import { employeestore } from "../../Store/employeestore";
import "./EmployeeDetails.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
const EmployeeDetails = () => {
    const location = useLocation();
    const empname = location.state?.empname;
    const data = employeestore.getParticularEmployee(empname);
    const nav = useNavigate();



    const queryClient = useQueryClient();

    let deletemutation = useMutation({
        mutationFn: async () => {
            return axios.delete(`http://localhost:4000/employee/${data?.id}`).then(res => res.data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['employee'] as any);
        }
    })

    if (data === undefined) {
        return (
            <div>
                <h1>No Results Found</h1>
                <button className="btn3" onClick={() => nav("/")}>Go Back</button>
            </div>

        )
    }


    const handleDelete = () => {
        employeestore.deleteEmployee(data.id);
        deletemutation.mutate();
        Swal.fire({
            title: "Hurrah!",
            text: "Employee Deleted",
            icon: "success"
        }).then(() => nav("/"));
    }
    return (
        <div>
            <div><h1>Name:{data?.name}</h1></div>
            <div><h1>Father Name:{data?.motherName}</h1></div>
            <div><h1>Mother Name:{data?.fatherName}</h1></div>
            <div><h1>Age:{data?.age}</h1></div>
            <div><h1>Salary:{data?.salary}</h1></div>
            <div><h1>Designation:{data?.designation}</h1></div>
            <div><button className="btn3" onClick={() => nav("/UpdateEmployee", { state: { id: data.name } })}>Update</button></div>
            <div><button className="btn3" onClick={() => handleDelete()}>Delete Employee</button></div>
            <div><button className="btn3" onClick={() => nav(-1)}>Go Back</button></div>
        </div>
    )
}

export default EmployeeDetails;