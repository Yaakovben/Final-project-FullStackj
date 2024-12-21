import React from "react";
import MapData from "./components/map/MapData";
import { Navigate, Route, Routes } from "react-router-dom";
import GraphPage1 from "./components/graph/GraphPage1";
import GraphPage2 from "./components/graph/GraphPage2";

export default function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="map" element={<MapData />} />
        <Route path="Graph-page1" element={<GraphPage1/>}/>
        <Route path="Graph-page2" element={<GraphPage2/>}/>
        <Route path="/" element={<Navigate to={"/Graph-page1"}/>} />
      </Routes >
    </div>
  );
}
