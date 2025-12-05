
import PageLoginRegis from "./pages/page_login_register/PageLoginRegis";
import Home from "./pages/books/BookPage";
import AiRecommendationPage from "./pages/airecommend/AiRecommendationPage";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/*" element={<PageLoginRegis />} />
      <Route path="/account/books" element={<Home />} />
      <Route path="/ai-recommendation" element={<AiRecommendationPage />} />
    </Routes>
  );
}

export default App;
