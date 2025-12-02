
import PageLoginRegis from "./pages/page_login_register/PageLoginRegis";
import Home from "./pages/books/BookPage";

import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/*" element={<PageLoginRegis />} />
      <Route path="/account/books" element={<Home />} />
    </Routes>
  );
}

export default App;
