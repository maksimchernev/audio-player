export function isAudioUrlValid(url) {
    const audioUrlRegex = /https:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#?&/=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/;
    return audioUrlRegex.test(url);
  }
  
