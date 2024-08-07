import { BrowserRouter, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Login from "../components/Login";
import DeckList from "../components/decks";
import Deck from "./pages/Deck";
// import Deck from "./pages/Deck";
// import Card from "../components/Card";
// import Dojo from "./Dojo";

function App() {
  const location = useLocation();
  // const isDojoPage = location.pathname === "/dojo";
  const isDeckPage = location.pathname === "/decks";
  const navigate = useNavigate();
  return (
    <div className="container text-center mw-100 ">
      <div className="row vh-100">
        {/* {!isDojoPage && ( */}
        {!isDeckPage && (
          <div className="card">
            
            <img
              src="Dokushojo.svg"
              className="m-auto"
              alt="Dokushojo"
              width={500}
            />
            <div className="button">
              <button className="btn btn-primary" aria-label="Small button group" onClick={() => navigate("/login")}>Log In</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function AppWrapper() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/decks" element={<DeckList />} />
        <Route path="/study" element={<Deck />} />
      </Routes>
    </BrowserRouter>
  );
}
