import MapData from "./components/map/MapData";
import { Navigate, Route, Routes } from "react-router-dom";
import GtaphTypesAttack from "./components/graph/GraphTypesAttack";
import GraphEventsYears from "./components/graph/GraphEventsYears";
import NavBar from "./components/NavBar";
import GraphFiveTopOrganization from "./components/graph/GraphFiveTopOrganization";
import GraphOrgainzationByYears from "./components/graph/GraphOrgainzationByYears";
import UpdatesMap from "./components/map/UpdatesMap";


export default function App() {
  return (
    <div className="app">
      <NavBar />
      <Routes>
        <Route path="map-data" element={<MapData />} />
        <Route path="Graph-typesattack" element={<GtaphTypesAttack/>}/>
        <Route path="Graph-events-years" element={<GraphEventsYears/>}/>
        <Route path="Graph-five-top-oraganization" element={<GraphFiveTopOrganization/>}/>
        <Route path="Graph-organization-by-years" element={<GraphOrgainzationByYears/>}/>
        <Route path="Updates-map" element={<UpdatesMap/>}/>
        <Route path="/" element={<Navigate to={"/map"}/>} />
      </Routes >
    </div>
  );
}
