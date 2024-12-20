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
    const[selectionIsOpen, setSelectionIsOpen] = useState(false);
    const[allCites, setAllCites] = useState<allCitiesDTO[]>([]);
    const[valueOfInputLocation, setValueOfInputLocation] = useState("");
    const[valueOfInputOrganization, setValueOfInputOrganization] = useState("");



    const handleChange =async (event: SelectChangeEvent<string>) => {
      setValueOfSelection(event.target.value as string);
      setSelectionIsOpen(true);
    
    };


    const handelSubmit = async () => {
        try {
            
            if (valueOfSelection === "fetchTopLocation") 
                {const locationData = await fetchTop(`http://localhost:8888/api/location/top-location${valueOfInputLocation !== "" ? `/${valueOfInputLocation}` : ""}`
              );
              setData(locationData); 
            }else if (valueOfSelection === "fetchTopOranization") {
                const oranization = await fetchTop("http://localhost:8888/api/location/top-organization")
                setData(oranization);   
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
        </Select>

       
         { valueOfSelection === "fetchTopLocation" ? <input 
            value={valueOfInputLocation} 
            onChange={(e) => setValueOfInputLocation(e.target.value)} 
            placeholder="חפש לפי עיר"
            />: valueOfSelection === "fetchTopOranization" && <input 
            value={valueOfInputOrganization} 
            onChange={(e) => setValueOfInputOrganization(e.target.value)} 
            placeholder="חפש לפי ארגון"
        />}
        <Button
        variant="contained"
        onClick={handelSubmit}
        style={{ marginTop: 20 }}>   
            Submit
        </Button>
    </div>
  )
}
