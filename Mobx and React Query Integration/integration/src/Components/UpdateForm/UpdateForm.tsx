import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { employee, employeestore } from "../../Store/employeestore";
import axios from "axios";
import Swal from "sweetalert2";
import { observer } from "mobx-react";
const UpdateForm = observer(({ props }: any) => {

    const [name, setName] = useState(props?.name);
    const [fatherName, setfatherName] = useState(props?.fatherName);
    const [motherName, setmotherName] = useState(props?.motherName);
    const [age, setAge] = useState(props?.age);
    const [salary, setSalary] = useState(props?.salary);
    const [designation, setDesignation] = useState(props?.designation);

    const nav = useNavigate();
    const queryClient = useQueryClient();

    let updatemutation = useMutation({
        mutationFn: async (employee: employee) => {
            return axios.put(`http://localhost:4000/employee/${props?.id}`, employee).then(res => res.data);
        },
        onSuccess: (data: employee) => {
            queryClient.invalidateQueries(['employee'] as any);
        }

    })

    const handleUpdate = (e: any) => {
        e.preventDefault();
        let employee = {
            id: props?.id,
            name,
            fatherName,
            motherName,
            age: Number(age),
            salary: Number(salary),
            designation
        }
        employeestore.updateEmployee(employee);
        updatemutation.mutate(employee);
        Swal.fire({
            title: "Hurrah!",
            text: "Employee Updated",
            icon: "success"
        }).then(() => nav("/"));
    }

    return (
        <div className="form-box">
            <form className="form">
                <div className="fields">
                    <label>Name:</label>
                    <input type="text" disabled={true} value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="fields">
                    <label>Father Name:</label>
                    <input type="text" value={fatherName} onChange={(e) => setfatherName(e.target.value)} />
                </div>
                <div className="fields">
                    <label>Mother Name:</label>
                    <input type="text" value={motherName} onChange={(e) => setmotherName(e.target.value)} />
                </div>
                <div className="fields">
                    <label>Age:</label>
                    <input type="number" value={age} onChange={(e) => setAge(e.target.value)} />
                </div>
                <div className="fields">
                    <label>Salary:</label>
                    <input type="number" value={salary} onChange={(e) => setSalary(e.target.value)} />
                </div>
                <div className="fields">
                    <label>Designation:</label>
                    <input type="text" value={designation} onChange={(e) => setDesignation(e.target.value)} />
                </div>
                <div>
                <button className="btn" onClick={(e) => handleUpdate(e)}>Update</button>
                <button className="btn" onClick={() => nav("/")}>Go Back</button>
                </div>
            </form>
        </div>
    )
})

export default UpdateForm