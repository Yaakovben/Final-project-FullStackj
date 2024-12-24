import { useEffect, useState } from 'react'
import typesAttackDTO from '../../types/DTO/typesAttackDTO';
import { fetchTop } from '../../Fetches/fetchTop';
import { Bar } from 'react-chartjs-2';
import { CategoryScale, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from 'chart.js';
import Chart from  'chart.js/auto'
import { CircularProgress } from '@mui/material';

Chart.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  
export default function GraphTypesAttack() {
    const [data, setData] = useState<typesAttackDTO[] >([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetchTop("https://final-project-fullstackj-2.onrender.com/api/typesAttack/get-rating");
                setLoading(false);
                setData(response); 
            } catch (err) {
                console.log(err);   
                setLoading(false);
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
        {loading ? (
                <div className="loading-indicator" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </div>
            ) : (
                <Bar  data={graphTypes}  />
            )}



       
    </div>

  )
}
