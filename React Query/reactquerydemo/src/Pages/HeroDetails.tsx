import { useParams } from "react-router-dom";
import { useQuery} from "@tanstack/react-query";
import axios from "axios";
const HeroDetails = () => {
   const {heroId} = useParams();
   const {data} = useQuery({
      queryKey:['heros'],
      queryFn:()=>{
         return axios.get(`http://localhost:4000/heros/${heroId}`)
      },
   })
   
   return (
      <div>
         <h1>Name:{data?.data.originalName}</h1>
         <h1>Equipment:{data?.data.equipment}</h1>
      </div>
   )
}
export default HeroDetails;