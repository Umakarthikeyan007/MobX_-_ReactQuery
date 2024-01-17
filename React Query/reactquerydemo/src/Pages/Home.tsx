import { useState } from "react";
import { keepPreviousData, useQuery} from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Home.css"
import { useHeroMutation } from "../Hooks/useHeroMutation";
const Home = () => {
  const [page, setPage] = useState(1);
  const [pagecount, setPagecount] = useState(0);
  const [nickName, setnickName] = useState("");
  const [originalName, setoriginalName] = useState("");
  const [equipment, setEquipment] = useState("");

  const { isLoading, data, isError, error } = useQuery({
    queryKey: ['hero-list', page],
    queryFn: () => {
      return axios.get(`http://localhost:4000/heros?_limit=2&_page=${page}`).then((res) => { setPagecount(parseInt(res.headers["x-total-count"])); return res.data })
    },
    placeholderData: keepPreviousData
  })
  const nav = useNavigate();

  let {mutate} = useHeroMutation();
  const createHero =()=>{
    let newHero={
            nickName,
            originalName,
            equipment
    }
    if(newHero){
      mutate(newHero)
    }
  }

  if (isLoading) {
    return (<h1>Loading</h1>);
  }

  if (isError) {
    return (<h1>{JSON.stringify(error)}</h1>);
  }
 
  return (
    <div>
      <h1 className="header">React Query Demo</h1>
      <h1 className='sub-header'>Super Hero List</h1>
      {
        data.map((hero: any) => {
          return (
            <div key={hero.id}>
              <h1 onClick={() => nav(`HeroDetails/${hero.id}`)}>{hero.id}.{hero.nickName}</h1>
            </div>
          )
        })
      }
      <div>
        <button disabled={page === 1} className="page-btn" onClick={() => setPage(page => page - 1)}>Previous</button>
        <button disabled={page === Math.ceil(pagecount / 2)} className="page-btn" onClick={() => { setPage(page + 1) }}>Next</button>
      </div>
      <div>
        <input type="text" value={nickName} placeholder="enter hero nickname" onChange={(e) => setnickName(e.target.value)} />
        <input type="text" value={originalName} placeholder="enter hero originalname" onChange={(e) => setoriginalName(e.target.value)} />
        <input type="text" value={equipment} placeholder="enter hero equipment" onChange={(e) => setEquipment(e.target.value)} />
        <button className="page-btn" onClick={() => createHero()}>Add Hero+</button>
      </div>
      <div><button className="nav-btn" onClick={() => nav("/InfiniteLoadDetails")}>Go to infinte Load</button></div>
    </div>
  )
}
export default Home;