// ============================================================
//  EDIT THIS FILE to change the quiz content.
// ============================================================

const QUIZ = {
  // Your name, shown in the title ("How well do you know ___?")
  name: "Jean-Pierre",

  // A short line shown under the title
  tagline: "6 questions. No Googling. Let's see if you're a true friend.",

  // Each question needs:
  //   question - the text
  //   options  - 2 to 4 possible answers
  //   answer   - the index of the correct option (0 = first, 1 = second, ...)
  //   fact     - (optional) a fun fact shown after the player answers
  questions: [
    {
      question: "What is my first language?",
      options: ["Spanish", "Russian", "Mandarin", "Swahili"],
      answer: 1,
      fact: "Russian was my first language."
    },
    {
      question: "What is my favorite movie?",
      options: ["Titanic", "Toy Story", "The Lord of the Rings", "The Godfather"],
      answer: 2,
      fact: "An all-time classic."
    },
    {
      question: "What is my favorite sport?",
      options: ["Golf", "Kickboxing", "Figure skating", "Baseball"],
      answer: 1,
      fact: "Kickboxing all the way."
    },
    {
      question: "What is my favorite anime?",
      options: ["Pokémon", "Sailor Moon", "Attack on Titan", "Doraemon"],
      answer: 2,
      fact: "Attack on Titan is my favorite anime."
    },
    {
      question: "Which region do I have the most beef with?",
      options: ["Scandinavia", "The American South", "Southeast Asia", "The Australian Outback"],
      answer: 1,
      fact: "The American South and I have serious beef."
    },
    {
      question: "What is my favorite TV show?",
      options: ["The Office", "Andor", "Friends", "Grey's Anatomy"],
      answer: 1,
      fact: "Andor is my favorite show."
    }
  ],

  // Result messages, based on percentage score (checked from top to bottom)
  results: [
    { min: 100, title: "Soulmate status 💯", text: "You know me better than I know myself. Slightly concerning." },
    { min: 70,  title: "Inner circle 🤝",   text: "You've clearly been paying attention. Respect." },
    { min: 40,  title: "Casual friend 🙂",   text: "We should hang out more — you've got some catching up to do." },
    { min: 0,   title: "Who are you? 🤔",    text: "Did we just meet? Take the quiz again and study up." }
  ]
};
