import React from "react";
import MapData from "./components/map/MapData";
import { Navigate, Route, Routes } from "react-router-dom";
import GtaphTypesAttack from "./components/graph/GtaphTypesAttack";


export default function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="map" element={<MapData />} />
        <Route path="Graph-typesattack" element={<GtaphTypesAttack/>}/>
        
        <Route path="/" element={<Navigate to={"/Graph-typesattack"}/>} />
      </Routes >
    </div>
  );
}
