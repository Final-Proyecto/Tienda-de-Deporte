import { Routes, Route } from "react-router-dom";
import RegistroPages from "../modules/auth/pages/RegistroPages";
import LoginPages from "../modules/auth/pages/LoginPages";
import HomePages from "../home/pages/HomePages";
import PageInit from "../app/PageInit";

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<PageInit />} />
        <Route path="/home" element={<HomePages />} />
        <Route path="/login" element={<LoginPages />} />
        <Route path="/registro" element={<RegistroPages />} />
      </Routes>
    </div>
  );
}
