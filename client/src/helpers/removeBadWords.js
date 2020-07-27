const badWordsList = [
  "ass",
  "@ss",
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
  "$hit",
  "slut",
  "whore",
  "wench",
  "twat",
  "✊",
  "✊🏻",
  "✊🏼",
  "✊🏽",
  "✊🏾",
  "✊🏿",
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
