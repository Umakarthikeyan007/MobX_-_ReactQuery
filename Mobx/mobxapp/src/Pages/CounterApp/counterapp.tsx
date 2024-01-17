import React, { useState } from "react";
import "./counterapp.css";
import { observer } from "mobx-react";
import { counterstore } from "../../Store/counterstore";
const CounterApp: React.FC = observer(() => {
    const [count, setCount] = useState<number>(0);
    const [incvalue,setIncvalue] =useState<string>();
    const [decvalue,setDecvalue] =useState<string>();
    return (
        <div>
            <nav className="navbar">CounterApp</nav>
            <div className="counter-div">{count}</div>
            <div className="action-btn">
                <div><button className="button" onClick={()=>setCount(counterstore.incBy1(count))}>Increase by 1</button></div>
                <div><button className="button" onClick={()=>setCount(counterstore.decBy1(count))}>Decrease by 1</button></div>
                <div><button className="button" onClick={()=>setCount(counterstore.incBy10(count))}>Increase by 10</button></div>
                <div><button className="button" onClick={()=>setCount(counterstore.decBy10(count))}>Decrease by 10</button></div>
            </div>
                <div className="action-btn ">
                    <input value={incvalue} type="number" onChange={(e)=>setIncvalue(e.target.value)} />
                    <button className="button" onClick={()=>{setDecvalue("");setCount(counterstore.incByValue(count,Number(incvalue)))}}>Increase by value</button>
                </div>
                <div className="action-btn ">
                    <input value={decvalue} type="number" onChange={(e)=>setDecvalue(e.target.value)} />
                    <button className="button"  onClick={()=>{setIncvalue("");setCount(counterstore.decByValue(count,Number(decvalue)))}}>Decrease by value</button>
                </div>
                <div className="action-btn"><button className="button" onClick={()=>{setIncvalue("");setDecvalue("");setCount(counterstore.reset())}}>Reset</button></div>
        </div>
    )
})
export default CounterApp;