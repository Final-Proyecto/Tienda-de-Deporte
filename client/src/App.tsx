import { Routes, Route } from "react-router-dom";
import RegistroPages from "./modules/user/pages/RegistroPages";
import LoginPages from "./modules/user/pages/LoginPages";
import HomePages from "./modules/home/auth/HomePages";
import PageInit from "@/modules/home/PageInit";
import { Toaster } from "sonner";

export default function App() {
  return (
    <div className="App">
      <Toaster
        position="top-right"
        expand={false}
        richColors
        closeButton
        theme="dark"
        duration={4000}
        visibleToasts={3}
      />

      <Routes>
        <Route path="/" element={<PageInit />} />
        <Route path="/home" element={<HomePages />} />
        <Route path="/login" element={<LoginPages />} />
        <Route path="/registro" element={<RegistroPages />} />

        <Route
          path="*"
          element={
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-white mb-4">404</h1>
                <p className="text-gray-300 text-lg">Página no encontrada</p>
              </div>
            </div>
          }
        />
      </Routes>
    </div>
  );
}
