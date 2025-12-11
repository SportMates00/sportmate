import favicon from "../../assets/images/favicon.png"
export const gamesEvents = {
   football: [
  {
    id: 1,
    sport: "Football",

    // required by your card UI
    backgroundImage: require("../../assets/images/football-field.webp"),

    // merge teamA + teamB → players row
    players: [
      { name: "John", profilePhoto: favicon },
      { name: "Alex", profilePhoto: favicon },
    ],

    // UI fields
    level: "Intermediate",
    location: "NY ST",                // you already had this
    date: "Jun 30, 2025",
    city: "Gyumri",
    region: "",

    // keep original team structure if needed later
    teamA: [
      { name: "John", profilePhoto: favicon },
    ],
    teamB: [
      { name: "Alex", profilePhoto: favicon },
    ],
  },

  {
    id: 2,
    sport: "Football",

    // required background
    backgroundImage: require("../../assets/images/football-field.webp"),

    players: [
      { name: "John", profilePhoto: favicon },
      { name: "Alex", profilePhoto: favicon },
    ],

    level: "Beginner",               // you can set different levels
    location: "NY ST",
    date: "Feb 2, 2025",
    time: "10am",
    city: "Ararat",
    region: "",

    teamA: [
      { name: "John", profilePhoto: favicon },
    ],
    teamB: [
      { name: "Alex", profilePhoto: favicon },
    ],
  },
]
    ,
    tennis: [
  {
    id: 3,
    sport: "Tennis",

    // Required by your redesigned card
    backgroundImage: require("../../assets/images/tennis-court.jpg"),

    // Merge teamA + teamB into one players list for UI
    players: [
      { name: "Chris", profilePhoto: favicon },
      { name: "Emily", profilePhoto: favicon },
      { name: "David", profilePhoto: favicon },
      { name: "Michael", profilePhoto: favicon },
      { name: "Sara", profilePhoto: favicon },
      { name: "Luke", profilePhoto: favicon },
    ],

    // UI fields shown on card
    level: "Intermediate",  // capitalized for clean UI
    location: "Yerevan",
    date: "Feb 2, 2025",
    time: "8pm",

    // Extra metadata (optional but kept since you had it)
    city: "Yerevan",
    region: "FL",

    // Keep original team structure for future match logic
    teamA: [
      { name: "Chris", profilePhoto: favicon },
      { name: "Emily", profilePhoto: favicon },
      { name: "David", profilePhoto: favicon }
    ],
    teamB: [
      { name: "Michael", profilePhoto: favicon },
      { name: "Sara", profilePhoto: favicon },
      { name: "Luke", profilePhoto: favicon }
    ],
  },
  {
    id: 4,
    sport: "Tennis",

    // Required by your redesigned card
    backgroundImage: require("../../assets/images/tennis-court.jpg"),

    // Merge teamA + teamB into one players list for UI
    players: [
      { name: "Chris", profilePhoto: favicon },
      { name: "Emily", profilePhoto: favicon },
      { name: "David", profilePhoto: favicon },
      { name: "Michael", profilePhoto: favicon },
      { name: "Sara", profilePhoto: favicon },
      { name: "Luke", profilePhoto: favicon },
      { name: "Mike", profilePhoto: favicon },
    ],

    // UI fields shown on card
    level: "Intermediate",  // capitalized for clean UI
    location: "Miami Court",
    date: "Feb 2, 2025",
    time: "8pm",

    // Extra metadata (optional but kept since you had it)
    city: "Miami",
    region: "FL",

    // Keep original team structure for future match logic
    teamA: [
      { name: "Chris", profilePhoto: favicon },
      { name: "Emily", profilePhoto: favicon },
      { name: "David", profilePhoto: favicon }
    ],
    teamB: [
      { name: "Michael", profilePhoto: favicon },
      { name: "Sara", profilePhoto: favicon },
      { name: "Luke", profilePhoto: favicon }
    ],
  }
]
  }