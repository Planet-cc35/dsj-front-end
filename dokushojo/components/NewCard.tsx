import React from "react";
import { useState } from "react";
import { speechObject } from "./globals.d";

const NewCard: React.FC<any> = ({}) => {
 const [speechObject, setSpeechObject] = useState<speechObject | null>(null);
 const [newAudio, setNewAudio] = useState<any | null>(null);
 const [title, setTitle] = useState<string>("");
 const [body, setBody] = useState<string>("");

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
   console.log(newAudio)
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
  const newCardData = {
   title,
   body,
   audio: newAudio,
  };
  setSpeechObject(newCardData)
  console.log(speechObject)
//   try {
//    const response = await fetch("https://server", {
//     method: "POST",
//     headers: {
//      "Content-Type": "application/json",
//     },
//     body: JSON.stringify(newCardData),
//    });
//    if (!response.ok) {
//     throw new Error("Failed to create the new card");
//    }
//    const createdCard = await response.json();
//    setSpeechObject(createdCard);
//   } catch (error) {
//    console.error("Error creating card:", error);
//   }
 };

 const audioTest = () => {
    if (newAudio) {
        const audioClip = new Audio(newAudio);
        audioClip.play();
    } else {
        console.log("No audio is available. Please fix the " + newAudio + " element.")
    }
 }

 return (
  <>
   <div className="container border">
    <form className="palette-bg" onSubmit={handleSubmit}>
     <div className="mb-3">
      <label className="form-label">Name your first card</label>
      <input
       maxLength={75}
       type="text"
       className="form-control"
       aria-describedby="emailHelp"
       placeholder="初めまして"
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
     <button type="submit" className="btn btn-warning mb-3">
      Make a new study card
     </button>
    </form>
    {newAudio && (
        <button className="btn btn-primary" onClick={audioTest}>Test the audio.</button>
    )}
   </div>
   <div></div>
  </>
 );
};

export default NewCard;
