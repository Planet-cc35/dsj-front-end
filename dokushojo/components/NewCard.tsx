import React from 'react';
import { useState } from 'react';

const NewCard: React.FC<any> = ({}) => {
const [textToSpeech, setTextToSpeech] = useState("")


const handleSetTextToSpeech = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const textBody = event.currentTarget[1]
    assertIsFormFieldElement(textBody)
    console.log(textBody.value)
    setTextToSpeech(textBody.value)

}

const SpeechFetch = async () {
    const res: any = await fetch(createFetchURL(), {
        method: "GET"
    })
}

function randomVoice(): string {
    const voices: string[] = ["Airi", "Fumi", "Akira"]
    const randomNum: number = Math.floor(Math.random() * voices.length)
    return voices[randomNum]
}

function createFetchURL(): string {
    const base: string = "https://api.voicerss.org/"
    const APIkey: string = "?key=82bb9f270cf64d539fe3c0bb3fd8d70d"
    const lang: string = "hl=ja-jp"
    const voice: string = randomVoice()
    const src: string = "src=" + textToSpeech
    const fetchURL: string = base + APIkey + "&" + lang + "&" + voice + "&" + src


    return fetchURL

}

function assertIsFormFieldElement(element: Element): asserts element is HTMLInputElement | HTMLSelectElement | HTMLButtonElement {
        if (!("value" in element)) {
            throw new Error(`Element is not a form field element`);
        }
    }

    return (
<>
<div className='container border'>
      <form className='palette-bg' onSubmit={handleSetTextToSpeech}>
        <div className='mb-3'>
          <label className='form-label'>Name your first card</label>
          <input maxLength={75} type='text' className='form-control' aria-describedby="emailHelp" placeholder='初めまして'></input>
          <div className='form-text'>The title will be hidden during study mode. This text won't be included in the audio.</div>
        </div>
        <div className='mb-3'>
          <textarea name="study-note" id="text-to-speech"rows={12} cols={75}></textarea>
          <div className='form-text'>This text will be hidden during study mode.</div>
        </div>
        <button type='submit' className='btn btn-warning mb-3'>Make a new study card</button>
      </form>
    </div>
    <div></div>
    </>
    )
}

export default NewCard