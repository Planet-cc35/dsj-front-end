import React from "react";
import { useState } from "react";
import { updateSpeechObject } from "./globals.d";

const EditCard: React.FC<any> = ({
 cardTitle,
 cardBody,
 cardAudio,
 cardId,
}) => {
 const server = "https://back-end-f8b4.onrender.com/";

 const [updateSpeechObject, setSpeechObject] =
  useState<updateSpeechObject | null>(null);
 const [newAudio, setNewAudio] = useState<any | null>(null);
 const [title, setTitle] = useState<string>(cardTitle);
 const [body, setBody] = useState<string>(cardBody);
 const [btnView, setbtnView] = useState<string>("newCard");

 const speechFetch = async (text: string) => {
  try {
   const res = await fetch(createFetchURL(text), {
    method: "GET",
   });

   if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
   }
   const fetchedAudio = await res;
   console.log(fetchedAudio.url);
   setNewAudio(fetchedAudio.url);
   console.log(newAudio);
  } catch (error) {
   console.error("Error fetching audio:", error);
  }
 };

 function randomVoice(): string {
  const voices: string[] = ["Airi", "Fumi", "Akira"];
  const randomNum: number = Math.floor(Math.random() * voices.length);
  return voices[randomNum];
 }

 function createFetchURL(text: string): string {
  const base: string = "https://api.voicerss.org/";
  const APIkey: string = "?key=82bb9f270cf64d539fe3c0bb3fd8d70d";
  const lang: string = "hl=ja-jp";
  const voice: string = "v=" + randomVoice();
  const src: string = "src=" + encodeURIComponent(text);
  const fetchURL: string = base + APIkey + "&" + lang + "&" + voice + "&" + src;
  console.log("the fetch url is" + fetchURL);

  return fetchURL;
 }

 const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  await speechFetch(body);
  const editCardData = {
   id: cardId,
   title,
   body,
   audio: newAudio,
  };
  setSpeechObject(editCardData);
  setbtnView("editView");
  console.log(updateSpeechObject);
 };

 const handleSubmitToDb = async () => {
  const id = cardId;
  try {
   const response = await fetch(server + `/flashcards/${id}`, {
    method: "PUT",
    headers: {
     "Content-Type": "application/json",
    },
    body: JSON.stringify(updateSpeechObject),
   });
   if (!response.ok) {
    throw new Error("Failed to create the new card");
   }
   const createdCard = await response.json();
   setSpeechObject(createdCard);
  } catch (error) {
   console.error("Error creating card:", error);
  }
 };

 function handleReturn(): void {
  setbtnView("newCard");
 }

 const audioTest = () => {
  if (newAudio) {
   const audioClip = new Audio(newAudio);
   audioClip.play();
  } else {
   const oldAudio = new Audio(cardAudio);
   oldAudio.play();
  }
 };

 return (
  <>
   <div className="container border">
    <form className="palette-bg" onSubmit={handleSubmit}>
     <div className="mb-3">
      <label className="form-label">Rename your card</label>
      <input
       maxLength={75}
       type="text"
       className="form-control"
       aria-describedby="emailHelp"
       value={title}
       onChange={(e) => setTitle(e.target.value)}
      />
      <div className="form-text">
       The title will be hidden during study mode. This text won't be included
       in the audio.
      </div>
     </div>
     <div className="mb-3">
      <textarea
       name="study-note"
       id="text-to-speech"
       rows={12}
       cols={75}
       value={body}
       onChange={(e) => setBody(e.target.value)}></textarea>
      <div className="form-text">
       This text will be hidden during study mode.
      </div>
     </div>
     {btnView === "newCard" ? (
      <button type="submit" className="btn btn-warning mb-3">
       Update your card
      </button>
     ) : (
      <>
       <button className="btn btn-primary mb-3" onClick={audioTest}>
        Test the audio
       </button>
       <button className="btn btn-primary mb-3" onClick={handleSubmitToDb}>
        Update this card
       </button>
       <button className="btn btn-warning mb-3" onClick={handleReturn}>
        Edit further
       </button>
      </>
     )}
    </form>
   </div>
   <div></div>
  </>
 );
};

export default EditCard;
