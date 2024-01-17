import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { employee, employeestore } from "../../Store/employeestore";
import "./Form.css";
import { observer } from "mobx-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";

const Form = observer(() => {
    const [name, setName] = useState("");
    const [fatherName, setfatherName] = useState("");
    const [motherName, setmotherName] = useState("");
    const [age, setAge] = useState("");
    const [salary, setSalary] = useState("");
    const [designation, setDesignation] = useState("");

    const queryClient = useQueryClient();
    const nav =useNavigate();

    let mutation = useMutation({
        mutationFn: async (employee: employee) => {
            return axios.post("http://localhost:4000/employee", employee).then(res => res.data);
        },
        onSuccess: (data: employee) => {
            queryClient.invalidateQueries(['employee'] as any);
        }
    });

    function handleSubmit(e: any) {
        e.preventDefault();
        let employee = {
            id: Math.random().toString(16).slice(2),
            name,
            fatherName,
            motherName,
            age: Number(age),
            salary: Number(salary),
            designation
        }
        if (employee) {
            mutation.mutate(employee);
        }
        employeestore.addEmployee(employee);
        Swal.fire({
            title: "Hurrah!",
            text: "Employee Added",
            icon: "success"
        }).then(()=>nav("/"));

    }
    return (
        <div className="form-box">
            <form className="form">
                <div className="fields">
                    <label>Name:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
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
                <div><button className="btn" onClick={(e) => handleSubmit(e)}>Submit</button> <button className="btn" onClick={()=>nav("/")}>Go Back</button></div>
            </form>
        </div>
    )
})

export default Form;
