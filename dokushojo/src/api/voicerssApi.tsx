import utils from "../utils";

export const audioUrlBuilder = (text: string) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const apiKey = import.meta.env.VITE_API_KEY;
  const voices = ["Airi", "Fumi", "Akira"];

  const language = "hl=ja-jp";
  const voice = "v=" + utils.randomItemList(voices);
  const textToParse = "src=" + encodeURIComponent(text);

  const audioUrl =
    apiUrl + apiKey + "&" + language + "&" + voice + "&" + textToParse;

  return audioUrl;
};

export const fetchApiAudioUrl = async (audioUrl: string) => {
  const response = await fetch(audioUrl);
  return response;
};
