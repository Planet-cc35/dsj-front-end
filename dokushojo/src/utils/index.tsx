const utils = {
  playAudio: (audio_url: string) => {
    const audioELement: HTMLAudioElement = new Audio(audio_url);
    audioELement.play();
  },
};

export default utils;
