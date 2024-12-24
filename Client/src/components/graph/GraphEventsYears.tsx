import  { useEffect, useState } from 'react'
import { eventsForYearsDTO } from '../../types/DTO/eventsForYearsDTO';
import { fetchTop } from '../../Fetches/fetchTop';
import { Bar} from 'react-chartjs-2';
import Chart, { CategoryScale, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from 'chart.js/auto';
import { Button, CircularProgress, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
Chart.register(CategoryScale,LinearScale,PointElement,LineElement,Title,Tooltip,Legend);


export default function GraphEventsYears() {
    const[typeRequest,setTypeRequest] = useState<string|undefined>("?tenYears=10");
    const[data,setData] = useState<eventsForYearsDTO[]>([]);
    const[openInput,setOpenInput] = useState(false);
    const[fromDate,setFromDate] = useState("")
    const[endDate,setEndDate] = useState("")
    const [loading, setLoading] = useState(false);

    const fetchData = async()=>{
        setLoading(true); 
        try {
            if (typeRequest || (fromDate && endDate)) {
                const response = await fetchTop(`https://final-project-fullstackj-2.onrender.com/api/year/attack-by-dates${typeRequest}`);
                if( response== "Can`t get top organization" || response == undefined){
                    alert("שגיאה בשליחת נתונים");
                }else{
                    setLoading(false);
                    console.log(response)    
                    setData(response);
                }
            }
        } catch (err) {
            console.log(err);
            setLoading(false);   
        }
    }
    useEffect(()=>{
        fetchData(); 
    },[typeRequest])

    const handleSelect = (event: SelectChangeEvent<string>)=>{
       if(event.target.value != "ManualSelection"){
           setTypeRequest(event.target.value); 
           setOpenInput(false);
        }else{
            setOpenInput(true);
        }
    }

    const handleSubmit = async () => {
        if (parseInt(fromDate) > parseInt(endDate)) {
            alert("שנת התחלה לא יכולה להיות מאוחרת משנת סיום");
            return;
        }
        if(fromDate.length != 4 ){
            alert("שנה לא תקינה");
            return;
        }
        setTypeRequest(`?firstyear=${fromDate}&lastyear=${endDate}`);
        setOpenInput(false);
    }
    
    const labels = data.map((t) => t.year);
    const graphYears = {
    labels: labels,
    datasets: [
    {
    label: "דירוג תקריות יחודיות לפי טווח שנים",
    backgroundColor: "rgba(187, 138, 32, 0.82)",
    borderColor: "rgb(24, 35, 30)",
    data: data.map((a) => a.listAmontType.length),
    },
    ],
};

  return (
    <div className="graph-events-years">
        <h1>כמות תקריות יחודיות לפי טווח שנים מבוקש</h1>
        <Select
        value={typeRequest}
        onChange={handleSelect}
        displayEmpty
        sx={{ width: 250 }}
        >
         <MenuItem value="" disabled>בחר טווח שנים</MenuItem>
         <MenuItem value="?tenYears=10">10 שנים אחרונות</MenuItem>
         <MenuItem value="?fiveYears=5">5 שנים אחרונות</MenuItem>
         <MenuItem value="ManualSelection">בחירת טווח שנים</MenuItem>
        </Select>
        {openInput && <div className="input-years">
            <h2>: בחר שנת התחלה</h2>
            <p className='closeWindow' onClick={() => setOpenInput(false)}>❌</p>
            <TextField
            type='number'
            value={fromDate}
            style={{backgroundColor:"rgba(248, 246, 242, 0.94)"}}
            onChange={(e) => setFromDate(e.target.value as string)}
            >     
            </TextField>
            <h2>: בחר שנת סיום</h2>
            <TextField
            type='number'
            value={endDate}
            style={{backgroundColor:"rgba(245, 243, 240, 0.94)"}}
            onChange={(e) => setEndDate(e.target.value as string)}
            >     
            </TextField>
            <Button
            type="submit"
            variant="contained"
            onClick={handleSubmit}
            sx={{ mt: 3, mb: 2 }}
            style={{  backgroundColor: fromDate == "" ? 'rgba(193, 184, 162, 0.44)' : ' #7f6d41', }}
            disabled={fromDate == "" }
            >בחר
            </Button>
        </div> }

        {loading ? (
                <div className="loading-indicator" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </div>
            ) : (
                <Bar data={graphYears} className='the-graph-events-years' />
            )}
    </div>
  )
}
