const utils = {
  playAudio: (audio_url: string) => {
    const audioELement: HTMLAudioElement = new Audio(audio_url);
    audioELement.play();
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  randomItemList: (array: any[]): any => {
    const randomNumber: number = Math.floor(Math.random() * array.length);
    return array[randomNumber];
  },
};

export default utils;
