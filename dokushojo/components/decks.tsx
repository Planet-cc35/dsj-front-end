import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, BrowserRouter, Route, Routes } from "react-router-dom";

const endPoint = import.meta.env.VITE_SERVER + ``;

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
  const [getDeck, setGetDeck] = useState({});
  const userId = 1;

  // Use Effects GET ALL DECKS FROM USER ID
  useEffect(() => {
    async function fetchDecks() {
      const response = await fetch(
        endPoint + `/decks/customers/${userId}`
        // `https://dokushojo-backend.onrender.com/decks/users/${userId}`
      );
      const data: DeckDatabase[] = await response.json(); // JSON data
      setDecks(data);
    }

    fetchDecks();
  }, [userId]);

  // Handler Functions
  const handleEdit = (deckId: number, deckTitle: string) => {
    setStoreDeckId(deckId);
    setNewTitle(deckTitle);
  };

  const handleSaveEdit = async () => {
    if (storeDeckId === null) return;

    const response = await fetch(
      // `https://dokushojo-backend.onrender.com/decks/${storeDeckId}`,
      endPoint + `/decks/${storeDeckId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ deck_title: newTitle }),
      }
    );

    if (response.ok) {
      setDecks(
        decks.map((deck) =>
          deck.id === storeDeckId ? { ...deck, deck_title: newTitle } : deck
        )
      );
      setStoreDeckId(null);
      setNewTitle("");
    } else {
      console.error("Failed to update the deck.");
    }
  };

  const handleDelete = async (deckId: number) => {
    const response = await fetch(
      endPoint + `/decks/${deckId}`,
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
    await fetch(endPoint + `/decks`, {
      headers: {
        "Content-Type": "application/JSON",
      },
      method: "POST",
      body: JSON.stringify(baseDeck),
    });
  };
  const handleGetDeck = async (DeckId: number) => {
    const response = await fetch(endPoint + `/cards/decks/${DeckId}`);
    const data: CardDatabase[] = await response.json();
    setGetDeck(data);
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
                  <button onClick={handleSaveEdit}>Save</button>
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
                    <button onClick={() => handleGetDeck(deck.id)}>
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
