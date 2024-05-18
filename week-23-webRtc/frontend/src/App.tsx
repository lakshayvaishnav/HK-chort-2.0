import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Receiver } from "./components/Receiver";
import { Sender } from "./components/Sender";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/reciever" element={<Receiver />} />
          <Route path="/Sender" element={<Sender />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
