import Chart from 'chart.js/auto';
import { CategoryScale, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from 'chart.js';
import { useEffect, useState } from 'react'
import { Pie} from 'react-chartjs-2';
import { fetchTop } from '../../Fetches/fetchTop';
import orgnizationByYearsDTO from '../../types/DTO/orgnizationByYearsDTO';
import { Button, CircularProgress, TextField } from '@mui/material';
Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function GraphOrgainzationByYears() {
    const[data,setData] = useState<orgnizationByYearsDTO[]>([]);
    const[typeRequest,setTypeRequest] = useState<string>("Unknown");
    const[valyeInput,setValueInput] = useState<string>("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetchTop(`https://final-project-fullstackj-2.onrender.com/api/year/year-organization/${typeRequest}`);
                setLoading(false);
                setData(response);
            } catch (err) {
                console.log(err); 
                setLoading(false);  
            }
        }
        fetchData();
    },[typeRequest]);

    const organizationData = {
        labels: data.map((item) => item.totalEvents?item.organization:item.year),
        datasets: [
            {
                label: "סטטיסטיקת ארגונים לפי שנים" ,
                backgroundColor: [
                    "rgba(60, 202, 140, 0.31)",
                    "rgba(221, 17, 48, 0.31)",
                    "rgba(186, 35, 171, 0.31)",
                    "rgba(167, 203, 25, 0.97)",
                    "rgba(6, 164, 196, 0.97)",
                    "rgba(0, 199, 10, 0.97)",
                ],
                borderColor: "rgb(24, 35, 30)",
                data: data.map((item) => item.totalEvents?item.totalEvents:item.totalIncidents),
            },
        ],
    };

  return (
    <div className='graph-OrgainzationByYears'>
        <h1>גרף ארגונים לפי שנים</h1>
        <div className='input-graph-years'>
        <TextField value={valyeInput} onChange={(e) => setValueInput(e.target.value)} placeholder='חפש לפי שנה או ארגון'/>
        <Button
                type="submit"
                variant="contained"
                onClick={()=>{setTypeRequest(valyeInput);}}
                sx={{ mt: 3, mb: 2 }}
                style={{ backgroundColor: "#7f6d41" }}
                disabled={valyeInput === ""}
                >בחר
        </Button>
            </div>
            {loading ? (
                <div className="loading-indicator" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </div>
            ) : (
                <Pie data={organizationData} className='top-organization' />
            )}
    </div>
  )
}
