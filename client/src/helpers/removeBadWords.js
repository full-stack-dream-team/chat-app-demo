const badWordsList = {
  bastard: "cool guy",
  bitch: "beautiful woman",
  bollocks: "chicken legs",
  bugger: "cool bean",
  crap: "delicious",
  cunt: "joker",
  damn: "love",
  frigger: "tigger",
  fuck: "cheese eat",
  nigga: "cool guy",
  nigger: "cool guy",
  sex: "tea",
  $ex: "tea",
  shit: "tasty",
  $hit: "tasty",
  slut: "prospector",
  whore: "pretty face",
  wench: "nice lady",
  twat: "cutie",
  "✊": "all lives matter",
  "✊🏻": "I love the police force",
  "✊🏼": "go trump",
  "✊🏽": "don't kill babies",
  "✊🏾": "no more communism",
  "✊🏿": "white lives matter",
};

const removeBadWords = (sentence) => {
  const finalSentence = [];
  sentence.split("\n").forEach((line, i) => {
    let filteredLine = [];
    line.split(" ").forEach((word, i) => {
      let filteredWord;

      Object.keys(badWordsList).forEach((badWord, i) => {
        if (word.toLowerCase().includes(badWord)) {
          filteredWord = word
            .toLowerCase()
            .replace(badWord, badWordsList[badWord]);
        }
      });

      if (!filteredWord) {
        filteredWord = word;
      }

      filteredLine.push(filteredWord);
    });
    finalSentence.push(filteredLine.join(" "));
  });

  return finalSentence.join("\n");
};

export default removeBadWords;
