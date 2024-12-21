import React, { useState } from "react";
import { fetchTop } from "../../Fetches/fetchTop";
import {
  Button,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import allCitiesDTO from "../../types/DTO/allCitiesDTO";
import { fetchallCities } from "../../Fetches/fetchAllCities";

export interface Props {
  setData: (data: any) => void;
}

export default function SelectionData({ setData }: Props) {
  const [valueOfSelection, setValueOfSelection] = useState("");
  const [allCites, setAllCites] = useState<allCitiesDTO[]>([]);
  const [valueOfInputLocation, setValueOfInputLocation] = useState("");
  const [valueOfInputOrganization, setValueOfInputOrganization] = useState("");
  const [valueOfInputLocationForOrganization,setValueOfInputLocationForOrganization,] = useState("");

  const handleChange = async (event: SelectChangeEvent<string>) => {
    setValueOfSelection(event.target.value as string);
  };

  const handelSubmit = async () => {
    try {
      if (valueOfSelection === "fetchTopLocation") {
        const locationData = await fetchTop(
          `http://localhost:8888/api/location/top-location/${valueOfInputLocation}`
        );
        if (locationData && locationData[0] !== null) {
          console.log(locationData);
          console.log(valueOfInputLocation);
          
          setData(locationData);
        } else {
          console.log(locationData);

          alert("לא נמצא אזור");
        }
      } else if (valueOfSelection === "fetchTopOranization") {
        const oranizationData = await fetchTop(
          `http://localhost:8888/api/location/top-organization/${valueOfInputOrganization}`
        );
        if (oranizationData && oranizationData.length > 0) {
          console.log(oranizationData);

          setData(oranizationData);
        } else {
          console.log(oranizationData);

          alert("לא נמצא אזור");
        }
      } else if (valueOfSelection === "fetchTopLocationForOrganization") {
        const topLocationData = await fetchTop(
          `http://localhost:8888/api/location/top-location-for-organization/${valueOfInputLocationForOrganization}`
        );
        if (topLocationData && topLocationData.length > 0) {
          console.log(topLocationData);
          setData(topLocationData);
        } else {
          console.log(topLocationData);
          alert("לא נמצא ארגון");
        }
      }
    } catch (err) {
      console.log(err);
      setData([]);
    }
  };

  return (
    <div className="selection-data">
      <div className="selection-input">
        <div className="selection-title">
          <h3>שאילתא</h3>
          <Select
            value={valueOfSelection}
            onChange={handleChange}
            displayEmpty
            style={{ width: 250 }}
          >
            <MenuItem value="" disabled>בחר אפשרות</MenuItem>
            <MenuItem value="fetchTopLocation">אזורים עם כמות נפגעים מרבית</MenuItem>
            <MenuItem value="fetchTopOranization">חמישה ארגונים בולטים ביותר</MenuItem>
            <MenuItem value="fetchTopLocationForOrganization">אזור פגיעה מרבית לפי ארגון</MenuItem>
          </Select>
        </div>

        {valueOfSelection === "fetchTopLocation" ? (
          <TextField
            value={valueOfInputLocation}
            onChange={(e) => setValueOfInputLocation(e.target.value)}
            placeholder="חפש נפגעים לפי עיר"
            variant="outlined"
            style={{ marginTop: 20 }}
          />
        ) : valueOfSelection === "fetchTopOranization" ? (
          <TextField
            value={valueOfInputOrganization}
            onChange={(e) => setValueOfInputOrganization(e.target.value)}
            placeholder="חפש לפי עיר פעילות"
            variant="outlined"
            style={{ marginTop: 20 }}
          />
        ) : valueOfSelection === "fetchTopLocationForOrganization" ? (
          <TextField
            value={valueOfInputLocationForOrganization}
            onChange={(e) =>
              setValueOfInputLocationForOrganization(e.target.value)
            }
            placeholder="חפש לפי עיר פעילות הארגון"
            variant="outlined"
            style={{ marginTop: 20 }}
          />
        ) : null}
      </div>
      <Button
        className="submit-button"
        variant="contained"
        onClick={handelSubmit}
        style={{ marginTop: 20,color:"white", backgroundColor:"green", width: 120, height: 40 }}
      >
        שליחה
      </Button>
    </div>
  );
}