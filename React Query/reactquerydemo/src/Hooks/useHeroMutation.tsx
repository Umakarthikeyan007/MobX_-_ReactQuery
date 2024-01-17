import { useMutation, useQueryClient} from "@tanstack/react-query"
import axios from "axios"


export const useHeroMutation = ()=>{
    const queryClient = useQueryClient();
   return useMutation({
    mutationFn:(newHero: any) => {
        return axios.post("http://localhost:4000/heros" , newHero).then(res => res.data)
       },
       onSuccess: (data: any) => {
        queryClient.invalidateQueries(['heros'] as any)
       }
   });
}
