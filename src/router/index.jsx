
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Landing from "../Pages/Landing";
import Login from "../Pages/Login";
import './index.css'; //

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}