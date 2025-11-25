import CreateAccount from "./pages/logreg/CreateAccount";
import Login from "./pages/logreg/Login";
import PageLoginRegis from "./pages/PageLoginRegis";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    // <Routes>
    //   <Route path="/" element={<Login />} />
    //   <Route path="/create-account" element={<CreateAccount />} />
    // </Routes>
    <body>
      <PageLoginRegis />
    </body>
  );
}

export default App;
