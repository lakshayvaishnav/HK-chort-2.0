import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Reciever from "./components/Reciever";
import Sender from "./components/Sender";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/reciever" element={<Reciever />} />
          <Route path="/Sender" element={<Sender />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
