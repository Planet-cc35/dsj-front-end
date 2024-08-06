const endpoint = import.meta.env.VITE_SERVER + "/cards/";

export const fetchAllCardsByDeckId = async (id: number) => {
  const results = await (await fetch(endpoint + "decks/" + id)).json();
  return results;
};

export const deleteCardById = async (id: number) => {
  const config: RequestInit = {
    method: "DELETE",
  };

  const results = await (await fetch(endpoint + id, config)).json();

  return results;
};
