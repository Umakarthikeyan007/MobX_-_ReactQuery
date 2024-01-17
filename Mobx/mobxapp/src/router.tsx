import CounterApp from "./Pages/CounterApp/counterapp";
import Home from "./Pages/Home/home";
import TodoApp from "./Pages/TodoApp/todoapp";
import { BrowserRouter, Routes, Route } from "react-router-dom";
const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/TodoApp" element={<TodoApp />} />
                <Route path="/CounterApp" element={<CounterApp />} />
            </Routes>
        </BrowserRouter>
    )
}
export default Router;
