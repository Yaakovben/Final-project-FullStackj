import React from "react";
import MapData from "./components/map/MapData";
import { Navigate, Route, Routes } from "react-router-dom";
import GtaphTypesAttack from "./components/graph/GraphTypesAttack";
import GraphEventsYears from "./components/graph/GraphEventsYears";
import NavBar from "./components/NavBar";


export default function App() {
  return (
    <div className="app">
      <NavBar />
      <Routes>
        <Route path="map" element={<MapData />} />
        <Route path="Graph-typesattack" element={<GtaphTypesAttack/>}/>
        <Route path="Graph-events-years" element={<GraphEventsYears/>}/>
        <Route path="/" element={<Navigate to={"/Graph-events-years"}/>} />
      </Routes >
    </div>
  );
}
