import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import "./InfiniteLoadDetails.css"
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
const InfiniteLoadDetails = () => {
    const nav = useNavigate();
    const { data, hasNextPage, isLoading, isError, error, fetchNextPage } = useInfiniteQuery({
        queryKey: ['colors'],
        queryFn: async ({ pageParam }) => {
            const res = await axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageParam}`);
            return res.data;
        },
        initialPageParam: 1,
        getNextPageParam: (_lastPage, Pages) => {
            if (Pages.length < 8) {
                return Pages.length + 1;
            }
            else {
                return undefined;
            }
        }
    })
    if (isLoading) {
        return (<h1>Loading</h1>);
    }

    if (isError) {
        return (<h1>{JSON.stringify(error)}</h1>);
    }
    return (
        <div>
            <h1 className="header">Colors List</h1>
            {
                data?.pages?.map((group , index) => {
                    return (
                       <Fragment key={index}>
                         {
                            group?.map((color:any) =>(
                                <h2 key={color.id}>{color.id}.{color.color}</h2>
                            ))
                         }
                       </Fragment>
                    )
                })
            }
            <button disabled={!hasNextPage} className="page-btn" onClick={()=>fetchNextPage()}>Load More</button>
            <div><button className="nav-btn" onClick={()=>nav(-1)}>Go back to Pagination</button></div>
        </div>
    )
}
export default InfiniteLoadDetails;