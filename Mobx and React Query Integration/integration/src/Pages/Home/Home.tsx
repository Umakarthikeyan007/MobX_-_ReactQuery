import { useEffect, useState } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react";
import { useQuery } from "@tanstack/react-query";
import { employeestore } from "../../Store/employeestore";
import axios from "axios";
import { toJS } from "mobx";

const Home = observer(() => {
    const [empname, setEmpname] = useState("");
    const nav = useNavigate();

    function searchEmployee() {
        nav("/EmployeeDetails", { state: { empname: empname } })
    }

    const getEmployeeDetail = async () => {
        return await axios
            .get('http://localhost:4000/employee')
            .then(res => res.data)
    }

    const { data, isLoading, isError } = useQuery({
        queryKey: ['getDetail'],
        queryFn: getEmployeeDetail
    })

    useEffect(() => {
        if (!isLoading && !isError) {
            employeestore.employeelist.splice(0,employeestore.employeelist.length)
            data.map((e: any) => {
                employeestore.addEmployee(e);
            })
        }
        console.log(toJS(employeestore.employeelist));
    }, [data])

    return (
        <div>
            <h1>Crud With MobX and React Query</h1>
            <div className="box">
                <div><button className="btn" onClick={() => nav("/Addemployee")}>Add Employee</button></div>
                <div>
                    <input className="in" type="text" value={empname} onChange={(e) => setEmpname(e.target.value)} />
                    <button className="btn2" onClick={() => searchEmployee()}>Search Employee</button>
                </div>
            </div>
            <div>
        <h1>Employee Details</h1>
        <table border={1} cellPadding={4} cellSpacing={5}>
            <thead>
                <tr>
                <td>Name</td>
                <td>Father Name</td>
                <td>Mother Name</td>
                <td>Age</td>
                <td>Salary</td>
                <td>Designation</td>
                </tr>
            </thead>
            <tbody>
             {
                employeestore.employeelist.map((e)=>{
                    return <tr key = {e.id}>
                        <td>{e.name}</td>
                        <td>{e.fatherName}</td>
                        <td>{e.motherName}</td>
                        <td>{e.age}</td>
                        <td>{e.salary}</td>
                        <td>{e.designation}</td>
                    </tr>
                })
             }
            </tbody>
        </table>
    </div>
        </div>
    )
})

export default Home;