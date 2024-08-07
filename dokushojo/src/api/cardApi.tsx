import AddCardType from "../interfaces/AddCardType";
import BaseCardType from "../interfaces/BaseCardType";

const endpoint = import.meta.env.VITE_SERVER + "/cards/";

export const fetchAllCardsByDeckId = async (id: number) => {
  const results = await (await fetch(endpoint + "decks/" + id)).json();
  return results;
};

export const addCard = async (card: AddCardType) => {
  const config: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(card),
  };

  const results = await (await fetch(endpoint, config)).json();

  if (results) return results;
};

export const updateCard = async (id: number, card: BaseCardType) => {
  const config: RequestInit = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(card),
  };

  const results = await (await fetch(endpoint + id, config)).json();

  if (results) return results;
};

export const deleteCardById = async (id: number) => {
  const config: RequestInit = {
    method: "DELETE",
  };

  const results = await (await fetch(endpoint + id, config)).json();

  return results;
};
