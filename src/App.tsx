import { Toaster } from "@/components/ui/toaster";
import { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import { auth } from "./firebase";
import DropZonePage from "./pages/DropZonePage";
import HomePage from "./pages/HomePage";
import KairosAIPage from "./pages/KairosAIPage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  auth.onAuthStateChanged(function (user) {
    if (user) {
      setIsLoggedIn(true);
    }
  });

  return (
    <div>
      <Toaster />
      <Router>
        <Navbar onIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />
        <Routes>
          <Route path="/" element={<HomePage isLoggedIn={isLoggedIn} />} />
          <Route path="/dropzone" element={<DropZonePage />} />
          <Route path="/kairos" element={<KairosAIPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
