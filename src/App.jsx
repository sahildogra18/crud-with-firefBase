import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Read from "./Components/Read";
import Create from "./Components/Create";
import Edit from "./Components/Edit";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Read />} />
          <Route path="/create" element={<Create />} />
          <Route path="/edit" element={<Edit />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
