import Chart from 'chart.js/auto';
import { CategoryScale, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from 'chart.js';
import  { useEffect, useState } from 'react';
import topOrganizationDTO from '../../types/DTO/topOrganization';
import { fetchTop } from '../../Fetches/fetchTop';
import { Pie } from 'react-chartjs-2';
import { Button, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function GraphFiveTopOrganization() {
    const [data, setData] = useState<topOrganizationDTO[]>([]);
    const [openInput, setOpenInput] = useState(false);
    const [city, setCity] = useState<string | null>("");
    const [valueSelect, setValueSelect] = useState("");
    const [valueInput, setValueInput] = useState("");

    const fetchData = async () => {
        try {
            const response = await fetchTop(
                `http://localhost:8888/api/location/top-organization/${city}`);
            if(response.length == 0){ 
                alert("לא נמצאו נתונים");
                return
            }
            setData(response);
            console.log(response);
            
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchData();
    }, [city]);

    const handleSelect = (event: SelectChangeEvent<string>) => {
        setValueSelect(event.target.value as string);
        if( event.target.value === "byCity" ){
            setOpenInput(true);
        }else{
            setCity("")
        }

    };

    const handleSubmit = async () => {
        setCity(valueInput);
        setOpenInput(false);
        setValueSelect("");
    }

   
    const organizationData = {
        labels: data.map((item) => item.name? item.name : item.organization),
        datasets: [
            {
                label: "דירוג סוג התקפה לפי נפגעים",
                backgroundColor: [
                    "rgba(60, 202, 140, 0.31)",
                    "rgba(221, 17, 48, 0.31)",
                    "rgba(186, 35, 171, 0.31)",
                    "rgba(167, 203, 25, 0.97)",
                    "rgba(6, 164, 196, 0.97)",
                    "rgba(0, 199, 10, 0.97)",
                ],
                borderColor: "rgb(24, 35, 30)",
                data: data.map((item) => item.eventsCount || item.totalEvents),
            },
        ],
    };

    return (
        <div className="graph-five-top-organization">
            <h1>חמישה ארגונים מובילים לפי אזור</h1>
            <Select value={valueSelect} onChange={handleSelect} displayEmpty sx={{ width: 250 }}>
                <MenuItem value="" disabled>בחר סוג חיפוש</MenuItem>
                <MenuItem value="allCity">לפי כל האזורים</MenuItem>
                <MenuItem value="byCity">לפי אזור</MenuItem>
            </Select>
            {openInput &&  <div className="input-city"> 
            <h4 className='closeWindow' onClick={() => setOpenInput(false)}>❌</h4>
            <h3>בחירה לפי אזור</h3>
            <TextField placeholder="בחר אזור" value={valueInput} 
            onChange={(event) => setValueInput(event.target.value)}
            style={{backgroundColor:"rgba(243, 241, 237, 0.94)"}}
             />
              <Button
                type="submit"
                variant="contained"
                onClick={handleSubmit}
                sx={{ mt: 3, mb: 2 }}
                style={{  backgroundColor: valueInput == "" ? 'rgba(193, 184, 162, 0.44)' : ' #7f6d41', }}
                disabled={valueInput == "" }
                >בחר
            </Button>
             </div>
             }
            
            <Pie data={organizationData} className='top-organization' />
        </div>
    );
}
