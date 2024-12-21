import React, { useState } from 'react'
import { fetchTop } from '../Fetches/fetchTop'
import { Button, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import allCitiesDTO from '../types/DTO/allCitiesDTO'
import { fetchallCities } from '../Fetches/fetchAllCities'

export interface Props{
    setData: (data:any)=>void
    
}

export default function SelectionData({setData}:Props) {

    const [valueOfSelection, setValueOfSelection] = useState("");
    const[allCites, setAllCites] = useState<allCitiesDTO[]>([]);
    const[valueOfInputLocation, setValueOfInputLocation] = useState("");
    const[valueOfInputOrganization, setValueOfInputOrganization] = useState("");
    const[valueOfInputLocationForOrganization, setValueOfInputLocationForOrganization] = useState("");



    const handleChange =async (event: SelectChangeEvent<string>) => {
      setValueOfSelection(event.target.value as string);
    };


    const handelSubmit = async () => {
        try {
            if (valueOfSelection === "fetchTopLocation") 
                {const locationData = await fetchTop(`http://localhost:8888/api/location/top-location${valueOfInputLocation !== "" ? `/${valueOfInputLocation}` : ""}`);
                if(locationData){
                console.log(locationData);
                setData(locationData); 
                }else{
                    console.log(locationData);
                    
                    alert("לא נמצאו אזור");
                }
            }else if (valueOfSelection === "fetchTopOranization") {
                const oranizationData = await fetchTop(`http://localhost:8888/api/location/top-organization${valueOfInputOrganization !== "" ? `/${valueOfInputOrganization}` : ""}`);
                if(oranizationData && oranizationData.length > 0){
                    console.log(oranizationData);
                    setData(oranizationData);
                }else{
                    console.log(oranizationData);
                    
                    alert("לא נמצאו ארגון");
                }     
            }else if (valueOfSelection === "fetchTopLocationForOrganization") {
                const topLocationData = await fetchTop(`http://localhost:8888/api/location/top-location-for-organization/${valueOfInputLocationForOrganization}`);
                if(topLocationData ){
                    console.log(topLocationData);
                    setData(topLocationData);
                }else{
                    console.log(topLocationData);
                    alert("לא נמצאו ארגון");
                }
            }
        } catch (err) {
            console.log(err);
            
            setData([]);
        }
        
      };
      
  return (
    <div>
        <Select
        value={valueOfSelection}
        onChange={handleChange}
        displayEmpty
        style={{ width: 200, marginTop: 20 }}>
            <MenuItem value="" disabled>בחר אפשרות</MenuItem>
            <MenuItem value="fetchTopLocation">אזורים עם כמות נפגעים מרבית</MenuItem>
            <MenuItem value="fetchTopOranization">חמישה ארגונים בולטים ביותר</MenuItem>
            <MenuItem value="fetchTopLocationForOrganization">אזור פגיעה מרבית לפי ארגון</MenuItem>
        </Select>

       
        {valueOfSelection === "fetchTopLocation" ? (
            <input
            value={valueOfInputLocation}
            onChange={(e) => setValueOfInputLocation(e.target.value)}
            placeholder="חפש לפי עיר"
            />
            ) : valueOfSelection === "fetchTopOranization" ? (
            <input
            value={valueOfInputOrganization}
            onChange={(e) => setValueOfInputOrganization(e.target.value)}
            placeholder="חפש לפי עיר פעילות"
            />
            ) : valueOfSelection === "fetchTopLocationForOrganization" ? (
            <input
            value={valueOfInputLocationForOrganization}
            onChange={(e) => setValueOfInputLocationForOrganization(e.target.value)}
            placeholder="חפש לפי עיר ארגון"
            />
            ) : null}
        <Button
        variant="contained"
        onClick={handelSubmit}
        style={{ marginTop: 20 }}>   
            Submit
        </Button>
    </div>
  )
}
