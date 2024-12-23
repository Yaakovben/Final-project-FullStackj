import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import topLocationDTO from "../../types/DTO/topLocationDTO";
import SelectionData from "./SelectionData";
import { fetchTop } from "../../Fetches/fetchTop";


const customIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  iconSize: [30, 50],
  iconAnchor: [15, 45],
  popupAnchor: [0, -45],
});

export default function UpdatesMap() {
    const [data, setData] = useState<topLocationDTO[]>([]);


    const fetchData = async ()=>{
        const response = await  fetchTop("http://localhost:8888/api/crud/get-all")
        setData(response)
    } 
    
    useEffect(() => {
        fetchData();
        console.log(data);
        
       
      }, [data]);
  return (
    <div>

<h1>nojbk</h1>
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
        
                <Marker icon={customIcon} position={[31.8517, 35.2656]}>
                  <Popup>TEST</Popup>
                </Marker>
        
                {data.length > 0 &&
                  data.map((e, index) => (
                    <Marker key={index} icon={customIcon} position={[e.lat, e.long]} >
                      <Popup >
                      <div className="popup-map">
                      {e.city && <p> {e.city} <strong>:עיר </strong></p>}
                      {e.organization && <p><strong>אירגון:</strong> {e.organization}</p>}
                      {e.name && <p> {e.name}<strong>:שם </strong></p>}
                      {e.totalEvents && <p><strong>מספר אירועים: </strong> {e.totalEvents}</p>}
                      {e.casualties && <p><strong>מספר נפגעים: </strong> {e.casualties}</p>}
                      {e.lat && <p><strong> נ.צ אופקי: </strong> {e.lat}</p>}
                      {e.long && <p><strong> נ.צ רוחבי: </strong> {e.long}</p>}
                      </div>
                      </Popup>
                    </Marker>
                  ))}
              </MapContainer>
    </div>
  )
}
