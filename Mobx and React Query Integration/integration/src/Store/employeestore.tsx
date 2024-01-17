import { makeObservable, action, observable, toJS } from "mobx";

export type employee = {
    id:string,
    name:string,
    fatherName:string,
    motherName:string,
    age:number,
    salary:number,
    designation:string
}

export class EmployeeStore{

    employeelist : employee[] = [];

    constructor(){
        makeObservable(this,{
            employeelist:observable,
            addEmployee:action,
            getParticularEmployee:action,
            updateEmployee:action
        })
    }

    addEmployee = (employee:employee):void =>{
        const newEmployee:employee= {
          id:employee.id,
          name:employee.name,
          fatherName:employee.fatherName,
          motherName:employee.motherName,
          age:employee.age,
          salary:employee.salary,
          designation:employee.designation
        }
        this.employeelist.push(newEmployee);
    }

    updateEmployee =(employee:employee):void=>{
        const updatedEmployee:employee= {
            id:employee.id,
            name:employee.name,
            fatherName:employee.fatherName,
            motherName:employee.motherName,
            age:employee.age,
            salary:employee.salary,
            designation:employee.designation
          }
     let index:number = employeestore.employeelist.findIndex((e) => e.id === employee.id);
      employeestore.employeelist.splice(index,1);
      employeestore.employeelist.push(updatedEmployee);
    }
    
    deleteEmployee = (id:string) =>{
        let index:number = employeestore.employeelist.findIndex((e) => e.id === id);
        employeestore.employeelist.splice(index,1);
    }

    getParticularEmployee = (name:string)=>{
     for(let i=0;i<employeestore.employeelist.length ; i++){
        if(employeestore.employeelist[i].name === name){
            return toJS(employeestore.employeelist[i]);
        }
     }
    }
}
export const employeestore = new EmployeeStore();