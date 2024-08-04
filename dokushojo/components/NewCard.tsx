import React, { useEffect } from "react";
import { useState } from "react";
import { speechObject } from "./globals.d";

interface NewCardProps {
  setView: Function;
}

const NewCard: React.FC<NewCardProps> = ({ setView }) => {
  const server = "https://dokushojo-backend.onrender.com";

  const [speechObject, setSpeechObject] = useState<speechObject | null>(null);
  const [newAudio, setNewAudio] = useState<any | null>(null);
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [btnView, setbtnView] = useState<string>("newCard");

  // const speechFetch = async (text: string) => {
  //   try {
  //     const res = await fetch(createFetchURL(text), {
  //       method: "GET",
  //     });

  //     if (!res.ok) {
  //       throw new Error(`HTTP error! status: ${res.status}`);
  //     }

  //     const fetchedAudio = await res.json();
  //     console.log(fetchedAudio);
  //     setNewAudio(fetchedAudio.url);
  //     console.log(newAudio);
  //   } catch (error) {
  //     console.error("Error fetching audio:", error);
  //   }
  // };

  useEffect(() => {
    console.log("New audio updated:", newAudio);
    if (newAudio) {
      const newCardData: speechObject = {
        card_title: title,
        card_body: body,
        audio: newAudio,
      };
      setSpeechObject(newCardData);
      setbtnView("editView");
    }
  }, [newAudio, title, body]);

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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await createFetchURL(body); // EDITED
    console.log("button pressed. Wating for audio.");
  };

  const handleSubmitToDb = async () => {
    try {
      const response = await fetch(server + "/flashcards", {
        method: "POST",
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
  };

  function handleReturn(): void {
    setbtnView("newCard");
  }

  const audioTest = () => {
    if (newAudio) {
      const audioClip = new Audio(newAudio);
      audioClip.play();
    } else {
      console.log(
        "No audio is available. Please fix the " + newAudio + " element."
      );
    }
  };

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
              The title will be hidden during study mode. This text won't be
              included in the audio.
            </div>
          </div>
          <div className=" mb-3">
            <textarea
              className="form-control"
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
            <button type="submit" className="btn btn-warning mb-3">
              Make a new study card
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
                Create this card
              </button>
              <button className="btn btn-warning mb-3" onClick={handleReturn}>
                Edit the text
              </button>
            </>
          )}
        </form>
      </div>
      <div></div>
      <button
        className="btn btn-secondary mb-4"
        onClick={() => {
          setView("study");
        }}
      >
        Return to study view
      </button>
    </>
  );
};

export default NewCard;
