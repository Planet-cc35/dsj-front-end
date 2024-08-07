import React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { UserType } from "../src/interfaces/UserType";

import * as deckApi from "../src/api/deckApi";
const endPoint = import.meta.env.VITE_SERVER + `/decks`;
const userPoint = import.meta.env.VITE_SERVER;
import {
  useNavigate,
  // Navigate,
  // BrowserRouter,
  // Route,
  // Routes,
} from "react-router-dom";
import EditDeckType from "../src/interfaces/EditDeckType";
// import Card from "./Card";

interface DeckDatabase extends BaseDeck {
  created_at: Date;
  // customer_id: number;
  id: number;
  // title: string;
  updated_at: Date;
}
interface CardDatabase {
  id: number;
  deck_id: number;
  front: string;
  back: string;
  created_at: Date;
  updated_at: Date;
  audio_url: null;
}
interface DeckListProps {}
interface BaseDeck {
  title: string;
  customer_id: number;
}

const DeckList: React.FC<DeckListProps> = () => {
  const navigate = useNavigate();
  const [decks, setDecks] = useState<DeckDatabase[]>([]); //state to store the deck data
  const [storeDeckId, setStoreDeckId] = useState<number | null>(null); //state to store the deck id
  const [newTitle, setNewTitle] = useState(""); //state for new title - edit button
  const [CreateDeckTitle, setCreateDeckTitle] = useState(""); // states to add new card
  
  const location = useLocation();
  const userId = location.state.userId;
 
  // Use Effects GET ALL DECKS FROM USER ID
  useEffect(() => {
    getAllDecks();
    console.log("workering?")
  }, []);
  

  

  // Handler Functions
  const handleEdit = (deckId: number, deckTitle: string) => {
    setStoreDeckId(deckId);
    setNewTitle(deckTitle);
  };
  
  const getAllDecks = async() => {
    const allDecksOfUser = await deckApi.fetchDecks(userId);
    setDecks(allDecksOfUser);
  }

  const submitEdit = async () => {
    if(!storeDeckId || !newTitle) return;
    const response = await deckApi.editDeckName(storeDeckId, newTitle);
    const currentDecksWithoutEditedDeck = decks.filter((deck: DeckDatabase ) => deck.id !== response.id);
    setDecks([response, ...currentDecksWithoutEditedDeck]);
    setStoreDeckId(null);
    setNewTitle("");
    
  };

  const handleDelete = async (deckId: number) => {
    const response = await fetch(
      endPoint + `/${deckId}`,
      // `https://dokushojo-backend.onrender.com/decks/${deckId}`,
      {
        method: "DELETE",
      }
    );

    if (response.ok) {
      setDecks(decks.filter((deck) => deck.id !== deckId));
    } else {
      console.error("Failed to delete the deck.");
    }
  };
  const handleCreate = async () => {
    const baseDeck: BaseDeck = {
      customer_id: userId,
      title: CreateDeckTitle,
    };
    const send = await fetch(endPoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/JSON",
      },
      body: JSON.stringify(baseDeck),
    });
    const response = await(send).json();
    setDecks([response, ...decks]);
  };
  const handleGetDeck = async(deckId: number) => {
    
  };

  return (
    <div className="deck-list">
      <h2>Your Decks</h2>
      <div className="add-deck">
        <input
          type="text"
          placeholder="New deck title"
          value={CreateDeckTitle}
          onChange={(e) => setCreateDeckTitle(e.target.value)}
        />
        <button onClick={handleCreate}>Create a new Deck</button>
      </div>
      {decks.length ? (
        <div className="card-container">
          {decks.map((deck) => (
            <div className="card" key={deck.id}>
              {storeDeckId === deck.id ? (
                <div className="card-body">
                  <input
                    key={deck.id}
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                  />
                  <button onClick={submitEdit}>Save</button>
                  <button
                    onClick={() => {
                      setStoreDeckId(null);
                      setNewTitle("");
                    }}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="card-body">
                  <h3 className="card-title">{deck.title}</h3>
                  <div className="card-actions">
                    <button onClick={() => handleEdit(deck.id, deck.title)}>
                      Edit
                    </button>
                    {/* <Routes>
                      <Route path="/study" element={<Card/ studyCards=getDeck>}>
                    </Routes> */}
                    <button
                      
                    >
                      Study
                    </button>
                    <button onClick={() => handleDelete(deck.id)}>
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>No decks found</p>
      )}
    </div>
  );
};

export default DeckList;
// export default function DeckListWrapper() {
//   return (
//     <BrowserRouter>
//       <DeckList />
//     </BrowserRouter>
//   );
// }
