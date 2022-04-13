import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";
import App from "./App";
import StartAppointment from "./components/StartAppointment";

const Main = () => {
  return (
        <BrowserRouter>
            <Routes>
              <Route path="/" element={<App/>}>
              </Route>

              <Route path="/start-appointment" element={<StartAppointment/>}>
              </Route>

            </Routes>
        </BrowserRouter>
            
            
        
  )
}

export default Main