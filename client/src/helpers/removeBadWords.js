const badWordsList = [
  "ass",
  "arse",
  "bastard",
  "bitch",
  "bollocks",
  "bugger",
  "crap",
  "cunt",
  "damn",
  "frigger",
  "fuck",
  "nigga",
  "nigger",
  "shit",
  "slut",
  "whore",
  "twat",
];

const removeBadWords = (sentence) => {
  const finalSentence = [];
  sentence.split(" ").forEach((word, i) => {
    let filteredWord;

    badWordsList.forEach((badWord, i) => {
      if (word.toLowerCase().includes(badWord)) {
        filteredWord = "#".repeat(word.length);
      }
    });

    if (!filteredWord) {
      filteredWord = word;
    }

    finalSentence.push(filteredWord);
  });

  return finalSentence.join(" ");
};

export default removeBadWords;
