import { Routes, Route } from "react-router-dom";
import RegistroPages from "./pages/RegistroPages";
import LoginPages from "./pages/LoginPages";
import HomePages from "./pages/HomePages";
import PageInit from "./pages/PageInit";

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
