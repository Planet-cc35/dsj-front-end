
const endPoint = import.meta.env.VITE_SERVER + "/decks"

export const editDeckName = async(id: number, newTitle: string) => {
    const url = endPoint + `/${id}`;
    const newTitleObj = {
        title: newTitle,
    }
    const changeNameReq = await fetch(url , {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
          },
        body: JSON.stringify(newTitleObj),
    });
    const results = await changeNameReq.json();
    if (results) return results;
}

export const fetchDecks = async(id: number) => {
    const response = await fetch(endPoint + `/customers/${id}`);
    return await response.json(); // JSON data
}