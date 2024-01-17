import React, { useState } from "react";
import { todostore } from "../../Store/todostore";
import "./todoapp.css";
import { observer } from "mobx-react";
const TodoApp: React.FC = observer(() => {
    const [task, setTask] = useState<string>("");
    const handleSubmit = (e: any) => {
        e.preventDefault();
        todostore.addTask(task);
        setTask("");
    }
    const findlength = () :number=>{
        let count:number = 0;
      todostore.tasklist.map((item)=>{
        if(item.isCompleted === true){
            count++;
        }
      })
      return count;
    }

    return (
        <div>
            <nav className="navbar">TodoApp</nav>
            <div className="values">
                <div className="small-box"><span>All Todos</span><span>{todostore.tasklist.length}</span></div>
                <div className="small-box"><span>Completed</span><span>{findlength()}</span></div>
                <div className="small-box"><span>Pending</span><span>{todostore.tasklist.length - findlength()}</span></div>
            </div>
            <form className="form">
                <label htmlFor="task">Enter Task:</label>
                <input className="input" value={task} type="text" id="task" onChange={(e) => setTask(e.target.value)} />
                <button className="btn" onClick={(e) => handleSubmit(e)}>Submit</button>
            </form>
            <table className="table" border={2} cellPadding={20}>
                <thead>
                    <tr>
                        <td>Task</td>
                        <td>Action</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        todostore.tasklist.map((e) => {
                            return (
                                <tr key={e.id}>
                                    <td>{e.task}</td>
                                    <td><div className="action">
                                        <div ><button className="btn"  onClick={() => todostore.setStatus(e)}>{e.isCompleted ? "Not Completed" : "Completed"}</button></div>
                                        <div><button className="btn" onClick={() => todostore.deleteTask(e.id)}>Delete</button></div>
                                    </div></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>

        </div>
    )
})
export default TodoApp;