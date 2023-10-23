// speechRecognitionSingleton.js

let recognition;

if (window.SpeechRecognition || window.webkitSpeechRecognition) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';
} else {
    console.error("Your Browser does not support Speech Recognition");
}

let isListening = false;

export const startRecognition = () => {
    if (!isListening) {
        recognition.start();
        isListening = true;
    }
};

export const stopRecognition = () => {
    recognition.stop();
};

export const getRecognition = () => {
    return recognition;
};

export const isRecognitionActive = () => {
    return isListening;
};

export const muteSpeech = () => {
    window.speechSynthesis.cancel();
};
export const muteMediaElements = () => {
    const mediaElements = document.querySelectorAll("audio, video");
    mediaElements.forEach(media => {
        media.muted = true;
    });
};


export const unmuteMediaElements = () => {
    const mediaElements = document.querySelectorAll("audio, video");
    mediaElements.forEach(media => {
        media.muted = false;
    });
};

export const unmuteSpeech = (activeUtterance) => {
    console.log("unmuteSpeech called");
    if (activeUtterance && activeUtterance.current) {
        activeUtterance.current.volume = 1;
    }
};