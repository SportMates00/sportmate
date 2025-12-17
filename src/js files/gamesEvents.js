import favicon from "../../assets/images/favicon.png"
export const gamesEvents = {
  
   football: [
  {
  id: 1,
  sport: "Football",

  // ===== UI =====
  title: "John's football practice game", // NEW (avoid generating titles everywhere)
  backgroundImage: require("../../assets/images/football-field.webp"),

  // ===== DATE & TIME =====
  date: "Jun 30, 2025",
  time: "09:00",                 // NEW (separate from date)
  timezone: "GMT+4",             // NEW (future-proof)

  // ===== LOCATION =====
  city: "Gyumri",
  region: "",
  location: "NY ST",             // keep for short card display
  club: "DSQ Gym & Health Club", // NEW
  courtBooked: true,             // NEW (Y/N)

  // ===== GAME INFO =====
  gameType: "Practice",          // NEW (Practice / Match / Tournament)
  level: ["Intermediate"],       // CHANGE → array (matches design)
  maxPlayers: 10,                // NEW
  price: 0,                      // NEW (paid games later)

  // ===== HOST & PLAYERS =====
  host: {
    id: "u1",
    name: "John",
    profilePhoto: favicon,
    verified: true               // NEW (host verification)
  },

  players: [
    { id: "u1", name: "John", profilePhoto: favicon },
    { id: "u2", name: "Alex", profilePhoto: favicon },
  ],

  pendingRequests: [
    // users who clicked "Ask to join"
    { id: "u3", name: "Mike" }
  ],

  // ===== SECURITY / TRUST =====
  verifiedOnly: false,            // NEW (only verified users can join)
  visibility: "public",           // NEW (public / private)

  // ===== CHAT =====
  chatEnabled: true,              // NEW
  chatId: "chat_game_1",          // NEW (future backend)

  // ===== STATUS =====
  status: "active",               // NEW (active / canceled / finished)
  createdAt: "2025-06-01T10:00",
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