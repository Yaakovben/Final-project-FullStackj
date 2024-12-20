import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import SelectionData from './SelectionData';
import topLocationDTO from '../types/DTO/topLocationDTO';


const customIcon = new L.Icon({
  iconUrl: "https://www.pngkit.com/png/detail/17-175946_location-vector-symbol-google-maps-marker-blue.png",
  iconSize: [25, 41], 
  iconAnchor: [15, 45], 
  popupAnchor: [0, -45], 
});


export default function MapData() {
  const[data,setData] = useState<topLocationDTO[] >([]);

  useEffect(()=>{
    console.log(data);
    
    
  },[data])

 
  return (

    <div  className='map-data'>

      <SelectionData setData={setData} />

      <MapContainer className='map'
        style={{
          height: '80vh',
          width: '100%',
        }}
        center={[51.505, -0.09]}
        zoom={13}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker
          icon={
            customIcon
          }
          position={[51.505, -0.09]}
          >
          <Popup>TEST</Popup>
       </Marker>
       {data.length > 0 && data.map((e,index)=>  (<Marker key={index}
          icon={ customIcon }
          position={[e.lat, e.long]}
          >
          <Popup>{`ארגון:${e.city}, כמות חולים:${e.casualties} אזור:${e.city}`}</Popup>
       </Marker>)) 
       }
      </MapContainer>
    </div>

  )
}
