import React from "react";
import "./home.css";
import { useNavigate } from "react-router-dom";
const Home = () => {
    const nav = useNavigate();
    return (
        <div>
            <nav className="navbar">Mobx App</nav>
            <div className="container">
                <button className="box" onClick={()=>nav("/TodoApp")}>TodoListApp</button>
                <button className="box" onClick={()=>nav("/CounterApp")}>Counter</button>
            </div>
        </div>
    )
}
export default Home;