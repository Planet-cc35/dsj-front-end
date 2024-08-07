import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
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

  return (
    <div className="container text-center mw-100 ">
      <div className="row vh-100">
        {/* {!isDojoPage && ( */}
        {!isDeckPage && (
          <div className="col-9 pt-2">
            <img
              src="circle copiar.svg"
              className="circle-image spin-image"
              alt="Circle"
            />
            <img
              src="Dokushojo.svg"
              className="circle-image center-image"
              alt="Dokushojo"
            />
            <img
              src="Dokushojo-title.svg"
              className="circle-title center-title"
              alt="Dokushojo"
            />
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
