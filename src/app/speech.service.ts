import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SpeechService {
  speakWord(word: string): void {
    const synth = window.speechSynthesis;
    const voices = synth.getVoices();
    const navigatorLanguage = navigator.language;
    let bestVoice = null;
    for (const voice of voices) {
      if (voice.lang.replace('_', '-').startsWith(navigatorLanguage)) {
        bestVoice = voice;
        break;
      }
    }

    const utterThis = new SpeechSynthesisUtterance(word);
    utterThis.voice = bestVoice || voices[0];
    synth.speak(utterThis);
  }
}
