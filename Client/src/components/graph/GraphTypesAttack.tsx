import React, { useEffect, useState } from 'react'
import typesAttackDTO from '../../types/DTO/typesAttackDTO';
import { fetchTop } from '../../Fetches/fetchTop';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { CategoryScale, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from 'chart.js';
import Chart from  'chart.js/auto'

Chart.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  
export default function GtaphTypesAttack() {
    const [data, setData] = useState<typesAttackDTO[] >([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchTop("http://localhost:8888/api/typesAttack/get-rating");
                setData(response); 
            } catch (err) {
                console.log(err);   
            }
        }
        fetchData();  
    }, [])
    console.log(data);

    const labels = data.map((item) => item.name);
        const graphTypes = {
        labels: labels,
        datasets: [
        {
        label: "דירוג סוג התקפה לפי נפגעים",
        backgroundColor: "rgb(60, 202, 140)",
        borderColor: "rgb(24, 35, 30)",
        data: data.map((item) => item.casualties),
        },
        ],
    };

  return (
    <div className='graph-types'>
        <h1>סטטיסטיקת סוג התקפה לפי נפגעים</h1>
        <Bar  data={graphTypes}  />
    </div>

  )
}
