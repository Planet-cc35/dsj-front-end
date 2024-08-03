import React from "react";
import { useState, useEffect } from "react";
import { speechObject } from "./globals.d";


interface Deck {
    deck_id: number;
    deck_title: string;
  }  

const DeckList: React.FC<any> = () => {
    const [decks, setDecks] = useState<Deck[]>([]); //state to store the deck data 
    const [storeDeckId, setStoreDeckId] = useState<number | null>(null); //state to store the deck id
    const [newTitle, setNewTitle] = useState(''); //state for new title - edit button
    const [CreateDeckTitle, setCreateDeckTitle] = useState(''); // states to add new card
    const userId = 1;

    // Use Effects GET ALL DECKS FROM USER ID
    useEffect(() => {
        async function fetchDecks() {
            const response = await fetch(`http://localhost:3000/decks/users/${userId}`);
            const data: Deck[] = await response.json(); // JSON data
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

        const response = await fetch(`http://localhost:3000/decks/${storeDeckId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'},
                 body: JSON.stringify({ deck_title: newTitle }),
            });

            if (response.ok) {
                setDecks(decks.map(deck => 
                    deck.deck_id === storeDeckId 
                        ? { ...deck, deck_title: newTitle } 
                        : deck
                ));
                setStoreDeckId(null);
                setNewTitle('');
            } else {
                console.error('Failed to update the deck.');
            }
    
    };

    const handleDelete = async (deckId: number) => {
            
        const response = await fetch(`http://localhost:3000/decks/${deckId}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            setDecks(decks.filter(deck => deck.deck_id !== deckId));
        } else {
            console.error('Failed to delete the deck.');
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
                    onChange={(e) => (e.target.value)}
                />
                <button >Create a new Deck</button>
            </div>
            {decks.length > 0 ? (
                <div className="card-container">
                    {decks.map(deck => (
                        <div className="card" key={deck.deck_id}>
                            {storeDeckId === deck.deck_id ? (
                                <div>
                                    <input 
                                        key={deck.deck_id}
                                        type="text" 
                                        value={newTitle} 
                                        onChange={(e) => setNewTitle(e.target.value)} 
                                    />
                                    <button onClick={handleSaveEdit}>Save</button>
                                    <button onClick={() => {
                                        setStoreDeckId(null);
                                        setNewTitle('');
                                    }}>Cancel</button>
                                </div>
                            ) : (
                                <div>
                                    <h3 className="card-title">{deck.deck_title}</h3>
                                    <div className="card-actions">
                                        <button onClick={() => handleEdit(deck.deck_id, deck.deck_title)}>Edit</button>
                                        <button onClick={() => handleDelete(deck.deck_id)}>Delete</button>
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
}

export default DeckList;