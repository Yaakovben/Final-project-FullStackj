import React, { useEffect, useState } from 'react'
import { eventsForYearsDTO } from '../../types/DTO/eventsForYearsDTO';
import { fetchTop } from '../../Fetches/fetchTop';

export default function GraphEventsYears() {
    const[typeRequest,setTypeRequest] = useState("?firstyear=1990");
    const[data,setData] = useState<eventsForYearsDTO[]>([]);

    useEffect(()=>{

        const fetchData = async()=>{
            try {
                const response = await fetchTop(`http://localhost:8888/api/year/attack-by-dates${typeRequest}`);
                setData(response);
                console.log(response);
            } catch (err) {
                console.log(err);   
            }
        }
        fetchData(); 
    },[typeRequest])

  return (


    <div>




        <h1>bhibphl</h1>
        <button onClick={()=>{setTypeRequest("?tenYears=10")}}>10 Years</button>
        <button onClick={()=>{setTypeRequest("?fiveYears=5")}}>5 Years</button>
    </div>
  )
}
