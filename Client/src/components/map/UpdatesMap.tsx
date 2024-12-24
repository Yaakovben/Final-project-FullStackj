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
  const [newdata, setnewdata] = useState<creatNewDTO>([]);
  const [lat,setLat]= useState<number>(0);
  const [long,setLong]= useState<number>(0);
  const[organization,setOrganization]= useState<string>("");
  const[casualties,setCasualties]= useState<number>(0);
  const[openWindow,setOpenWindow]= useState(false);

  const fetchData = async () => {
    const response = await fetchTop("http://localhost:8888/api/crud/get-all");
    setData(response);
  };

  const handleAdd = ()=>{
    setnewdata({ lat, long, organization, casualties });
    setOpenWindow(false)
  }


  useEffect(() => {
    fetchData();
  }, []);


  function MyComponent() {
    const map = useMapEvents({
      click: (e) => {
        map.locate()
        // setnewdata([...newdata, { lat: e.latlng.lat, long: e.latlng.lng }])
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
  

  function handleClose(event: {}, reason: "backdropClick" | "escapeKeyDown"): void {
    throw new Error("Function not implemented.");
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
              maxRows={4}
            />
             <TextField
              id="outlined-multiline-flexible"
              label="נפגעים"
              multiline
              value={casualties}
              maxRows={4}
            />
            <TextField
            disabled
            id="outlined-disabled"
            label="נ.צ רוחבי"
            defaultValue={long}
            />
            <TextField
            disabled
            id="outlined-disabled"
            label="נ.צ אופקי"
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
          newdata.map((e, index) => (
            <Marker key={index} icon={customIcon} position={[e.lat, e.long]}>
              <Popup>
                <div className="popup-map">
                  {e.lat && <p><strong>נ.צ אופקי:</strong> {e.lat}</p>}
                  {e.long && <p><strong>נ.צ רוחבי:</strong> {e.long}</p>}
                </div>
              </Popup>
            </Marker>
          ))
        }


     
       
      </MapContainer>
    </div>
  );
}
