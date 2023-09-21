import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import CharacterDetails from "./pages/CharacterDetails";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path=":characterId" element={<CharacterDetails />} />
    </Routes>
  );
}

export default App;
