import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AdminPanel from "./pages/AdminPanel";
import ProfileDetails from "./pages/ProfileDetails";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin" element={<AdminPanel />} />
      <Route path="/profile/:id" element={<ProfileDetails />} />
    </Routes>
  );
}

export default App;
