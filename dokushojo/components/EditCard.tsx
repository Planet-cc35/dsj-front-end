import React, { useEffect } from "react";
import { useState } from "react";
import { speechObject } from "./globals.d";

interface EditCardProps {
  setCardView: Function;
  cardData: speechObject;
}

const EditCard: React.FC<EditCardProps> = ({ setCardView, cardData }) => {
  const server = import.meta.env.VITE_SERVER;
  // const server = "https://dokushojo-backend.onrender.com";

  const [speechObject, setSpeechObject] = useState<speechObject | null>(null);
  const [newAudio, setNewAudio] = useState<any | null>(null);
  const [title, setTitle] = useState<string | undefined>(cardData.card_title);
  const [body, setBody] = useState<string>(cardData.card_body);
  const [btnView, setbtnView] = useState<string>("newCard");

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
    const fetchURL: string =
      base + APIkey + "&" + lang + "&" + voice + "&" + src;
    setNewAudio(fetchURL); //EDITED

    return fetchURL;
  }

  useEffect(() => {
    if (newAudio) {
      const editCardData: speechObject = {
        card_title: title,
        card_body: body,
        audio: newAudio,
      };
      setSpeechObject(editCardData);
      setbtnView("editView");
    }
  }, [newAudio, title, body]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await createFetchURL(body); // EDITED
  };

  const handleSubmitToDb = async () => {
    const id = cardData.card_id;
    try {
      const response = await fetch(server + `/flashcards/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(speechObject),
      });
      if (!response.ok) {
        throw new Error("Failed to create the new card");
      }
      const createdCard = await response.json();
      setSpeechObject(createdCard);
    } catch (error) {
      console.error("Error creating card:", error);
    }

    setCardView("study");
  };

  function handleReturn(): void {
    setbtnView("newCard");
  }

  const audioTest = () => {
    if (newAudio) {
      const audioClip = new Audio(newAudio);
      audioClip.play();
    } else {
      const oldAudio = new Audio(cardData.audio);
      oldAudio.play();
    }
  };

  return (
    <>
      <div className="container border">
        <form className="palette-bg" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">
              <h2>Edit your card</h2>
            </label>
            <input
              maxLength={75}
              type="text"
              className="form-control"
              aria-describedby="emailHelp"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <div className="form-text">
              The title will be hidden during study mode. This text won't be
              included in the audio.
            </div>
          </div>
          <div className="mb-3">
            <textarea
              name="study-note"
              id="text-to-speech"
              rows={12}
              cols={75}
              value={body}
              onChange={(e) => setBody(e.target.value)}
            ></textarea>
            <div className="form-text">
              This text will be hidden during study mode.
            </div>
          </div>
          {btnView === "newCard" ? (
            <button type="submit" className="btn btn-warning btn-lg mb-3">
              Update your card
            </button>
          ) : (
            <>
              <button className="btn btn-primary mb-3" onClick={audioTest}>
                Test the audio
              </button>
              <button
                className="btn btn-primary mb-3"
                onClick={handleSubmitToDb}
              >
                Update this card
              </button>
              <button
                className="btn btn-warning btn-lg mb-3"
                onClick={handleReturn}
              >
                Edit further
              </button>
            </>
          )}
        </form>
        <button
          className="btn btn-secondary btn-lg mb-4"
          onClick={() => {
            setCardView("study");
          }}
        >
          Return to study view
        </button>
      </div>
      <div></div>
    </>
  );
};

export default EditCard;
