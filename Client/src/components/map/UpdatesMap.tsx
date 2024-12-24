import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import topLocationDTO from "../../types/DTO/topLocationDTO";
import { fetchTop } from "../../Fetches/fetchTop";
import { Button, Popover, TextField, Typography } from "@mui/material";
import creatNewDTO from "../../types/DTO/creatNewDTO";

const customIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  iconSize: [30, 50],
  iconAnchor: [15, 45],
  popupAnchor: [0, -45],
});

export default function UpdatesMap() {
  const [data, setData] = useState<topLocationDTO[]>([]);
  const [newdata, setnewdata] = useState<creatNewDTO>();
  const [lat,setLat]= useState<number>(0);
  const [long,setLong]= useState<number>(0);
  const[organization,setOrganization]= useState<string>("");
  const[casualties,setCasualties]= useState<number>(0);
  const[openWindow,setOpenWindow]= useState(false);

  const fetchData = async () => {
    const response = await fetchTop("https://final-project-fullstackj-2.onrender.com/api/crud/get-all");
    setData(response);
  };

  const handleAdd = async()=>{
    try {
        if(organization ==="" || casualties <= 0 ){
            alert("all fields are required");
        }
        const res: Response = await fetch("https://final-project-fullstackj-2.onrender.com/api/crud/add-new", {

          body: JSON.stringify({ name: organization, casualties: casualties, lat: lat, long: long}),
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        
        });
        
      console.log(res);
      
      if (!res.ok) {
        console.log("Can`t add new eventTYTY");
         
      }
      const data = await res.json();
      setnewdata(data)
      setCasualties(0)
      setOrganization("")
  } catch (err) {
      console.log(err);
      console.log(newdata);
          
  }
    setOpenWindow(false)
  }


  useEffect(() => {
    fetchData();
  }, []);
  


  function MyComponent() {
    const map = useMapEvents({
      click: (e) => {
        map.locate()
        setLat(e.latlng.lat)
        setLong(e.latlng.lng)
        setOpenWindow(true) 
      },
      locationfound: (location) => {
        console.log('location found:', location)
      },
    })
    return null
  }
  

  function handleClose(): void {
    setOpenWindow(false);
    
  
  }

  return (
    <div>
      <h1 className="map-update">מפת עדכונים</h1>
      <MapContainer
        className="map"
        style={{
          height: "85vh",
          width: "100%",
          padding: "15px",
        }}
        center={[31.7683, 35.2137]}
        zoom={5}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
          <MyComponent /> 


          {openWindow && 
          <Popover
          open={openWindow}
          onClose={handleClose}
          anchorOrigin={{
          vertical: 'center',
          horizontal: 'center',
          }}>
        <Typography sx={{ p: 1, display: 'flex', flexDirection: 'column', gap: 1, padding: 2 }}>
              <h1>הוספת איום</h1>
              <TextField
              id="outlined-multiline-flexible"
              label="ארגון"
              multiline
              value={organization}
              onChange={(e) => setOrganization(e.target.value)}
              maxRows={4}
            />
             <TextField
              id="outlined-multiline-flexible"
              label="נפגעים"
              multiline
              onChange={(e) => setCasualties(parseInt(e.target.value))}
              value={casualties}
              maxRows={4}
            />
            <TextField
            disabled
            id="outlined-disabled"
            label="נ.צ רוחבי"
            onChange={(e) => setLong(parseFloat(e.target.value))}
            defaultValue={long}
            />
            <TextField
            disabled
            id="outlined-disabled"
            label="נ.צ אופקי"
            onChange={(e) => setLat(parseFloat(e.target.value))}
            defaultValue={lat}
            />
             <Button
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              style={{ backgroundColor: "#7f6d41" }}
              onClick={handleAdd}
              >בחר
        </Button>
          </Typography>
      </Popover>
             
            


      }
        {data.map((e, index) => (
          <Marker key={index} icon={customIcon} position={[e.lat, e.long]}>
            <Popup>
              <div className="popup-map">
                {e.city && <p>{e.city} <strong>:עיר</strong></p>}
                {e.organization && <p><strong>אירגון:</strong> {e.organization}</p>}
                {e.name && <p>{e.name}<strong>:שם</strong></p>}
                {e.totalEvents && <p><strong>מספר אירועים:</strong> {e.totalEvents}</p>}
                {e.casualties && <p><strong>מספר נפגעים:</strong> {e.casualties}</p>}
                {e.lat && <p><strong>נ.צ אופקי:</strong> {e.lat}</p>}
                {e.long && <p><strong>נ.צ רוחבי:</strong> {e.long}</p>}
              </div>
            </Popup>
          </Marker>
        ))}

        {
          
            <Marker  icon={customIcon} position={[lat, long]}>
              <Popup>
                <div className="popup-map">
                  {organization && <p><strong>אירגון:</strong> {organization}</p>}
                  {casualties && <p><strong>מספר נפגעים:</strong> {casualties}</p>}
                  {lat && <p><strong>נ.צ אופקי:</strong> {lat}</p>}
                  {long && <p><strong>נ.צ רוחבי:</strong> {long}</p>}
                </div>
              </Popup>
            </Marker>
          
        }


     
       
      </MapContainer>
    </div>
  );
}
