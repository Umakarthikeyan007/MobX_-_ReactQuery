import { BrowserRouter, Routes, Route } from "react-router-dom";
import HeroDetails from "./Pages/HeroDetails";
import Home from "./Pages/Home";
import { QueryClient,QueryClientProvider } from "@tanstack/react-query";
import InfiniteLoadDetails from "./Pages/InfiniteLoadDetails";
function Router () {
    return (
        <QueryClientProvider client={new QueryClient()}>
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/HeroDetails/:heroId" element={<HeroDetails/>}/>
            <Route path="/InfiniteLoadDetails" element={<InfiniteLoadDetails/>}/>
        </Routes>
    </BrowserRouter>
    </QueryClientProvider>)
}
export default Router;