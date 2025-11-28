
import PageLoginRegis from "./pages/page_login_register/PageLoginRegis";
import Home from "./pages/home/Home";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/*" element={<PageLoginRegis />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}

export default App;
