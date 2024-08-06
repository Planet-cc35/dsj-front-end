import React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { UserType } from "../src/interfaces/UserType";
const endPoint = import.meta.env.VITE_SERVER + `/decks`;
const userPoint = import.meta.env.VITE_SERVER;

interface Deck {
  created_at: Date;
  customer_id: number;
  id: number;
  title: string;
  updated_at: Date;
}
interface DeckListProps {
  
}

const DeckList: React.FC<DeckListProps> = () => {
  const [decks, setDecks] = useState<Deck[]>([]); //state to store the deck data
  const [storeDeckId, setStoreDeckId] = useState<number | null>(null); //state to store the deck id
  const [newTitle, setNewTitle] = useState(""); //state for new title - edit button
  const [CreateDeckTitle, setCreateDeckTitle] = useState(""); // states to add new card
  const userId = 1;
  const location = useLocation();
  // Use Effects GET ALL DECKS FROM USER ID
  useEffect(() => {
    async function fetchDecks() {
      const response = await fetch(
        endPoint + `/customers/${userId}`
        // `https://dokushojo-backend.onrender.com/decks/users/${userId}`
      );
      const data: Deck[] = await response.json(); // JSON data
      console.log(data);
      setDecks(data);
    }

    fetchDecks();
  }, [userId]);
  
  useEffect(() => {
    getUserInfo();
  }, [])

  // Handler Functions
  const handleEdit = (deckId: number, deckTitle: string) => {
    setStoreDeckId(deckId);
    setNewTitle(deckTitle);
  };
  
  const getUserInfo = async() => {
    try{
      // const email = location.state.userEmail;
      const getUsers = await fetch(userPoint + "/emails")
      const emailArr = await getUsers.json();
      for(let emailObj of emailArr){
        if(emailObj.email_address === email){
          console.log("match!")
          return;
        } else{
          console.log("hell no")
        }
      }
    }
    catch{
      console.error("error");
    }
  }
  const handleSaveEdit = async () => {
    if (storeDeckId === null) return;

    const response = await fetch(
      // `https://dokushojo-backend.onrender.com/decks/${storeDeckId}`,
      endPoint + `/${storeDeckId}`,
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

  return (
    <div className="deck-list">
      <h2>Your Decks</h2>
      <div className="add-deck">
        <input
          type="text"
          placeholder="New deck title"
          value={CreateDeckTitle}
          onChange={(e) => e.target.value}
        />
        <button>Create a new Deck</button>
      </div>
      {decks.length ? (
        <div className="card-container">
          {decks.map((deck) => (
            <div className="card" key={deck.id}>
              {storeDeckId === deck.id ? (
                <div>
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
                <div>
                  <h3 className="card-title">{deck.title}</h3>
                  <div className="card-actions">
                    <button onClick={() => handleEdit(deck.id, deck.title)}>
                      Edit
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
