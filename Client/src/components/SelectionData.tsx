import React, { useState } from 'react'
import { fetchTopLocation } from '../Fetches/fetchTopLocation'
import { Button, MenuItem, Select, SelectChangeEvent } from '@mui/material'

export interface Props{
    setData: (data:any)=>void
    setDisplayData: (data:any)=>void
}

export default function SelectionData({setData,setDisplayData}:Props) {
    const [valueOfSelection, setValueOfSelection] = useState("");

    const handleChange = (event: SelectChangeEvent<string>) => {
      setValueOfSelection(event.target.value as string);
    };

    const handelSubmit = async()=>{
        if(valueOfSelection === "fetchTopLocation"){
        setData(await fetchTopLocation())
        }else{
            setData(null)
        }
        setDisplayData(true)
    }

  return (
    <div>
        <Select
        value={valueOfSelection}
        onChange={handleChange}
        displayEmpty
        style={{ width: 200, marginTop: 20 }}>
            <MenuItem value="" disabled>בחר אפשרות</MenuItem>
            <MenuItem value="fetchTopLocation">אזורים עם כמות נפגעים מרבית</MenuItem>
            <MenuItem value="option2">TEST 2</MenuItem>
        </Select>
        <Button
        variant="contained"
        onClick={handelSubmit}
        style={{ marginTop: 20 }}>   
            Submit
        </Button>
    </div>
  )
}
